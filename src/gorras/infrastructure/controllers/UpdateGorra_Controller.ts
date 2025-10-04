import { Request, Response } from 'express';
import { UpdateGorraUseCase } from '../../application/UpdateGorra_UseCase';
import { Gorra } from '../../domain/entities/Gorra';

export class UpdateGorraController {
    constructor(private updateGorra: UpdateGorraUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            const { nombre, descripcion, precio, stock, color } = req.body;

            if (!nombre || !precio || stock === undefined || !color) {
                res.status(400).json({ error: 'Faltan campos requeridos' });
                return;
            }

            const gorra: Gorra = {
                id,
                nombre,
                descripcion: descripcion || '',
                precio: parseFloat(precio),
                stock: parseInt(stock),
                color,
                imagen_url: ''
            };

            const imageBuffer = req.file?.buffer;

            await this.updateGorra.execute(gorra, imageBuffer);

            res.status(200).json({ message: 'Gorra actualizada exitosamente' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}