import { Request, Response } from 'express';
import { AuthServiceUseCase } from '../../application/AuthService_UseCase';

export class AuthController {
    constructor(private authService: AuthServiceUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Email y password son requeridos' });
                return;
            }

            const response = await this.authService.login(email, password);

            res.status(200).json({
                message: 'Login exitoso',
                data: response
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(401).json({ error: errorMessage });
        }
    }
}