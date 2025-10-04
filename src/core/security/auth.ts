import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_SECRET || 'AmethToledo';

export interface Claims {
    user_id: number;
    email: string;
}

export interface JWTPayload extends Claims {
    exp: number;
}

export class AuthService {
    static generateJWT(userID: number, email: string): string {
        const expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 24 horas
        
        const payload: JWTPayload = {
            user_id: userID,
            email: email,
            exp: expirationTime
        };

        return jwt.sign(payload, JWT_KEY, { algorithm: 'HS256' });
    }

    static validateJWT(tokenString: string): Claims | null {
        try {
            const decoded = jwt.verify(tokenString, JWT_KEY) as JWTPayload;
            return {
                user_id: decoded.user_id,
                email: decoded.email
            };
        } catch (error) {
            return null;
        }
    }
}