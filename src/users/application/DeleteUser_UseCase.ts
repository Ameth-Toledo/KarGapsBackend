import { IUserRepository } from '../domain/User_Repository';

export class DeleteUserUseCase {
    constructor(private db: IUserRepository) {}

    async execute(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error('ID inválido');
        }

        const existingUser = await this.db.getById(id);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }

        await this.db.delete(id);
    }
}