import { Request, Response } from 'express';
import { GetGorraByIdUseCase } from '../../application/GetGorraById_UseCase';

export class GetGorraByIdController {
    constructor(private getGorraById: GetGorraByIdUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            const gorra = await this.getGorraById.execute(id);

            if (!gorra) {
                res.status(404).json({ error: 'Gorra no encontrada' });
                return;
            }

            res.status(200).json({ gorra });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ error: errorMessage });
        }
    }
}