import { Request, Response } from 'express';
import { GetAllPlayerasUseCase } from '../../application/GetAllPlayera_UseCase';

export class GetAllPlayerasController {
    constructor(private getAllPlayeras: GetAllPlayerasUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const playeras = await this.getAllPlayeras.execute();

            res.status(200).json({
                playeras,
                total: playeras.length
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ error: errorMessage });
        }
    }
}