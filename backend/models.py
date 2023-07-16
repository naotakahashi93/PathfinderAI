from datetime import datetime

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

def connect_db(app):
    """Connect this database to provided Flask app. """

    db.app = app
    db.init_app(app)


class User(db.Model):
    """User in the db."""

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True, 
    )

    email = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    username = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    password = db.Column(
        db.Text,
        nullable=False,
    )

    def __repr__(self):
        return f"<User #{self.id}: {self.username}, {self.email}>"

    @classmethod
    def signup(cls, username, email, password):
        """signs up a new user.
        Using Bcrypt to hash the password and adds user to database.
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            username=username,
            email=email,
            password=hashed_pwd,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Logs in and authenticates the user, it looks for the user with `username` and `password` that was typed in.
        If can't find matching user or if password is wrong it returns False, if it succeeds it returns the user obj itself.
        """

        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False


class SavedItinerary(db.Model):

    __tablename__ = 'saveditinerary'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    user_id = db.Column(
        db.Integer, 
        db.ForeignKey("users.id", ondelete='CASCADE'), 
        nullable=False) ## foreign key from id in the users table
    
    place=db.Column(
        db.Text
    )

    saved = db.Column(
        db.Text,
        nullable=False,
    )

    placeimg=db.Column(
        db.Text
    )
    