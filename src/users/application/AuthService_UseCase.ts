import { IUserRepository } from '../domain/User_Repository';
import { User } from '../domain/entities/User';
import { HashService } from '../../core/security/hash';
import { AuthService } from '../../core/security/auth';

export interface LoginResponse {
    token: string;
    userId: number;
    name: string;
    email: string;
}

export class AuthServiceUseCase {
    constructor(private userRepo: IUserRepository) {}

    async login(email: string, password: string): Promise<LoginResponse> {
        const trimmedEmail = email.trim();
        console.log('Buscando usuario con correo:', trimmedEmail);

        const user = await this.userRepo.getByCorreo(trimmedEmail);

        if (!user) {
            console.log('Usuario no encontrado (null)');
            throw new Error('Usuario no encontrado');
        }

        const isValidPassword = await HashService.checkPassword(user.password_hash, password);

        if (!isValidPassword) {
            console.log('Contraseña incorrecta');
            throw new Error('Contraseña incorrecta');
        }

        const token = AuthService.generateJWT(user.id!, user.email);

        return {
            token,
            userId: user.id!,
            name: user.nombres,
            email: user.email
        };
    }

    async register(user: User): Promise<User> {
        const hashedPassword = await HashService.hashPassword(user.password_hash);
        user.password_hash = hashedPassword;
        user.fecha_registro = new Date();

        const savedUser = await this.userRepo.save(user);
        return savedUser;
    }
}