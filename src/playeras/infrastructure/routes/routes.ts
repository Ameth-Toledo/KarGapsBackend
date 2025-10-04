import { Router } from 'express';
import { CreatePlayeraController, uploadPlayera } from '../controllers/CreatePlayera_Controller';
import { GetAllPlayerasController } from '../controllers/GetAllPlayera_Controller';
import { GetPlayeraByIdController } from '../controllers/GetPlayeraById_Controller';
import { UpdatePlayeraController } from '../controllers/UpdatePlayera_Controller';
import { DeletePlayeraController } from '../controllers/DeletePlayera_Controller';
import { SearchPlayerasController } from '../controllers/SearchPlayeras_Controller';

export const configurePlayeraRoutes = (
    router: Router,
    createPlayeraController: CreatePlayeraController,
    getAllPlayerasController: GetAllPlayerasController,
    getByIdPlayeraController: GetPlayeraByIdController,
    updatePlayeraController: UpdatePlayeraController,
    deletePlayeraController: DeletePlayeraController,
    searchPlayerasController: SearchPlayerasController
): void => {
    const playerasGroup = Router();

    playerasGroup.post('/', uploadPlayera.single('imagen'), (req, res) => 
        createPlayeraController.execute(req, res)
    );
    playerasGroup.get('/', (req, res) => getAllPlayerasController.execute(req, res));
    playerasGroup.get('/search', (req, res) => searchPlayerasController.execute(req, res));
    playerasGroup.get('/:id', (req, res) => getByIdPlayeraController.execute(req, res));
    playerasGroup.put('/:id', uploadPlayera.single('imagen'), (req, res) => 
        updatePlayeraController.execute(req, res)
    );
    playerasGroup.delete('/:id', (req, res) => deletePlayeraController.execute(req, res));

    router.use('/playeras', playerasGroup);
};