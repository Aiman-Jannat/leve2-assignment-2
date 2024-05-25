# E-Commerce backend

## Description

This project is mainly for learning node, express and mongoose.

## Environment Variables

Before running the project, ensure you have the following environment variables set:

- `NODE_ENV`: Set to `development` for local development.
- `PORT`: Set to `5000`.
- `DATABASE_URL`: MongoDB connection string for accessing the database.

Example `.env` file:
```dotenv
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://adminProjectOneLevlTwo:adminProjectOneLevlTwo123@cluster0.tzvbxiw.mongodb.net/level-2-project-1?retryWrites=true&w=majority&appName=Cluster0
```
# Running the Project Locally

To run the project locally:

1. Set the environment variables in a `.env` file as shown above.
2. Install dependencies: 
   ```bash
   npm install
3. Start the development server: 
   ```bash
   npm run start:dev
   ```
   or
   ```bash
   node dist/server.js
   ```
   The server will be running locally at [http://localhost:5000](http://localhost:5000).
   # Production Deployment
   - The production version of the project is deployed at [https://backend-o86rzkqxm-aimans-projects.vercel.app](https://backend-o86rzkqxm-aimans-projects.vercel.app).
