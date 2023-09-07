# Wine Cellar Tours App

Welcome to the Wine Cellar Tours app repository! This application is designed to provide users with an immersive experience of exploring and discovering wine cellars in Mendoza, Argentina

## How to run this applicatión
1. Clone the repository

2. Execute
```
pnpm install
```
3. Clone the files __.env.example__ and rename the copy to __.env__

4. Fill the enviroments variables defined in the ```.env```

5. Have docker desktop installed

6. Start the databases
```
docker compose up -d
```

7. Execute the backend

```
cd backend
pnpm start
```

8. Execute the frontend

```
pnpm run start
```

## User Story - Customer

[✅] - As a customer, I want to access a landing page that provides information about the service, wine tours, reviews, available tours with their prices, a form for submitting questions, and contact information.

[✅] - As a customer, I want to browse through upcoming tours and view their location, price, and rating.

[⌛] - As a customer, I want to view detailed information about a specific tour, including its price, rating, reviews, wine cellars included, and specific activities offered at each wine cellar.

[⌛] - As a customer, I want to book and purchase wine cellar tours directly through the app, using payment methods such as PayPal, Mercado Pago, or other available options.

[⌛] - As a customer, I want to explore a collection of wine cellars and access detailed information about each one.

[⌛] - As a customer, I want to filter wine cellars based on their location, name, or other criteria.

[⌛] - As a customer, I want to view comprehensive information about each wine cellar, including its history, wine collection, and the tours in which customers can visit it.

[⌛] - As a customer, I want to leave reviews and ratings for wine cellars that I have visited.

[⌛] - As a customer, I want to be able to sign up by providing my name, email, password, nationality, and card ID.

[⌛] - As a customer, I want to have the ability to change my password, update my personal information, and upload a profile picture.

### User Story - Guides

[⌛] - As a guide, I want to access a table that displays information about the tours I am assigned to guide.

[⌛] - As a guide, I want to select a tour and view detailed information about the corresponding customer.

[⌛] - As a guide, I want to have the ability to confirm the attendance of customers on the day of the tour.

### User Story - Lead Guides

[⌛] - As a lead guide, I want to have the same functionalities as regular guides.

[⌛] - As a lead guide, I want to create tours and assign guides to them.

[⌛] - As a lead guide, I want to create and manage guides and other lead guides.

## Technologies Used

- Frontend: React, TypeScript, React Query, React Router, CSS modules.
- Backend: Node.js, Express, Zod, Prisma, PostgreSQL, Redis.
