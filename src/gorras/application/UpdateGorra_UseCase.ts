import { IGorraRepository } from '../domain/Gorra_Repository';
import { Gorra } from '../domain/entities/Gorra';
import { CloudinaryService } from '../../core/cloudinary/uploadService';

export class UpdateGorraUseCase {
    constructor(private db: IGorraRepository) {}

    async execute(gorra: Gorra, imageBuffer?: Buffer): Promise<void> {
        if (!gorra.id || gorra.id <= 0) {
            throw new Error('ID inválido');
        }

        const existingGorra = await this.db.getById(gorra.id);
        if (!existingGorra) {
            throw new Error('Gorra no encontrada');
        }

        // Si se proporciona una nueva imagen, eliminar la anterior y subir la nueva
        if (imageBuffer) {
            try {
                // Eliminar imagen anterior de Cloudinary
                if (existingGorra.imagen_url) {
                    await CloudinaryService.deleteImage(existingGorra.imagen_url);
                }

                // Subir nueva imagen
                const imageUrl = await CloudinaryService.uploadImage(imageBuffer, 'gorras');
                gorra.imagen_url = imageUrl;
            } catch (error) {
                throw new Error(`Error al actualizar imagen: ${error}`);
            }
        } else {
            // Conservar la imagen anterior si no se proporciona una nueva
            gorra.imagen_url = existingGorra.imagen_url;
        }

        await this.db.update(gorra);
    }
}