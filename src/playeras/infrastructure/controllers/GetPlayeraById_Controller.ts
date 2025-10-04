import { Request, Response } from 'express';
import { GetPlayeraByIdUseCase } from '../../application/GetPlayeraById_UseCase';

export class GetPlayeraByIdController {
    constructor(private getPlayeraById: GetPlayeraByIdUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            const playera = await this.getPlayeraById.execute(id);

            if (!playera) {
                res.status(404).json({ error: 'Playera no encontrada' });
                return;
            }

            res.status(200).json({ playera });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ error: errorMessage });
        }
    }
}