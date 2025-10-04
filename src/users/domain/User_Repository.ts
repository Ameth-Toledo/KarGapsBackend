import { User } from './entities/User';

export interface IUserRepository {
    save(user: User): Promise<User>;
    getByCorreo(email: string): Promise<User | null>;
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | null>;
    update(user: User): Promise<void>;
    delete(id: number): Promise<void>;
}