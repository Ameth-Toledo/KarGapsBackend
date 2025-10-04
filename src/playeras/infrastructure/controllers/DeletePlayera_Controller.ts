import { Request, Response } from 'express';
import { DeletePlayeraUseCase } from '../../application/DeletePlayera_UseCase';

export class DeletePlayeraController {
    constructor(private deletePlayera: DeletePlayeraUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            await this.deletePlayera.execute(id);

            res.status(200).json({ message: 'Playera eliminada exitosamente' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}