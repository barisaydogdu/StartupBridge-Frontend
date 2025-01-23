# StartupBridge Frontend

StartupBridge Frontend is the user interface for the StartupBridge platform. It provides an intuitive and responsive design for entrepreneurs and investors to collaborate effectively.

## Features

### User Authentication
- Secure login and registration.
- Role-based access for entrepreneurs, investors, and admins.

### Dashboard
- Personalized dashboards for users.
- View key metrics and updates in real-time.

### Project Management
- Create, update, and manage projects.
- Browse and filter projects based on interests.

### Investment Management
- Explore investment opportunities.
- Manage and track investments.

### Communication Tools
- Add comments to blogs and projects.
- Manage communication preferences.

## Technology Stack

### Frontend
- React
- TailwindCSS
- Context API for state management

### Utilities
- Axios for API requests
- React Router for navigation
- PostCSS for CSS processing

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/StartupBridge-Frontend.git
   cd StartupBridge-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   REACT_APP_ENV=development
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```
StartupBridge-Frontend
├── public
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src
│   ├── components
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProjectList.js
│   │   └── ...
│   ├── context
│   │   └── AuthContext.jsx
│   ├── services
│   │   ├── AuthProvider.js
│   │   └── authService.js
│   ├── utils
│   │   └── axios.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── tailwind.config.js
└── ...
```

## Contribution

Contributions are welcome! Please fork the repository and create a pull request with detailed explanations of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
