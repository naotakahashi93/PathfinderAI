from flask import Flask, request, jsonify, flash, redirect, session, g, make_response
from flask_session import Session
import requests, os, json
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from secret import OPENAI_API_KEY, HEREMAP_API_KEY 
from models import  db, connect_db, User, SavedItinerary
import redis

API_BASE_URL = "https://api.openai.com/v1/completions"
OPENAI_API_KEY = OPENAI_API_KEY
HEREMAP_API_KEY= HEREMAP_API_KEY 
# r = redis.Redis(host='localhost', port=6379, db=0)
r = redis.Redis(host='localhost', port=6379, decode_responses=True)
# redis_conn = redis.Redis(host='localhost', port=6379, db=0)

app = Flask(__name__)
CORS(app)

## for LOCAL access 
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pathfinderAI'

# for DEOPLYING
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://qjltirnr:iYLhP6v76gqF02R2AvwRajSoEi1gFHnm@mahmud.db.elephantsql.com/qjltirnr'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "shhhsecrettt"



with app.app_context():
    connect_db(app)
    db.create_all()

app.app_context().push()

# app.py has all the backend routes from register, login, chatGPT calls, HEREMap calls etc 
# we call on these from the front end to get this data 

### USER ROUTES ####
## we use this decorator that runs this function before any request
@app.before_request
def add_user_to_g():
    currentRedisUser = r.hgetall('current_user')
    print("CURR REDIS", currentRedisUser, r.exists("current_user"), "T OR F")

    if r.exists("current_user"):
        g.user = currentRedisUser.get('user_id')
    else:
        g.user = None

    
    """If user is logged in, add curr user to Flask global (g)."""
    # if "current_user" in session: ## if there is a user in the session (aka they are logged in)
    #     currentRedisUser = r.hgetall('current_user')
    #     print("CURRENT USER IS IN THE SESSION", session, "CURR REDIS", currentRedisUser)
    #     g.user = User.query.filter_by(id=session["current_user"]).first() ## we are assigning .user to the "g" global variable

    # else:
    #     print("NOOOOO CURRENT USER IS IN THE SESSION", session)
    #     g.user = None

    # current_user = get_jwt_identity()
    
    # if current_user:
    #     g.user = User.query.get(current_user['id'])
    #     print(g.user, "USERRRR ")

    # else:
    #     g.user = None
    #     print(g.user, "NO USERRRR ")

    

def login(user):
    """function to login a user aka add to the session"""
    r.hset('current_user', mapping={
            'user_id': user.id,
            'username' : user.username
            })
    print("LOGGED INNN", r.hgetall('current_user'))

def logout():
    """function to logout a user aka remove from the session"""
    if r.exists("current_user"):
        print("LOGGING OUT")
        storedRedis = r.delete('current_user')
    print(storedRedis, "STORED REDIS AFTER LOGOUT", g.user, "G USR ")
  

    # if "current_user" in session:
    #     del session["current_user"]


@app.route('/', methods=[ "POST", "GET", "OPTIONS"])
def handle_options():
    return '', 200


@app.route("/signup", methods=["POST"])
def signup():
    """the route to signup a user and add to the db """
    signup_data = request.get_json()
    
    if r.exists("current_user"):
        userRedis = r.hgetall('current_user')
        user = User.query.filter_by(id=userRedis["user_id"]).first()
        return jsonify({
            'message': 'You are already logged in!',
            'user_id': user.id,
            'username': user.username
        })

    try:
        user = User.signup(
            username=signup_data['username'],
            password=signup_data['password'],
            email=signup_data['email']
        )
        db.session.add(user) 
        db.session.commit()
        login(user)

    except IntegrityError:
        return jsonify({
            'message': 'ERROR'
        }), 400


    return jsonify({
        'message': 'Signup successful',
        'user_id': user.id,
        'username': user.username
    })
  

@app.route('/login', methods=["GET", "POST"])
def login_user():
    """Handle user login."""

    if r.exists("current_user"):
        userRedis = r.hgetall('current_user')
        print(userRedis["user_id"], "USER ID VARIABLE ON LOGIN")
        return jsonify({
            'message': 'You are already logged in!!',
            'user_id': userRedis["user_id"],
            'username': userRedis["username"]
        })
    
    signup_data = request.get_json()
    user = User.authenticate(
            username=signup_data['username'],
            password=signup_data['password'],
        )

    if user:
            login(user)
            # print(storedRedis, "STORED REDIS T/F")
            # # session["current_user"] = user.id
            # # db.session.commit()
            # print( user, "LOGGED IN USERR", storedRedis, "STORED REDIS")

    return jsonify({
        'message': 'Login successful',
        'user_id': user.id,
        'username': user.username
    })


@app.route('/save', methods =["POST"])
def saveitinerary():
    """Save itinerary for user"""
    # print( "/SAVE HITTING IN BACKEND", request.json, "USER", g.user, session)
    if not r.exists("current_user"):
        print("Please login/register first!", "danger")
        return redirect('/')
    data = request.json
    response = data['response']
    place = data['place']
    placeimg = data['placeimg']
    print(request.json, "request.json BACKEEENDDDDDDDDDDD")
    userRedis = r.hgetall('current_user')
    newSave = SavedItinerary(user_id=userRedis["user_id"], place=place, saved=response, placeimg=placeimg)
    db.session.add(newSave)
    db.session.commit()

    return jsonify(
        {'message': 'saved!',
         'itinerary_id': newSave.id}
    )


@app.route('/unsave/<int:id>', methods =["POST"])
def unsaveitinerary(id):
    """UNSave itinerary for user"""
    if not r.exists("current_user"):
        print("Please login/register first!", "danger")
        return redirect('/')
    saved_itinerary = SavedItinerary.query.get(id)
    if saved_itinerary:
        db.session.delete(saved_itinerary)
        db.session.commit()
        return jsonify({'message': 'Itinerary successfully unsaved'})
    else:
        return jsonify({'message': 'Itinerary not found'})
    
@app.route('/<username>/saveditinerary', methods =["POST"])
def get_saveditinerary(username):
    """get all saved itinerary items user"""
    if not r.exists("current_user"):
        print("Please login/register first!", "danger")
        return redirect('/')
    # print("HITTINGGGGGG SAVEDD")
    user = User.query.filter_by(username=username).first()
    all_saved_itinerary = SavedItinerary.query.filter_by(user_id=user.id)
    saved_items = [{"id": item.id, "place": item.place, "saved": item.saved, "placeimg" : item.placeimg}  for item in all_saved_itinerary]
    return jsonify({'all_saved_itinerary': saved_items})

@app.route('/saveditinerary/<int:id>', methods =["GET"])
def get_saveditinerary_byID(id):
    if not r.exists("current_user"):
        print("Please login/register first!", "danger")
        return redirect('/')
    saved_itinerary = SavedItinerary.query.get(id)
    return jsonify({"saved_itinerary": saved_itinerary.saved})






@app.route('/logout')
def logout_user():
    """Handle logout of user."""
    logout()
    return redirect("/")





#### GPT ROUTES ####

def APIgetAns(prompt):
    """ function to get the response from GPT """
    # print("BACK END WORKINGG")
    params = {
    "prompt": prompt,
    "model": "text-davinci-003",
    "max_tokens": 2000,
    "temperature": 0.5
    }
    headers = {
    "Content-Type": "application/json", # telling server that we are sending JSON data
    "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    res = requests.post(API_BASE_URL, headers=headers, json=params)
    # print(res, "RES FROM APIgetAns FUNCTION ")
    res_json = res.json() # taking the response from the server and making that json 
    # print(res_json['choices'][0]['text'], "THE RES_JSON TEXT")
    return res_json['choices'][0]['text']


@app.route('/api/getAns', methods=['POST'])
def getAns():
    """handle API response"""
    # print("BACKEND WORKING", request.json, "REQUESTTTT")
    result = APIgetAns(request.json["prompt"]) 
    # print(result, "RESULT FROM THE ROUTE")
    return jsonify(result=result)




##### MAP ROUTES #####

def HEREAPIgetGeoCode(location):
    """ function to get the geocode of a location from HEREMaps API """
    # print(location, "LOCAATION")
    headers = {
    "Content-Type": "application/json", 
    }
    res = requests.get(f"https://geocode.search.hereapi.com/v1/geocode?q={location}&apiKey={HEREMAP_API_KEY}", headers=headers)
    res_json = res.json()
    # print(res_json, "RES FOR GEOCODE", res_json.items)
    return res_json
   

@app.route('/api/getGeocode')
def getLocation():
    location = request.args.get('location')
    result = HEREAPIgetGeoCode(location)
    # print(result, "RESULT FROM THE GEO CODE ROUTE")
    return jsonify(result = result)