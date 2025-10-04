import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDBPool } from './src/core/db_postgresql';
import { initUsers } from './src/users/infrastructure/dependencies';
import { configureUserRoutes } from './src/users/infrastructure/routes/routes';
import { initGorras } from './src/gorras/infrastructure/dependencies';
import { configureGorraRoutes } from './src/gorras/infrastructure/routes/routes';
import { initPlayeras } from './src/playeras/infrastructure/dependencies';
import { configurePlayeraRoutes } from './src/playeras/infrastructure/routes/routes';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const dbConnection = getDBPool();

const userDependencies = initUsers(dbConnection);
const gorraDependencies = initGorras(dbConnection);
const playeraDependencies = initPlayeras(dbConnection);

const router = express.Router();

configureUserRoutes(
    router,
    userDependencies.createUserController,
    userDependencies.getAllUsersController,
    userDependencies.getByIdUserController,
    userDependencies.updateUserController,
    userDependencies.deleteUserController,
    userDependencies.authController
);

configureGorraRoutes(
    router,
    gorraDependencies.createGorraController,
    gorraDependencies.getAllGorrasController,
    gorraDependencies.getByIdGorraController,
    gorraDependencies.updateGorraController,
    gorraDependencies.deleteGorraController,
    gorraDependencies.searchGorrasController
);

configurePlayeraRoutes(
    router,
    playeraDependencies.createPlayeraController,
    playeraDependencies.getAllPlayerasController,
    playeraDependencies.getByIdPlayeraController,
    playeraDependencies.updatePlayeraController,
    playeraDependencies.deletePlayeraController,
    playeraDependencies.searchPlayerasController
);

app.use('/api', router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en puerto ${port}`);
});