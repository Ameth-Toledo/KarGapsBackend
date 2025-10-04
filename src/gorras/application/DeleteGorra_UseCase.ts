import { IGorraRepository } from '../domain/Gorra_Repository';
import { CloudinaryService } from '../../core/cloudinary/uploadService';

export class DeleteGorraUseCase {
    constructor(private db: IGorraRepository) {}

    async execute(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error('ID inválido');
        }

        const existingGorra = await this.db.getById(id);
        if (!existingGorra) {
            throw new Error('Gorra no encontrada');
        }

        // Eliminar imagen de Cloudinary antes de eliminar el registro
        if (existingGorra.imagen_url) {
            try {
                await CloudinaryService.deleteImage(existingGorra.imagen_url);
            } catch (error) {
                console.error('Error al eliminar imagen de Cloudinary:', error);
                // Continuar con la eliminación aunque falle la imagen
            }
        }

        await this.db.delete(id);
    }
}