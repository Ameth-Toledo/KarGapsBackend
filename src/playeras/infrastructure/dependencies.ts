import { ConnPostgreSQL } from '../../core/db_postgresql';
import { CreatePlayeraUseCase } from '../application/CreatePlayera_UseCase';
import { DeletePlayeraUseCase } from '../application/DeletePlayera_UseCase';
import { GetAllPlayerasUseCase } from '../application/GetAllPlayera_UseCase';
import { GetPlayeraByIdUseCase } from '../application/GetPlayeraById_UseCase';
import { SearchPlayerasUseCase } from '../application/SearchPlayeras_UseCase';
import { UpdatePlayeraUseCase } from '../application/UpdatePlayera_UseCase';
import { PostgreSQLPlayeraRepository } from './adapters/PostgreSQL';
import { CreatePlayeraController } from './controllers/CreatePlayera_Controller';
import { DeletePlayeraController } from './controllers/DeletePlayera_Controller';
import { GetAllPlayerasController } from './controllers/GetAllPlayera_Controller';
import { GetPlayeraByIdController } from './controllers/GetPlayeraById_Controller';
import { SearchPlayerasController } from './controllers/SearchPlayeras_Controller';
import { UpdatePlayeraController } from './controllers/UpdatePlayera_Controller';


export interface DependenciesPlayeras {
    createPlayeraController: CreatePlayeraController;
    getAllPlayerasController: GetAllPlayerasController;
    getByIdPlayeraController: GetPlayeraByIdController;
    updatePlayeraController: UpdatePlayeraController;
    deletePlayeraController: DeletePlayeraController;
    searchPlayerasController: SearchPlayerasController;
}

export const initPlayeras = (conn: ConnPostgreSQL): DependenciesPlayeras => {
    const playeraRepository = new PostgreSQLPlayeraRepository(conn);
    
    const createPlayeraUseCase = new CreatePlayeraUseCase(playeraRepository);
    const getAllPlayeraUseCase = new GetAllPlayerasUseCase(playeraRepository);
    const getPlayeraByIdUseCase = new GetPlayeraByIdUseCase(playeraRepository);
    const updatePlayeraUseCase = new UpdatePlayeraUseCase(playeraRepository);
    const deletePlayeraUseCase = new DeletePlayeraUseCase(playeraRepository);
    const searchPlayerasUseCase = new SearchPlayerasUseCase(playeraRepository);

    return {
        createPlayeraController: new CreatePlayeraController(createPlayeraUseCase),
        getAllPlayerasController: new GetAllPlayerasController(getAllPlayeraUseCase),
        getByIdPlayeraController: new GetPlayeraByIdController(getPlayeraByIdUseCase),
        updatePlayeraController: new UpdatePlayeraController(updatePlayeraUseCase),
        deletePlayeraController: new DeletePlayeraController(deletePlayeraUseCase),
        searchPlayerasController: new SearchPlayerasController(searchPlayerasUseCase)
    };
};