import { IUserRepository } from '../domain/User_Repository';
import { User } from '../domain/entities/User';

export class GetUserByIdUseCase {
    constructor(private db: IUserRepository) {}

    async execute(id: number): Promise<User | null> {
        if (id <= 0) {
            throw new Error('ID inválido');
        }
        return await this.db.getById(id);
    }
}