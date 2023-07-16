import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./PopularPlacesItinerary.css"
import Map from "./Map"


const PopularPlacesItinerary = () =>{

    const {place} = useParams()


    let popplaceitineraryobj ={
        Kyoto: "Day 1:\n- Morning:\n  - Kinkaku-ji (Golden Pavilion) (Address: 1 Kinkakujicho, Kita Ward, Kyoto, 603-8361, Japan)\n  - Ryoan-ji (Address: 13 Ryoanji Goryonoshitacho, Ukyo Ward, Kyoto, 616-8001, Japan)\n- Afternoon:\n  - Nijo Castle (Address: 541 Nijojocho, Nakagyo Ward, Kyoto, 604-8301, Japan)\n\nDay 2:\n- Morning:\n  - Fushimi Inari Taisha (Address: 68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, 612-0882, Japan)\n- Afternoon:\n  - Gion District (Address: Gion, Higashiyama Ward, Kyoto, Japan)\n  - Kiyomizu-dera Temple (Address: 294 Kiyomizu 1-chome, Higashiyama Ward, Kyoto, 605-0862, Japan)\n\nDay 3:\n- Morning:\n  - Sanjusangen-do Temple (Address: 657 Sanjusangendo Mawaricho, Higashiyama Ward, Kyoto, 605-0941, Japan)\n- Afternoon:\n  - Kyoto Imperial Palace (Address: 3 Kyoto Gyoen, Kamigyo Ward, Kyoto, 602-0881, Japan)\n  - Nishiki Market (Address: Nishikikoji-dori, Nakagyo Ward, Kyoto, 604-8054, Japan)\n\nDay 4:\n- Morning:\n  - To-ji Temple (Address: 1 Kujocho, Minami Ward, Kyoto, 601-8473, Japan)\n  - Kyoto National Museum (Address: 527 Chayacho, Higashiyama Ward, Kyoto, 605-0931, Japan)\n- Afternoon:\n  - Ginkaku-ji (Silver Pavilion) (Address: 2 Ginkakujicho, Sakyo Ward, Kyoto, 606-8402, Japan)\n  - Philosopher's Path (Address: Tetsugaku no Michi, Sakyo Ward, Kyoto, Japan)\n\n",
        Paris:"Day 1:\n- Morning:\n  - Start your day with a visit to the iconic Eiffel Tower, taking in panoramic views of Paris. (Address: Champ de Mars, 5 Avenue Anatole, 75007 Paris, France)\n  - Stroll hand-in-hand along the picturesque streets of Montmartre, known for its charming cafes and artistic ambiance. (Address: Montmartre, 75018 Paris, France)\n- Afternoon:\n  - Explore the exquisite artworks at the Louvre Museum, including the renowned Mona Lisa. (Address: Rue de Rivoli, 75001 Paris, France)\n\nDay 2:\n- Morning:\n  - Enjoy a romantic boat ride along the Seine River, passing by iconic landmarks such as Notre-Dame Cathedral and the Pont des Arts. (Address: Seine River, Paris, France)\n- Afternoon:\n  - Visit the enchanting Palace of Versailles, known for its stunning gardens and opulent interiors. (Address: Place d'Armes, 78000 Versailles, France)\n\nDay 3:\n- Morning:\n  - Explore the charming neighborhood of Saint-Germain-des-Prés, known for its quaint cafes and boutiques. (Address: Saint-Germain-des-Prés, 75006 Paris, France)\n- Afternoon:\n  - Take a leisurely stroll through the beautiful Luxembourg Gardens, enjoying the serene atmosphere and lush greenery. (Address: 6th Arrondissement, Paris, France)\n\nDay 4:\n- Morning:\n  - Discover the romantic neighborhood of Montparnasse, famous for its artistic heritage and panoramic views from the Montparnasse Tower. (Address: 33 Avenue du Maine, 75015 Paris, France)\n- Afternoon:\n  - Indulge in a delightful shopping experience on the elegant Champs-Élysées, exploring designer boutiques and enjoying delicious French pastries. (Address: Champs-Élysées, 75008 Paris, France)"        ,
        Mykonos:"Day 1:\n- Morning:\n  - Start your day by exploring the beautiful beaches of Mykonos, such as Paradise Beach. Enjoy the crystal-clear waters and lively beach atmosphere. (Address: Paradise Beach, Mykonos, Greece)\n- Afternoon:\n  - Visit the iconic windmills of Mykonos, situated in Chora. Take in the panoramic views and capture memorable photos. (Address: Chora, Mykonos, Greece)\n\nDay 2:\n- Morning:\n  - Spend a relaxing morning at Psarou Beach, known for its luxurious beach clubs and sunbeds. (Address: Psarou Beach, Mykonos, Greece)\n- Afternoon:\n  - Explore the charming narrow streets of Mykonos Town (Chora), filled with white-washed buildings, boutique shops, and vibrant cafes. (Address: Mykonos Town, Mykonos, Greece)\n\nDay 3:\n- Morning:\n  - Venture to Super Paradise Beach, famous for its lively beach parties and energetic atmosphere. (Address: Super Paradise Beach, Mykonos, Greece)\n- Afternoon:\n  - Discover the archaeological site of Delos Island, an ancient Greek sanctuary and UNESCO World Heritage site. Take a guided tour and explore the ruins. (Address: Delos Island, Mykonos, Greece)\n\nDay 4:\n- Morning:\n  - Enjoy the stunning views from Elia Beach, known for its golden sands and crystal-clear waters. (Address: Elia Beach, Mykonos, Greece)\n- Afternoon:\n  - Take a leisurely boat trip to the nearby island of Rhenia and enjoy secluded beaches and snorkeling in the turquoise waters. (Address: Rhenia Island, Mykonos, Greece)",
        Kenya:"Day 1:\n- Morning:\n  - Arrive in Nairobi, the capital city of Kenya, and transfer to your safari lodge.\n  - Enjoy a game drive in Nairobi National Park, where you can spot wildlife such as lions, giraffes, zebras, and rhinos. (Address: Langata Road, Nairobi, Kenya)\n- Afternoon:\n  - Visit the David Sheldrick Wildlife Trust, a renowned elephant orphanage that provides care and rehabilitation for baby elephants. (Address: Mbagathi Road, Nairobi, Kenya)\n\nDay 2:\n- Morning:\n  - Depart for Maasai Mara National Reserve, one of Africa's most iconic safari destinations. Enjoy a thrilling game drive in search of the 'Big Five' (lion, leopard, elephant, buffalo, and rhinoceros). (Address: Maasai Mara National Reserve, Narok, Kenya)\n- Afternoon:\n  - Experience a guided nature walk in the Maasai Mara, led by Maasai warriors who will share their traditional knowledge and customs. (Address: Maasai Mara National Reserve, Narok, Kenya)\n\nDay 3:\n- Morning:\n  - Embark on a hot air balloon safari over the vast plains of the Maasai Mara, providing a unique perspective and breathtaking views of the wildlife below. (Address: Maasai Mara National Reserve, Narok, Kenya)\n- Afternoon:\n  - Visit a Maasai village to learn about their rich cultural heritage, traditional lifestyle, and vibrant traditions. \n\nDay 4:\n- Morning:\n  - Travel to Amboseli National Park, famous for its large herds of elephants and stunning views of Mount Kilimanjaro. (Address: Amboseli National Park, Namanga, Kenya)\n- Afternoon:\n  - Enjoy a game drive in Amboseli National Park, observing a variety of wildlife against the backdrop of Africa's highest mountain. (Address: Amboseli National Park, Namanga, Kenya)\n\nDay 5:\n- Morning:\n  - Journey to Tsavo East National Park, one of Kenya's largest and oldest national parks, known for its diverse wildlife and vast wilderness. (Address: Tsavo East National Park, Voi, Kenya)\n- Afternoon:\n  - Explore the park on a thrilling game drive, seeking out the 'red elephants' and other wildlife that call Tsavo East home. (Address: Tsavo East National Park, Voi, Kenya)",
        Dubai: "Day 1:\n- Morning:\n  - Immerse yourself in luxury at the iconic Burj Al Arab, an extravagant hotel known for its sail-shaped architecture. (Address: Jumeirah Beach Road, Umm Suqeim 3, Dubai, United Arab Emirates)\n- Afternoon:\n  - Indulge in a world-class shopping experience at The Dubai Mall, featuring luxury brands and entertainment options. (Address: Financial Centre Road, Downtown Dubai, Dubai, United Arab Emirates)\n\nDay 2:\n- Morning:\n  - Experience the thrill of dune bashing and enjoy a luxurious desert safari in the Arabian Desert. (Address: Arabian Desert, Dubai, United Arab Emirates)\n- Afternoon:\n  - Visit the Palm Jumeirah, an artificial island home to luxurious resorts, including Atlantis, The Palm. (Address: Palm Jumeirah, Dubai, United Arab Emirates)\n\nDay 3:\n- Morning:\n  - Pamper yourself with rejuvenating spa treatments at the Talise Ottoman Spa, renowned for its opulent facilities. (Address: Jumeirah Zabeel Saray, Crescent Road, The Palm Jumeirah, Dubai, United Arab Emirates)\n- Afternoon:\n  - Embark on a luxury yacht cruise along Dubai Marina, enjoying stunning skyline views and VIP service. (Address: Dubai Marina, Dubai, United Arab Emirates)\n\nDay 4:\n- Morning:\n  - Enjoy a round of golf at the Emirates Golf Club, a world-class golf course set amidst scenic landscapes. (Address: Emirates Hills, Near Nakheel Metro Station, Dubai, United Arab Emirates)\n- Afternoon:\n  - Indulge in a fine dining experience at one of Dubai's renowned Michelin-starred restaurants, such as Pierchic at Madinat Jumeirah. (Address: Al Sufouh Road, Madinat Jumeirah, Dubai, United Arab Emirates)"
    }

    let popplaceMapCoord =
    {
        Kyoto: [{ zoom: 10,lat: 35.02775 , lng: 135.79535},
            { zoom: 10,lat: 35.03376 , lng: 135.71818},
            { zoom: 10,lat: 34.99569 , lng: 135.75754},
            { zoom: 10,lat: 34.96781 , lng: 135.77273},
            { zoom: 10,lat: 34.9971 , lng: 135.77631},
            { zoom: 10,lat: 34.99587 , lng: 135.78305},
            { zoom: 10,lat: 34.98812 , lng: 135.77267},
            { zoom: 10, lat: 35.02962 , lng: 135.75663},
            { zoom: 10,lat: 35.00502 , lng: 135.76466},
            { zoom: 10,lat: 34.98244 , lng: 135.74856},
            { zoom: 10,lat: 34.99202 , lng: 135.77304},
            { zoom: 10,lat: 35.02686 , lng: 135.79827},
            { zoom: 10,lat: 35.02657 , lng: 135.79482},
        ],

        Paris: [{ zoom: 11,lat: 48.85645 ,lng: 2.30616},
            { zoom: 10,lat: 48.88617 , lng: 2.33797},
            { zoom: 10,lat: 48.86255 , lng: 2.33584},
            { zoom: 10,lat: 48.85815 , lng: 2.33537},
            { zoom: 10,lat: 48.80295 , lng: 2.1247},
            { zoom: 10,lat: 48.85367 , lng: 2.33303},
            { zoom: 10,lat: 48.85089 , lng: 2.33285},
            { zoom: 10,lat: 48.84228 , lng: 2.32124},
            { zoom: 10,lat: 48.86951 , lng: 2.30846},
        ],

        Mykonos: [
            { zoom: 10, lat: 37.41012 , lng: 25.35634},
            { zoom: 10, lat: 37.44274 , lng: 25.32955},
            { zoom: 10,lat: 37.41614 , lng: 25.33812},
            { zoom: 10,lat: 37.44552 , lng: 25.32895},
            { zoom: 10,lat: 37.41569 , lng: 25.36913},
            { zoom: 10,lat: 37.45033 , lng: 25.32985},
            { zoom: 10,lat: 37.42322 , lng: 25.39008},
            { zoom: 10,lat: 37.46686 , lng: 25.32733}
        ],

        Kenya: [
            { zoom: 7, lat: -1.30564 , lng: 36.82289},
            { zoom: 7,lat: -1.30944 , lng: 36.80199},
            { zoom: 7,lat: -1.58196 , lng: 35.2451},
            { zoom: 7,lat: -1.58196 , lng: 35.2451},
            { zoom: 7,lat: 39.86583 , lng: -75.17981},
            { zoom: 7,lat: 39.86583 , lng: -75.17981},
            { zoom: 7,lat: -3.3632 , lng: 38.59498},
            { zoom: 7,lat: -3.3632 , lng: 38.59498},
        ],

        Dubai: [
            { zoom: 10,lat: 25.13956 , lng: 55.18717},
            { zoom: 10,lat: 25.19791 , lng: 55.28362},
            { zoom: 10,lat: 25.22904 , lng: 55.2865},
            { zoom: 10,lat: 25.11723 , lng: 55.13466},
            { zoom: 10,lat: 25.11054 , lng: 55.10915},
            { zoom: 10,lat: 25.0905 , lng: 55.14755},
            { zoom: 10,lat: 25.24448 , lng: 55.29734},
            { zoom: 10,lat: 25.13182 , lng: 55.18449}
        ]

    }

    // let popplaceMapVal ={
    //     Kyoto: [
    //         "1 Kinkakujicho, Kita Ward, Kyoto, 603-8361, Japan",
    //         "〒616-8001 京都市右京区竜安寺御陵ノ下町13",
    //         "541 Nijojocho, Nakagyo Ward, Kyoto, 604-8301, Japan",
    //         "〒612-0882 京都市伏見区深草薮ノ内町68",
    //         "京都市東山区祇園",
    //         "〒605-0862 京都市東山区清水1丁目294",
    //         "〒605-0941 京都市東山区三十三間堂回町657",
    //         "3 Kyoto Gyoen, Kamigyo Ward, Kyoto, 602-0881, Japan",
    //         "〒604-8055 京都府京都市中京区",
    //         "〒601-8473 京都市南区九条町1",
    //         "〒605-0931 京都市東山区茶屋町527",
    //         "〒606-8402 京都市左京区銀閣寺町2",
    //         "京都市左京区哲学の道"
    //       ],
    //       Paris: [
    //         "Champ de Mars, 5 Avenue Anatole, 75007 Paris, France",
    //         "Montmartre, 75018 Paris, France",
    //         "Rue de Rivoli, 75001 Paris, France",
    //         "Seine River, Paris, France",
    //         "Place d'Armes, 78000 Versailles, France",
    //         "Saint-Germain-des-Prés, 75006 Paris, France",
    //         "6th Arrondissement, Paris, France",
    //         "33 Avenue du Maine, 75015 Paris, France",
    //         "Champs-Élysées, 75008 Paris, France"
    //       ],
    //       Mykonos: [
    //         "Paradise Beach, Mykonos, Greece",
    //         "Mpaoumi, Mikonos 846 00, Greece",
    //         "Psarou Beach, Mykonos, Greece",
    //         "Mykonos Town, Mykonos, Greece",
    //         "Super Paradise Beach, Mykonos, Greece",
    //         "Delos Island, Mykonos, Greece",
    //         "Elia Beach, Mykonos, Greece",
    //         "Rhenia Island, Mykonos, Greece"
    //       ],
    //       Kenya: [
    //         "Langata Road, Nairobi, Kenya",
    //         "Mbagathi Road, Nairobi, Kenya",
    //         "Maasai Mara National Reserve, Narok, Kenya",
    //         "Maasai Mara National Reserve, Narok, Kenya",
    //         "Amboseli National Park, Namanga, Kenya",
    //         "Amboseli National Park, Namanga, Kenya",
    //         "Tsavo East National Park, Voi, Kenya",
    //         "Tsavo East National Park, Voi, Kenya"
    //       ],
    //       Dubai: [
    //         "Jumeirah Beach Road, Umm Suqeim 3, Dubai, United Arab Emirates",
    //         "Financial Centre Road, Downtown Dubai, Dubai, United Arab Emirates",
    //         "Arabian Desert, Dubai, United Arab Emirates",
    //         "Palm Jumeirah, Dubai, United Arab Emirates",
    //         "Jumeirah Zabeel Saray, Crescent Road, The Palm Jumeirah, Dubai, United Arab Emirates",
    //         "Dubai Marina, Dubai, United Arab Emirates",
    //         "Emirates Hills, Near Nakheel Metro Station, Dubai, United Arab Emirates",
    //         "Al Sufouh Road, Madinat Jumeirah, Dubai, United Arab Emirates"
    //       ]
    // }



//     async function test(){
//     for (const loc of popplaceMapVal["Kyoto"]) {
//         const res = await HereMapAPI.fetchData(loc);
//         if(res.data && res.data.result && res.data.result.items && res.data.result.items[0] && res.data.result.items[0].position){
//             console.log("lat:", res.data.result.items[0].position.lat, ",", "lng:", res.data.result.items[0].position.lng )
//       }
//       else{
//           console.log("Sorry, our map data is not loading for some of the places :(")
//       }
//       }
//     }
// test()


    return (
        <>
        <p id="placeitinerarytext">
        {popplaceitineraryobj[place]}
        </p>
        <Map mapVal={popplaceMapCoord[place]}/>
        </>
    )
}

export default PopularPlacesItinerary;