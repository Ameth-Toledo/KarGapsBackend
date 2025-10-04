import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/CreateUser_UseCase';
import { AuthServiceUseCase } from '../../application/AuthService_UseCase';
import { User } from '../../domain/entities/User';

interface CreateUserRequest {
    nombres: string;
    apellido_paterno: string;
    apellido_materno?: string;
    email: string;
    password: string;
    rol_id: number;
    avatar?: number;
}

export class CreateUserController {
    constructor(
        private createUser: CreateUserUseCase,
        private authService: AuthServiceUseCase
    ) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body as CreateUserRequest;

            if (!body.nombres || !body.apellido_paterno || !body.email || !body.password || !body.rol_id) {
                res.status(400).json({ error: 'Faltan campos requeridos' });
                return;
            }

            let avatar = body.avatar || 1;
            if (avatar < 1 || avatar > 5) {
                avatar = 1;
            }

            const user: User = {
                nombres: body.nombres,
                apellido_paterno: body.apellido_paterno,
                apellido_materno: body.apellido_materno || '',
                email: body.email,
                password_hash: body.password,
                rol_id: body.rol_id,
                avatar: avatar,
                fecha_registro: new Date()
            };

            const savedUser = await this.authService.register(user);

            res.status(201).json({
                message: 'Usuario creado exitosamente',
                user: {
                    id: savedUser.id,
                    nombres: savedUser.nombres,
                    apellido_paterno: savedUser.apellido_paterno,
                    apellido_materno: savedUser.apellido_materno,
                    email: savedUser.email,
                    rol_id: savedUser.rol_id,
                    avatar: savedUser.avatar,
                    fecha_registro: savedUser.fecha_registro
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}