# Weather Forecast Application

## Overview

This Weather Forecast Application is a React-based project designed to provide users with a detailed weather forecast for any city. It allows users to search for a city and view both the weekly weather forecast and detailed weather data for a specific day. The app leverages modern web technologies and practices, such as API integration, state management, component-based architecture, and responsive design, to deliver a smooth user experience across all devices.

## Features

- **City Search**: Users can search for any city to get weather data.
- **Weekly Weather Forecast**: Displays a 7-day weather forecast, including the days of the week, dates, lowest and highest temperatures.
- **Detailed Daily Weather**: Shows detailed weather information for the current day or any selected day from the weekly forecast.
- **Data Caching**: Caches weather data to improve performance and reduce redundant API requests.
- **Error Handling**: Provides feedback to users when an invalid city is entered or when data retrieval fails.
- **Loading Indicators**: Displays loading spinners while fetching data to enhance user experience.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience on all screen sizes, from mobile devices to desktop computers.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **CSS**: For styling the application, including responsive design.
- **API Integration**: Fetches weather data from external APIs.
- **State Management**: Manages the application's state using React's `useState` hook.
- **Modular Components**: Breaks down the UI into reusable and maintainable components.

## Project Structure

```plaintext
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── api
│   │   └── fetchData.ts         # Functions for fetching weather data from APIs
│   ├── assets
│   │   └── images               # Image assets used in the project
│   ├── components
│   │   ├── customSearchInput.tsx # Search input component
│   │   ├── header.tsx           # Header component
│   │   ├── weatherIcon.tsx      # Weather icon component
│   │   ├── loading.tsx          # Loading spinner component
│   │   └── ...
│   ├── utils
│   │   └── functions.ts         # Utility functions like date formatting and capitalization
│   ├── App.tsx                  # Main application component
│   ├── types.ts                 # TypeScript types used in the project
│   ├── index.tsx                # Entry point for the React application
│   └── ...
└── README.md                    # Project documentation
```

## Usage

- Type a city name into the search input and press `Enter` to fetch the weather data.
- Both the current day's weather information and a 7-day weather forecast will be displayed.
- If the city is not found or there's an error, an appropriate message will be displayed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
