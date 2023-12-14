# Find My Bus

Find My Bus is a web application that allows users to find buses with estimated fares by route or destination. It aims to help users find the exact bus to go to their specified location. Often, it is observed that people face difficulties understanding what bus is for what route, and FindMyBus will help users by suggesting the bus along with its bus number and route.

## Features

- Searching of bus via the route.
- Detailed information about each bus, like bus number, origin, destination, detailed route, bus fare.
- User-friendly interface with responsive design.
- A map on the results page as well that shows the origin, destination, and all the route points the bus passes through with the help of markers. (Blue for Origin, Red for Destination, Yellow for the route points)
- The ability to look for a particular bus number on the map, in case a specific route has more than one bus.

## Technologies Used

- Flask: A Python web framework for building the backend of the application.
- HTML and Bootstrap: Used for creating the frontend and ensuring a responsive layout.
- Firebase: Used for storing and retrieving bus location data in real-time.
- Mapbox: Provides map data and mapping functionality for displaying bus locations.

## Usage

1. Visit the hosted application in your web browser at [URL](https://findmybus-azlf.onrender.com)
2. From the dropdown in the homepage, select your desired route, and click on the search now button.
3. You will be redirected to the search_results page.
4. The search_results page includes bus information like bus number, origin, destination, detailed route, and bus fare.
5. The results page also includes a map for each bus number.
6. The map has origin marked in blue, destination marked in red, and the route points through the bus passes marked in yellow.
7. You can click on the markers to see the name of the points.
8. The markers are connected by a route line, in blue.
9. In case there are more than one bus for a particular route, you can select a bus number that you want to see in the map from the dropdown on the results page, and click the "See on Map" button.

Happy Searching!
