import crypto from 'crypto';

export class SecurityUtils {
    static generateRandomString(length: number): string {
        const bytes = crypto.randomBytes(Math.ceil(length / 2));
        return bytes.toString('hex').slice(0, length);
    }
}