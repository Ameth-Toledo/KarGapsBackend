import { ConnPostgreSQL } from '../../core/db_postgresql';
import { PostgreSQLUserRepository } from './adapters/PostgreSQL';
import { AuthServiceUseCase } from '../application/AuthService_UseCase';
import { CreateUserUseCase } from '../application/CreateUser_UseCase';
import { GetAllUsersUseCase } from '../application/GetAllUsers_UseCase';
import { GetUserByIdUseCase } from '../application/GetUserById_UseCase';
import { UpdateUserUseCase } from '../application/UpdateUser_UseCase';
import { DeleteUserUseCase } from '../application/DeleteUser_UseCase';
import { AuthController } from './controllers/AuthController';
import { CreateUserController } from './controllers/CreateUser_Controller';
import { GetAllUsersController } from './controllers/GetAllUsers_Controller';
import { GetUserByIdController } from './controllers/GetUserById_Controller';
import { UpdateUserController } from './controllers/UpdateUser_Controller';
import { DeleteUserController } from './controllers/DeleteUser_Controller';

export interface DependenciesUsers {
    createUserController: CreateUserController;
    getAllUsersController: GetAllUsersController;
    getByIdUserController: GetUserByIdController;
    updateUserController: UpdateUserController;
    deleteUserController: DeleteUserController;
    authController: AuthController;
}

export const initUsers = (conn: ConnPostgreSQL): DependenciesUsers => {
    const userRepository = new PostgreSQLUserRepository(conn);
    
    const authService = new AuthServiceUseCase(userRepository);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    return {
        createUserController: new CreateUserController(createUserUseCase, authService),
        getAllUsersController: new GetAllUsersController(getAllUsersUseCase),
        getByIdUserController: new GetUserByIdController(getUserByIdUseCase),
        updateUserController: new UpdateUserController(updateUserUseCase),
        deleteUserController: new DeleteUserController(deleteUserUseCase),
        authController: new AuthController(authService)
    };
};