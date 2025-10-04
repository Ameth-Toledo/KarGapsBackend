import { IUserRepository } from '../domain/User_Repository';
import { User } from '../domain/entities/User';

export class GetAllUsersUseCase {
    constructor(private db: IUserRepository) {}

    async execute(): Promise<User[]> {
        return await this.db.getAll();
    }
}