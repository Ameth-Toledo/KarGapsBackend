import { Request, Response } from 'express';
import { SearchPlayerasUseCase } from '../../application/SearchPlayeras_UseCase';

export class SearchPlayerasController {
    constructor(private searchPlayeras: SearchPlayerasUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.q as string;

            if (!query) {
                res.status(400).json({ error: 'Query de búsqueda requerido' });
                return;
            }

            const playeras = await this.searchPlayeras.execute(query);

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