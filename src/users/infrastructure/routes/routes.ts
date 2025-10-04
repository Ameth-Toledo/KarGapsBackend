import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { CreateUserController } from '../controllers/CreateUser_Controller';
import { GetAllUsersController } from '../controllers/GetAllUsers_Controller';
import { GetUserByIdController } from '../controllers/GetUserById_Controller';
import { UpdateUserController } from '../controllers/UpdateUser_Controller';
import { DeleteUserController } from '../controllers/DeleteUser_Controller';

export const configureUserRoutes = (
    router: Router,
    createUserController: CreateUserController,
    getAllUsersController: GetAllUsersController,
    getByIdUserController: GetUserByIdController,
    updateUserController: UpdateUserController,
    deleteUserController: DeleteUserController,
    authController: AuthController
): void => {
    const userGroup = Router();
    const authGroup = Router();

    // Rutas de usuarios
    userGroup.post('/', (req, res) => createUserController.execute(req, res));
    userGroup.get('/', (req, res) => getAllUsersController.execute(req, res));
    userGroup.get('/:id', (req, res) => getByIdUserController.execute(req, res));
    userGroup.put('/:id', (req, res) => updateUserController.execute(req, res));
    userGroup.delete('/:id', (req, res) => deleteUserController.execute(req, res));

    // Rutas de autenticación
    authGroup.post('/login', (req, res) => authController.execute(req, res));

    router.use('/users', userGroup);
    router.use('/auth', authGroup);
};  