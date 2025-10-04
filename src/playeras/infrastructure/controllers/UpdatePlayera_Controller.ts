import { Request, Response } from 'express';
import { UpdatePlayeraUseCase } from '../../application/UpdatePlayera_UseCase';
import { Playera } from '../../domain/entities/Playera';

export class UpdatePlayeraController {
    constructor(private updatePlayera: UpdatePlayeraUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            const { nombre, descripcion, precio, stock, color, talla, tipo, material } = req.body;

            // Validar campos requeridos
            if (!nombre || !precio || stock === undefined || !color || !talla || !tipo || !material) {
                res.status(400).json({ 
                    error: 'Faltan campos requeridos',
                    camposRequeridos: ['nombre', 'precio', 'stock', 'color', 'talla', 'tipo', 'material']
                });
                return;
            }

            const playera: Playera = {
                id,
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

            const updatedPlayera = await this.updatePlayera.execute(playera, imageBuffer);

            res.status(200).json({ 
                message: 'Playera actualizada exitosamente',
                playera: updatedPlayera
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}