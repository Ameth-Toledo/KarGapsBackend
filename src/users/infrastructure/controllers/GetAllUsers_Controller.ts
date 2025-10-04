import { Request, Response } from 'express';
import { GetAllUsersUseCase } from '../../application/GetAllUsers_UseCase';

export class GetAllUsersController {
    constructor(private getAllUsers: GetAllUsersUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getAllUsers.execute();

            const response = users.map(user => ({
                id: user.id,
                nombres: user.nombres,
                apellido_paterno: user.apellido_paterno,
                apellido_materno: user.apellido_materno,
                email: user.email,
                rol_id: user.rol_id,
                avatar: user.avatar,
                fecha_registro: user.fecha_registro
            }));

            res.status(200).json({
                users: response,
                total: users.length
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ error: errorMessage });
        }
    }
}