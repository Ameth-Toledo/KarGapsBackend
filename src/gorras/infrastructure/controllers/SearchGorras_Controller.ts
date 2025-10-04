import { Request, Response } from 'express';
import { SearchGorrasUseCase } from '../../application/SearchGorras_UseCase';

export class SearchGorrasController {
    constructor(private searchGorras: SearchGorrasUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.q as string;

            if (!query) {
                res.status(400).json({ error: 'Query de búsqueda requerido' });
                return;
            }

            const gorras = await this.searchGorras.execute(query);

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