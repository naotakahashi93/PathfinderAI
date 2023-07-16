# PathfinderAI - Travel Itinerary Builder
![PathfinderAI Logo](./frontend/src/images/PathfinderLogo.png)

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

PathfinderAI is my final capstone project at Springboard. The aim of this project is to provide users with a custom and interactive travel experience. By using the chatGPT API and the HEREMaps API, the application allows users to input their desired travel location, travel dates, and additional preferences such as travel companions and interests. Based on this information, the system will generate personalized travel itineraries and plot the suggested locations on a map. The objective is to provide users with a convenient and efficient tool to plan their travel experiences with ease.

## Key Features

- **ChatGPT Integration:** PathfinderAI utilizes the power of ChatGPT, and provides a user-friendly interface where users can easily input their travel preferences. The application allows users to type in a place and select their preferences using checkboxes. The backend processes these inputs and generates a prompt based on the user's selections to generate their custom itinerary.
- **HEREMapsAPI Integration:** The application integrates with the HEREMapsAPI to access location data that the itinerary generates. By leveraging the HEREMapsAPI, the application provides a map visual that displays  various attractions, restaurants, tourist site options recommended in the itinerary. This map helps users visualize the geographical layout of their travel plan. It allows users to see where everything is located and understand the overall spatial context of their itinerary, enhancing their planning experience.
- **Flexible Input Options:** Users have the freedom to provide various inputs such as the destination, travel dates, travel companions and interests. PathfinderAI takes these inputs into consideration when creating the itinerary, providing a highly personalized experience.
- **Pre-made Images:** PathfinderAI incorporates a collection of pre-made images that are associated with specific destinations. These images were curated and generated using Leonardo.AI, an AI image generator website. The images are created using custom prompts provided by me, ensuring they have consistent aesthetic and style for each destination. When a user inputs a place that matches one of the existing images, the application utilizes that image to the itinerary page adding a visually appealing element to the itinerary.
- **User Sign-up and Itinerary Saving:** PathfinderAI provides the option for users to sign up and create an account. By signing up, users gain the ability to save their generated itineraries and view them later for reference. To sign up, users can navigate to the sign-up page and provide the necessary information. Once signed up, users can log in to their account and save their generated itineraries by clicking the "Save this itinerary" button for their generated itinerary.


## Technologies Used

- **Backend:** Python, Flask
- **Frontend:** React, HTML, CSS
- **Database** PostgreSQL, SQLAlchemy
- **API** OpenAI API (Model: text-davinci-003), HEREMaps API 
- **Images:** Pre-made images (from Leonardo.AI) stored locally


## Usage

1. Open the PathfinderAI application in your web browser.
2. Enter your desired travel destination and optionally dates and other interests.
3. Once you've inputted/selected all the necessary inputs, the application will generate a detailed travel itinerary for your trip.
4. Explore the generated itinerary and the locartions on the map.
5. Option to save the itinerary for future reference with sign up.
6. There are sample itineraries at the bottom of the landing page of some popular travel destinations!

---
