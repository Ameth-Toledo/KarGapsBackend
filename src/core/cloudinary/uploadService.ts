import cloudinary from './config';

export class CloudinaryService {
    static async uploadImage(fileBuffer: Buffer, folder: string = 'gorras'): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) {
                        reject(new Error(`Error al subir imagen a Cloudinary: ${error.message}`));
                    } else {
                        resolve(result!.secure_url);
                    }
                }
            );

            uploadStream.end(fileBuffer);
        });
    }

    static async deleteImage(imageUrl: string): Promise<void> {
        try {
            // Extraer el public_id de la URL de Cloudinary
            const parts = imageUrl.split('/');
            const fileNameWithExtension = parts[parts.length - 1];
            const fileName = fileNameWithExtension.split('.')[0];
            const folder = parts[parts.length - 2];
            const publicId = `${folder}/${fileName}`;

            await cloudinary.uploader.destroy(publicId);
            console.log('Imagen eliminada de Cloudinary:', publicId);
        } catch (error) {
            console.error('Error al eliminar imagen de Cloudinary:', error);
            throw new Error('Error al eliminar imagen de Cloudinary');
        }
    }
}