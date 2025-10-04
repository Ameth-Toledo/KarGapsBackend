import { IPlayeraRepository } from '../domain/Playera_Repository';
import { CloudinaryService } from '../../core/cloudinary/uploadService';

export class DeletePlayeraUseCase {
    constructor(private db: IPlayeraRepository) {}

    async execute(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error('ID inválido');
        }

        const existingPlayera = await this.db.getById(id);
        if (!existingPlayera) {
            throw new Error('Playera no encontrada');
        }

        // Eliminar imagen de Cloudinary antes de eliminar el registro
        if (existingPlayera.imagen_url) {
            try {
                await CloudinaryService.deleteImage(existingPlayera.imagen_url);
            } catch (error) {
                console.error('Error al eliminar imagen de Cloudinary:', error);
                // Continuar con la eliminación aunque falle la imagen
            }
        }

        await this.db.delete(id);
    }
}