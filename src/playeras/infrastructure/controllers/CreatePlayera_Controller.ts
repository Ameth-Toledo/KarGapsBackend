import { Request, Response } from 'express';
import { CreatePlayeraUseCase } from '../../application/CreatePlayera_UseCase';
import { Playera } from '../../domain/entities/Playera';
import multer from 'multer';

const storage = multer.memoryStorage();
export const uploadPlayera = multer({ storage: storage });

export class CreatePlayeraController {
    constructor(private createPlayera: CreatePlayeraUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, descripcion, precio, stock, color, talla, tipo, material } = req.body;

            // Validar campos requeridos
            if (!nombre || !precio || !stock || !color || !talla || !tipo || !material) {
                res.status(400).json({ 
                    error: 'Faltan campos requeridos',
                    camposRequeridos: ['nombre', 'precio', 'stock', 'color', 'talla', 'tipo', 'material']
                });
                return;
            }

            const playera: Playera = {
                nombre,
                descripcion: descripcion || '',
                precio: parseFloat(precio),
                stock: parseInt(stock),
                color,
                talla,
                tipo,
                material,
                imagen_url: ''
            };

            const imageBuffer = req.file?.buffer;

            const savedPlayera = await this.createPlayera.execute(playera, imageBuffer);

            res.status(201).json({
                message: 'Playera creada exitosamente',
                playera: savedPlayera
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}