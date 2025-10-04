import { Request, Response } from 'express';
import { GetAllGorrasUseCase } from '../../application/GetAllGorras_UseCase';

export class GetAllGorrasController {
    constructor(private getAllGorras: GetAllGorrasUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const gorras = await this.getAllGorras.execute();

            res.status(200).json({
                gorras,
                total: gorras.length
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ error: errorMessage });
        }
    }
}