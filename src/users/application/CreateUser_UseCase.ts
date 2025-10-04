import { IUserRepository } from "../domain/User_Repository";
import { User } from "../domain/entities/User";

export class CreateUserUseCase {
    constructor(private db: IUserRepository) {}

    async execute(user: User): Promise<User> {
        if (!user.nombres || user.nombres.trim() === '') {
            throw new Error('El nombre es obligatorio');
        }
        if (!user.email || user.email.trim() === '') {
            throw new Error('El email es obligatorio');
        }
        if (!user.password_hash || user.password_hash.trim() === '') {
            throw new Error('La contraseña es obligatoria');
        }

        const existingUser = await this.db.getByCorreo(user.email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        user.fecha_registro = new Date();

        return await this.db.save(user);
    }
}
