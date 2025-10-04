import { Request, Response } from 'express';
import { UpdateUserUseCase } from '../../application/UpdateUser_UseCase';
import { User } from '../../domain/entities/User';

interface UpdateUserRequest {
    nombres: string;
    apellido_paterno: string;
    apellido_materno?: string;
    email: string;
    rol_id: number;
    avatar?: number;
}

export class UpdateUserController {
    constructor(private updateUser: UpdateUserUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            const body = req.body as UpdateUserRequest;

            if (!body.nombres || !body.apellido_paterno || !body.email || !body.rol_id) {
                res.status(400).json({ error: 'Faltan campos requeridos' });
                return;
            }

            let avatar = body.avatar || 1;
            if (avatar < 1 || avatar > 5) {
                avatar = 1;
            }

            const user: User = {
                id: id,
                nombres: body.nombres,
                apellido_paterno: body.apellido_paterno,
                apellido_materno: body.apellido_materno || '',
                email: body.email,
                password_hash: '', // No se actualiza el password aquí
                rol_id: body.rol_id,
                avatar: avatar
            };

            await this.updateUser.execute(user);

            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}