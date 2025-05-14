Project Structure (Frontend)
ayirbasta_front_react/
├── src/
│ ├── api/
│ │ └── api.js # Axios instance for API calls
│ ├── assets/ # Static assets (images, icons, etc.)
│ ├── components/
│ │ ├── Action/
│ │ ├── Barter/
│ │ ├── BarterMenu/
│ │ ├── Button/
│ │ ├── CardVariant/
│ │ ├── Footer/
│ │ ├── Header/
│ │ ├── Item/
│ │ ├── Offer/
│ │ ├── OffersNearby/
│ │ ├── Pagination/
│ │ ├── ProductOffers/
│ │ ├── ProductsAndService/
│ │ └── SecondBarter/
│ ├── containers/ # Higher-level components managing state and logic
│ ├── context/
│ │ └── AuthContext.js # Manages user authentication state
│ ├── pages/
│ │ ├── AddOffer/
│ │ ├── BartersPage/
│ │ ├── BartersPageInfo/
│ │ ├── Chat/
│ │ ├── EditProduct/
│ │ ├── LikedItems/
│ │ ├── Login/
│ │ ├── Offers/
│ │ ├── ProductPage/
│ │ ├── Products/
│ │ ├── Registration/
│ │ └── Settings/
│ ├── scss/ # Global SCSS styles
│ ├── store/ # State management logic

│ ├── utils/ # Utility functions
│ ├── App.js # Main React component
│ └── index.js # Entry point
└── package.json # Project dependencies

The MERN stack—comprising MongoDB, Express, React, and Node.js—was chosen for the Ayirbasta project for the following reasons:

• MongoDB: A flexible, document-oriented database that allows for dynamic schemas, making it perfect for handling complex data structures such as user items and trades.
• Express.js: A minimal and flexible Node.js web framework that simplifies server-side development, allowing for efficient routing, middleware integration, and RESTful API creation.
• React: A powerful, component-based JavaScript library that facilitates building interactive and responsive user interfaces, providing a seamless user experience.
• Node.js: A fast, event-driven runtime environment that enables server-side JavaScript execution, making it ideal for building scalable and real-time applications.

This combination (MERN) allows for full-stack JavaScript development, enabling smoother data flow and better developer productivity with a single language across both frontend and backend.

1. Project Overview

   1. Ayirbasta is a frontend application that allows users to:
      • Register and Login into the system.
      • List and manage offers (products/services they want to exchange).
      • Initiate and receive barters (trades) with other users.
      • Edit their profile settings (e.g., personal details, profile image).
      The application aims to facilitate item/service exchange among users in a user-friendly and secure manner.
      1.1 Key Features
   2. User Authentication
      o Login: Existing users can sign in.
      o Registration: New users can create an account with their email, password, and personal details.
   3. Offers Management
      o Offers Page: Displays a user’s active offers (items/services) and allows them to add new offers.
      o Add Offer: A dedicated page with a form for creating new offers, including file uploads (images).
   4. Barters (Trades)
      o Barters Page: Shows trades initiated by the user or to the user.
      o Trade Details: Each trade can be opened to view or finalize the exchange.
   5. Profile Settings
      o Settings Page: Lets users update their first name, last name, email, city, and upload a profile image.
      1.2 Motivation
      The motivation behind Ayirbasta is to create a platform where people can swap items without a direct monetary exchange. Whether it’s used electronics, fashion items, or services, users can easily post, browse, and negotiate trades.

2. Architecture & Technologies
   2.1 High-Level Architecture
   Ayirbasta is built using React for the frontend and consumes backend REST APIs. The main technologies include:
   • React (version 18.x) for the UI.
   • React Router (version 6.x) for client-side routing.
   • Context API for global authentication state.
   • Axios for HTTP requests (encapsulated in a dedicated apiClient module).
   • styled-components for component-based styling.
   • Jest and React Testing Library for testing.

3. Testing Approach
   All tests use Jest and React Testing Library. Key points:

   1. Login Tests:
      o Checks redirect if token is present.
      o Verifies the form renders if token is absent.
      o Mocks apiClient.post and ensures localStorage + navigation on successful login.
   2. Registration Tests:
      o Redirect if already logged in.
      o Check rendering of input fields and correct API call on submit.
      o Ensures navigation to /login on successful response.
   3. Offers Tests:
      o Mocks apiClient.get to confirm offers are displayed or an empty message shows.
      o Verifies an "ADD OFFER" button is rendered.
   4. AddOffer Tests:
      o Checks form fields (category, name, description, image).
      o Mocks apiClient.post to ensure submission logic works and navigates afterward.
   5. BartersPage Tests:
      o Mocks /v1/users/trades.
      o Verifies "Trades to you" and "Trades from you" sections appear.
      o Checks empty state message if no trades are present.
   6. Settings Tests:
      o Mocks fetching user data for the profile.
      o Confirms the form is populated.
      o Mocks a PATCH request and checks success/failure alerts.

4. Clone the repository
   1. git clone https://github.com/Asanalii/ayirbasta_frontend cd ayirbasta_front_react
   2. Install dependencies npm install or yarn install
   3. npm run dev or yarn dev
