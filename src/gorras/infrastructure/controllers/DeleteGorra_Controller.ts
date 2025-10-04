import { Request, Response } from 'express';
import { DeleteGorraUseCase } from '../../application/DeleteGorra_UseCase';

export class DeleteGorraController {
    constructor(private deleteGorra: DeleteGorraUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            await this.deleteGorra.execute(id);

            res.status(200).json({ message: 'Gorra eliminada exitosamente' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}