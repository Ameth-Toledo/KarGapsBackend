import bcrypt from 'bcrypt';

export class HashService {
    private static readonly SALT_ROUNDS = 10;

    static async hashPassword(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, this.SALT_ROUNDS);
        return hashed;
    }

    static async checkPassword(hashPassword: string, password: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}