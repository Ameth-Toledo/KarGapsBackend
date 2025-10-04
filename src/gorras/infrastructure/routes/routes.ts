import { Router } from 'express';
import { CreateGorraController, uploadGorra } from '../controllers/CreateGorra_Controller';
import { GetAllGorrasController } from '../controllers/GetAllGorras_Controller';
import { GetGorraByIdController } from '../controllers/GetGorraById_Controller'; 
import { UpdateGorraController } from '../controllers/UpdateGorra_Controller';
import { DeleteGorraController } from '../controllers/DeleteGorra_Controller';
import { SearchGorrasController } from '../controllers/SearchGorras_Controller';

export const configureGorraRoutes = (
    router: Router,
    createGorraController: CreateGorraController,
    getAllGorrasController: GetAllGorrasController,
    getByIdGorraController: GetGorraByIdController,
    updateGorraController: UpdateGorraController,
    deleteGorraController: DeleteGorraController,
    searchGorrasController: SearchGorrasController
): void => {
    const gorrasGroup = Router();

    gorrasGroup.post('/', uploadGorra.single('imagen'), (req, res) => 
        createGorraController.execute(req, res)
    );
    gorrasGroup.get('/', (req, res) => getAllGorrasController.execute(req, res));
    gorrasGroup.get('/search', (req, res) => searchGorrasController.execute(req, res));
    gorrasGroup.get('/:id', (req, res) => getByIdGorraController.execute(req, res));
    gorrasGroup.put('/:id', uploadGorra.single('imagen'), (req, res) => 
        updateGorraController.execute(req, res)
    );
    gorrasGroup.delete('/:id', (req, res) => deleteGorraController.execute(req, res));

    router.use('/gorras', gorrasGroup);
};