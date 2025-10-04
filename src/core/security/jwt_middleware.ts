import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth';

export interface AuthRequest extends Request {
    user_id?: number;
    userID?: number;
    email?: string;
}

export const jwtMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'Token requerido' });
        return;
    }

    if (!authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Formato de token invalido' });
        return;
    }

    const tokenString = authHeader.substring(7); 

    if (!tokenString) {
        res.status(401).json({ error: 'Token vacío' });
        return;
    }

    const claims = AuthService.validateJWT(tokenString);

    if (!claims) {
        res.status(401).json({ error: 'Token inválido' });
        return;
    }

    req.user_id = claims.user_id;
    req.userID = claims.user_id;
    req.email = claims.email;

    next();
};