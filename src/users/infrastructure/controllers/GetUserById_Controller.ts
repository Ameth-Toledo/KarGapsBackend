import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../../application/GetUserById_UseCase';

export class GetUserByIdController {
    constructor(private getUserById: GetUserByIdUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            const user = await this.getUserById.execute(id);

            if (!user) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }

            const response = {
                id: user.id,
                nombres: user.nombres,
                apellido_paterno: user.apellido_paterno,
                apellido_materno: user.apellido_materno,
                email: user.email,
                rol_id: user.rol_id,
                avatar: user.avatar,
                fecha_registro: user.fecha_registro
            };

            res.status(200).json({ user: response });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ error: errorMessage });
        }
    }
}