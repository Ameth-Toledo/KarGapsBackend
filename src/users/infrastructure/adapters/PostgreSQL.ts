import { IUserRepository } from '../../domain/User_Repository';
import { User } from '../../domain/entities/User';
import { ConnPostgreSQL } from '../../../core/db_postgresql';

export class PostgreSQLUserRepository implements IUserRepository {
    constructor(private conn: ConnPostgreSQL) {}

    async save(user: User): Promise<User> {
        const query = `
            INSERT INTO usuarios (nombres, apellido_paterno, apellido_materno, email, password_hash, rol_id, avatar, fecha_registro) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING id
        `;

        try {
            const result = await this.conn.query(query, [
                user.nombres,
                user.apellido_paterno,
                user.apellido_materno,
                user.email,
                user.password_hash,
                user.rol_id,
                user.avatar,
                user.fecha_registro || new Date()
            ]);

            user.id = result.rows[0].id;
            return user;
        } catch (error) {
            throw new Error(`Failed to save user: ${error}`);
        }
    }

    async getByCorreo(email: string): Promise<User | null> {
        const query = `
            SELECT id, nombres, apellido_paterno, apellido_materno, email, password_hash, rol_id, avatar, fecha_registro 
            FROM usuarios 
            WHERE email = $1
        `;

        try {
            const result = await this.conn.query(query, [email]);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0] as User;
        } catch (error) {
            throw new Error(`Failed to get user by email: ${error}`);
        }
    }

    async getAll(): Promise<User[]> {
        const query = `
            SELECT id, nombres, apellido_paterno, apellido_materno, email, password_hash, rol_id, avatar, fecha_registro 
            FROM usuarios 
            ORDER BY fecha_registro DESC
        `;

        try {
            const result = await this.conn.query(query);
            return result.rows as User[];
        } catch (error) {
            throw new Error(`Failed to get all users: ${error}`);
        }
    }

    async getById(id: number): Promise<User | null> {
        const query = `
            SELECT id, nombres, apellido_paterno, apellido_materno, email, password_hash, rol_id, avatar, fecha_registro 
            FROM usuarios 
            WHERE id = $1
        `;

        try {
            const result = await this.conn.query(query, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0] as User;
        } catch (error) {
            throw new Error(`Failed to get user by id: ${error}`);
        }
    }

    async update(user: User): Promise<void> {
        const query = `
            UPDATE usuarios 
            SET nombres = $2, 
                apellido_paterno = $3, 
                apellido_materno = $4, 
                email = $5, 
                rol_id = $6, 
                avatar = $7 
            WHERE id = $1
        `;

        try {
            const result = await this.conn.query(query, [
                user.id,
                user.nombres,
                user.apellido_paterno,
                user.apellido_materno,
                user.email,
                user.rol_id,
                user.avatar
            ]);

            if (result.rowCount === 0) {
                throw new Error('User not found');
            }
        } catch (error) {
            throw new Error(`Failed to update user: ${error}`);
        }
    }

    async delete(id: number): Promise<void> {
        const query = `DELETE FROM usuarios WHERE id = $1`;

        try {
            const result = await this.conn.query(query, [id]);

            if (result.rowCount === 0) {
                throw new Error('User not found');
            }
        } catch (error) {
            throw new Error(`Failed to delete user: ${error}`);
        }
    }
}