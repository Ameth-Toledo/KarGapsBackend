import { ConnPostgreSQL } from '../../core/db_postgresql';
import { PostgreSQLGorraRepository } from './adapters/PostgreSQL';
import { CreateGorraUseCase } from '../application/CreateGorra_UseCase';
import { GetAllGorrasUseCase } from '../application/GetAllGorras_UseCase';
import { GetGorraByIdUseCase } from '../application/GetGorraById_UseCase';
import { UpdateGorraUseCase } from '../application/UpdateGorra_UseCase';
import { DeleteGorraUseCase } from '../application/DeleteGorra_UseCase';
import { SearchGorrasUseCase } from '../application/SearchGorras_UseCase';
import { CreateGorraController } from './controllers/CreateGorra_Controller';
import { GetAllGorrasController } from './controllers/GetAllGorras_Controller';
import { GetGorraByIdController } from './controllers/GetGorraById_Controller';
import { UpdateGorraController } from './controllers/UpdateGorra_Controller';
import { DeleteGorraController } from './controllers/DeleteGorra_Controller';
import { SearchGorrasController } from './controllers/SearchGorras_Controller';

export interface DependenciesGorras {
    createGorraController: CreateGorraController;
    getAllGorrasController: GetAllGorrasController;
    getByIdGorraController: GetGorraByIdController;
    updateGorraController: UpdateGorraController;
    deleteGorraController: DeleteGorraController;
    searchGorrasController: SearchGorrasController;
}

export const initGorras = (conn: ConnPostgreSQL): DependenciesGorras => {
    const gorraRepository = new PostgreSQLGorraRepository(conn);
    
    const createGorraUseCase = new CreateGorraUseCase(gorraRepository);
    const getAllGorrasUseCase = new GetAllGorrasUseCase(gorraRepository);
    const getGorraByIdUseCase = new GetGorraByIdUseCase(gorraRepository);
    const updateGorraUseCase = new UpdateGorraUseCase(gorraRepository);
    const deleteGorraUseCase = new DeleteGorraUseCase(gorraRepository);
    const searchGorrasUseCase = new SearchGorrasUseCase(gorraRepository);

    return {
        createGorraController: new CreateGorraController(createGorraUseCase),
        getAllGorrasController: new GetAllGorrasController(getAllGorrasUseCase),
        getByIdGorraController: new GetGorraByIdController(getGorraByIdUseCase),
        updateGorraController: new UpdateGorraController(updateGorraUseCase),
        deleteGorraController: new DeleteGorraController(deleteGorraUseCase),
        searchGorrasController: new SearchGorrasController(searchGorrasUseCase)
    };
};