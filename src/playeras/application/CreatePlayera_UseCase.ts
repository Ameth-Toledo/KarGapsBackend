import { IPlayeraRepository } from '../domain/Playera_Repository';
import { Playera } from '../domain/entities/Playera';
import { CloudinaryService } from '../../core/cloudinary/uploadService';

export class CreatePlayeraUseCase {
    constructor(private db: IPlayeraRepository) {}

    async execute(playera: Playera, imageBuffer?: Buffer): Promise<Playera> {
        if (!playera.nombre || playera.nombre.trim() === '') {
            throw new Error('El nombre es obligatorio');
        }
        if (playera.precio < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        if (playera.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }
        if (!playera.talla || playera.talla.trim() === "") {
            throw new Error("La talla no puede estar vacía");
        }
        if (!playera.material || playera.material.trim() === "") {
            throw new Error("La talla no puede estar vacía");
        }
        if (!playera.tipo || playera.tipo.trim() === "") {
            throw new Error("El tipo no puede estar vacio")
        }
        if (!playera.material || playera.material.trim() === "") {
            throw new Error("El material no puede estar vacio")
        }

        if (imageBuffer) {
            try {
                const imageUrl = await CloudinaryService.uploadImage(imageBuffer, 'playeras');
                playera.imagen_url = imageUrl;
            } catch (error) {
                throw new Error(`Error al subir imagen: ${error}`);
            }
        }

        return await this.db.save(playera);
    }
}