import { Request, Response } from 'express';
import { CreateGorraUseCase } from '../../application/CreateGorra_UseCase';
import { Gorra } from '../../domain/entities/Gorra';
import multer from 'multer';

const storage = multer.memoryStorage();
export const uploadGorra = multer({ storage: storage });

export class CreateGorraController {
    constructor(private createGorra: CreateGorraUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, descripcion, precio, stock, color } = req.body;

            if (!nombre || !precio || !stock || !color) {
                res.status(400).json({ error: 'Faltan campos requeridos' });
                return;
            }

            const gorra: Gorra = {
                nombre,
                descripcion: descripcion || '',
                precio: parseFloat(precio),
                stock: parseInt(stock),
                color,
                imagen_url: ''
            };

            const imageBuffer = req.file?.buffer;

            const savedGorra = await this.createGorra.execute(gorra, imageBuffer);

            res.status(201).json({
                message: 'Gorra creada exitosamente',
                gorra: savedGorra
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}