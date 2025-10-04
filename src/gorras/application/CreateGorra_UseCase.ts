import { IGorraRepository } from '../domain/Gorra_Repository';
import { Gorra } from '../domain/entities/Gorra';
import { CloudinaryService } from '../../core/cloudinary/uploadService';

export class CreateGorraUseCase {
    constructor(private db: IGorraRepository) {}

    async execute(gorra: Gorra, imageBuffer?: Buffer): Promise<Gorra> {
        if (!gorra.nombre || gorra.nombre.trim() === '') {
            throw new Error('El nombre es obligatorio');
        }
        if (gorra.precio < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        if (gorra.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        if (imageBuffer) {
            try {
                const imageUrl = await CloudinaryService.uploadImage(imageBuffer, 'gorras');
                gorra.imagen_url = imageUrl;
            } catch (error) {
                throw new Error(`Error al subir imagen: ${error}`);
            }
        }

        return await this.db.save(gorra);
    }
}