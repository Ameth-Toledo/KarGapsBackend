import { IPlayeraRepository } from '../domain/Playera_Repository';
import { Playera } from '../domain/entities/Playera';
import { CloudinaryService } from '../../core/cloudinary/uploadService';

export class UpdatePlayeraUseCase {
    constructor(private db: IPlayeraRepository) {}

    async execute(playera: Playera, imageBuffer?: Buffer): Promise<void> {
        if (!playera.id || playera.id <= 0) {
            throw new Error('ID inválido');
        }

        const existingPlayera = await this.db.getById(playera.id);
        if (!existingPlayera) {
            throw new Error('Playera no encontrada');
        }

        // Si se proporciona una nueva imagen, eliminar la anterior y subir la nueva
        if (imageBuffer) {
            try {
                // Eliminar imagen anterior de Cloudinary
                if (existingPlayera.imagen_url) {
                    await CloudinaryService.deleteImage(existingPlayera.imagen_url);
                }

                // Subir nueva imagen
                const imageUrl = await CloudinaryService.uploadImage(imageBuffer, 'playeras');
                playera.imagen_url = imageUrl;
            } catch (error) {
                throw new Error(`Error al actualizar imagen: ${error}`);
            }
        } else {
            // Conservar la imagen anterior si no se proporciona una nueva
            playera.imagen_url = existingPlayera.imagen_url;
        }

        await this.db.update(playera);
    }
}