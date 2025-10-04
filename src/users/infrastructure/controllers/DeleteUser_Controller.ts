import { Request, Response } from 'express';
import { DeleteUserUseCase } from '../../application/DeleteUser_UseCase';

export class DeleteUserController {
    constructor(private deleteUser: DeleteUserUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

            await this.deleteUser.execute(id);

            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(400).json({ error: errorMessage });
        }
    }
}