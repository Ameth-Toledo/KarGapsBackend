import { IGorraRepository } from '../../domain/Gorra_Repository';
import { Gorra } from '../../domain/entities/Gorra';
import { ConnPostgreSQL } from '../../../core/db_postgresql';

export class PostgreSQLGorraRepository implements IGorraRepository {
    constructor(private conn: ConnPostgreSQL) {}

    async save(gorra: Gorra): Promise<Gorra> {
        const query = `
            INSERT INTO gorras (nombre, descripcion, precio, stock, color, imagen_url, fecha_creacion, fecha_actualizacion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING id, fecha_creacion, fecha_actualizacion
        `;

        try {
            const result = await this.conn.query(query, [
                gorra.nombre,
                gorra.descripcion,
                gorra.precio,
                gorra.stock,
                gorra.color,
                gorra.imagen_url,
                new Date(),
                new Date()
            ]);

            gorra.id = result.rows[0].id;
            gorra.fecha_creacion = result.rows[0].fecha_creacion;
            gorra.fecha_actualizacion = result.rows[0].fecha_actualizacion;

            return gorra;
        } catch (error) {
            throw new Error(`Failed to save gorra: ${error}`);
        }
    }

    async getAll(): Promise<Gorra[]> {
        const query = `
            SELECT id, nombre, descripcion, precio, stock, color, imagen_url, fecha_creacion, fecha_actualizacion 
            FROM gorras 
            ORDER BY fecha_creacion DESC
        `;

        try {
            const result = await this.conn.query(query);
            return result.rows as Gorra[];
        } catch (error) {
            throw new Error(`Failed to get all gorras: ${error}`);
        }
    }

    async getById(id: number): Promise<Gorra | null> {
        const query = `
            SELECT id, nombre, descripcion, precio, stock, color, imagen_url, fecha_creacion, fecha_actualizacion 
            FROM gorras 
            WHERE id = $1
        `;

        try {
            const result = await this.conn.query(query, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0] as Gorra;
        } catch (error) {
            throw new Error(`Failed to get gorra by id: ${error}`);
        }
    }

    async update(gorra: Gorra): Promise<void> {
        const query = `
            UPDATE gorras 
            SET nombre = $2, 
                descripcion = $3, 
                precio = $4, 
                stock = $5, 
                color = $6, 
                imagen_url = $7,
                fecha_actualizacion = $8
            WHERE id = $1
        `;

        try {
            const result = await this.conn.query(query, [
                gorra.id,
                gorra.nombre,
                gorra.descripcion,
                gorra.precio,
                gorra.stock,
                gorra.color,
                gorra.imagen_url,
                new Date()
            ]);

            if (result.rowCount === 0) {
                throw new Error('Gorra not found');
            }
        } catch (error) {
            throw new Error(`Failed to update gorra: ${error}`);
        }
    }

    async delete(id: number): Promise<void> {
        const query = `DELETE FROM gorras WHERE id = $1`;

        try {
            const result = await this.conn.query(query, [id]);

            if (result.rowCount === 0) {
                throw new Error('Gorra not found');
            }
        } catch (error) {
            throw new Error(`Failed to delete gorra: ${error}`);
        }
    }

    async search(query: string): Promise<Gorra[]> {
        const searchQuery = `
            SELECT id, nombre, descripcion, precio, stock, color, imagen_url, fecha_creacion, fecha_actualizacion 
            FROM gorras 
            WHERE nombre ILIKE $1 OR descripcion ILIKE $1 OR color ILIKE $1
            ORDER BY fecha_creacion DESC
        `;

        try {
            const result = await this.conn.query(searchQuery, [`%${query}%`]);
            return result.rows as Gorra[];
        } catch (error) {
            throw new Error(`Failed to search gorras: ${error}`);
        }
    }
}