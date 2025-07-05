# E-comm

This directory contains the E-comm project, a comprehensive React-based dashboard for E-commerce applications with multiple layouts, UI components, and data visualization tools.

![WowDash Logo](assets/images/logo.png)

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Dashboard Layouts](#dashboard-layouts)
- [UI Components](#ui-components)
- [Authentication](#authentication)
- [Charts and Data Visualization](#charts-and-data-visualization)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Overview

WowDash is a feature-rich React dashboard template designed for E-commerce applications. It provides multiple dashboard layouts, a wide range of UI components, and data visualization tools to help you build powerful and insightful admin interfaces.

## Architecture

The project is built on a modern frontend architecture using React and its ecosystem.

-   **Core Framework**: [React](https://reactjs.org/) is used for building the user interface with its component-based model.
-   **Routing**: [React Router DOM](https://reactrouter.com/) handles all client-side routing, enabling navigation between different dashboard pages and layouts without full-page reloads. The main routing logic is likely configured in `src/App.js`.
-   **Component-Based Structure**: The application is broken down into small, reusable components located in the `src/components` directory. This promotes maintainability and code reuse.
-   **Layout System**: A master layout system, found in `src/masterLayout/`, provides a consistent structure (like sidebars, headers, and footers) across different pages of the dashboard.
-   **Styling**: The project uses Bootstrap for its responsive grid system and base styling, which can be extended with custom CSS or CSS-in-JS solutions.
-   **State Management**: State is managed using React's built-in hooks like `useState` for local component state and `useContext` for global state that needs to be shared across the application, such as theme (dark/light mode) or user authentication status.
-   **Data Visualization**: Charting and data visualization are handled by React ApexCharts, allowing for the creation of various interactive charts.

## Project Structure

The project follows a standard folder structure for a React application. Here is a detailed breakdown of the key directories and files:

```
E-comm/
├── public/
│   ├── assets/
│   │   ├── images/       # Static images, logos, and icons
│   │   └── ...
│   └── index.html        # The main HTML template for the application
├── src/
│   ├── components/
│   │   ├── child/        # Smaller, reusable child components (e.g., custom buttons, inputs)
│   │   ├── DashBoardLayerOne.jsx # Main components for each dashboard layout
│   │   ├── DashBoardLayerTwo.jsx
│   │   └── ...
│   ├── helper/           # Helper/utility functions used across the app
│   ├── hook/             # Custom React hooks (e.g., useTheme, useAuth)
│   ├── masterLayout/
│   │   └── MasterLayout.jsx # The main layout component wrapping page content
│   ├── pages/
│   │   ├── HomePageOne.jsx # Page components rendered by the router
│   │   ├── HomePageTwo.jsx
│   │   └── ...
│   ├── App.js            # The root component, responsible for routing
│   └── index.js          # The entry point of the React application
├── .gitignore            # Specifies files to be ignored by Git
├── package.json          # Lists project dependencies and scripts
└── README.md             # Project documentation (this file)
```

-   **`public/`**: This directory contains static assets. The `index.html` file is the main entry point for the browser.
-   **`src/`**: This is the heart of the application, containing all the React components, pages, hooks, and logic.
    -   **`components/`**: Contains all reusable UI components. Larger, more complex components like dashboard layouts are at the top level, while smaller, generic components are in the `child/` subdirectory.
    -   **`pages/`**: Each file in this directory typically represents a unique page in the application that is mapped to a route in `App.js`.
    -   **`masterLayout/`**: Provides the main application shell, including navigation, sidebar, and header.
    -   **`App.js`**: The main application component that sets up the routing using `react-router-dom`.
    -   **`index.js`**: The top-level file that renders the `App` component into the DOM.

## Features

- **Multiple Dashboard Layouts**: 11 different dashboard layouts for various use cases
- **Responsive Design**: Fully responsive design that works on all devices
- **Dark/Light Mode**: Built-in theme toggle functionality
- **Authentication Pages**: Sign in, sign up, forgot password pages
- **UI Components**: Comprehensive set of UI components including buttons, alerts, avatars, etc.
- **Data Visualization**: Various charts and graphs for data representation
- **E-commerce Features**: Product management, order tracking, customer management
- **Payment Gateway Integration**: Support for PayPal and RazorPay

## Dashboard Layouts

The application includes 11 different dashboard layouts, each designed for specific use cases:

1. **Dashboard One** (`DashBoardLayerOne`): General admin dashboard with sales statistics, user overview, and content generation
2. **Dashboard Two** (`DashBoardLayerTwo`): Revenue tracking, campaign statistics, and client payment management
3. **Dashboard Three** (`DashBoardLayerThree`): E-commerce focused with revenue reports, customer statistics, and order management
4. **Dashboard Four** (`DashBoardLayerFour`): Marketing dashboard with campaign analytics
5. **Dashboard Five** (`DashBoardLayerFive`): Investment tracking with revenue statistics and project status
6. **Dashboard Six** (`DashBoardLayerSix`): Education/LMS dashboard with course analytics and student progress
7. **Dashboard Seven** (`DashBoardLayerSeven`): NFT marketplace with trending bids, NFTs, and creator features
8. **Dashboard Eight** (`DashBoardLayerEight`): Healthcare dashboard with patient statistics and appointment management
9. **Dashboard Nine** (`DashBoardLayerNine`): Support tracking and sales analytics
10. **Dashboard Ten** (`DashBoardLayerTen`): Inventory management with supplier and customer tracking
11. **Dashboard Eleven** (`DashBoardLayerEleven`): Financial dashboard with balance statistics and expense tracking

## UI Components

### Buttons
- Default Buttons
- Outline Buttons
- Rounded Buttons
- Soft Buttons
- Text Buttons
- Buttons with Labels
- Button Sizes
- Button Groups
- Custom Buttons

### Alerts
- Default Alerts
- Outline Alerts
- Dismissible Alerts
- Alert with Icons

### Avatars
- Avatar Sizes
- Avatars with Content
- Avatar Shape Styles
- Status Indicators
- Avatar Groups
- Images with Content

### Form Elements
- Input Fields
- Checkboxes
- Radio Buttons
- Select Dropdowns
- Text Areas
- Form Validation

### Cards
- Basic Cards
- Card with Header/Footer
- Card with Images
- Card with Actions

### Navigation
- Sidebar Navigation
- Breadcrumbs
- Tabs
- Pagination

### Modals and Dialogs
- Basic Modals
- Confirmation Dialogs
- Custom Modals

### Tables
- Basic Tables
- Data Tables
- Sortable Tables
- Filterable Tables

## Authentication

The application includes authentication pages:
- Sign In (`SignInLayer`)
- Sign Up (`SignUpLayer`)
- Forgot Password
- Reset Password

## Charts and Data Visualization

Various chart types are available for data visualization:
- Line Charts
- Bar Charts
- Area Charts
- Pie Charts
- Donut Charts
- Radar Charts
- Heatmaps
- Zoomable Charts

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wowdash.git

# Navigate to the project directory
cd wowdash

# Install dependencies
npm install
```

## Usage

```bash
# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Dependencies

- React
- React Router DOM
- Bootstrap
- React ApexCharts
- JSVectorMap
- React Quill
- React Toastify
- React Modal Video
- Iconify/React
- Phosphor Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

© 2024 WowDash. All Rights Reserved.
