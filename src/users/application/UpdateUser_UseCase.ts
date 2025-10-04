import { IUserRepository } from '../domain/User_Repository';
import { User } from '../domain/entities/User';

export class UpdateUserUseCase {
    constructor(private db: IUserRepository) {}

    async execute(user: User): Promise<void> {
        if (!user.id || user.id <= 0) {
            throw new Error('ID inválido');
        }

        const existingUser = await this.db.getById(user.id);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }

        await this.db.update(user);
    }
}