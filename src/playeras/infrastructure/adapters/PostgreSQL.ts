import { IPlayeraRepository } from '../../domain/Playera_Repository';
import { Playera } from '../../domain/entities/Playera';
import { ConnPostgreSQL } from '../../../core/db_postgresql';

export class PostgreSQLPlayeraRepository implements IPlayeraRepository {
    constructor(private conn: ConnPostgreSQL) {}

    async save(playera: Playera): Promise<Playera> {
        const query = `
            INSERT INTO playeras (nombre, descripcion, precio, stock, color, talla, tipo, material, imagen_url, fecha_creacion, fecha_actualizacion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING id, fecha_creacion, fecha_actualizacion
        `;

        try {
            const result = await this.conn.query(query, [
                playera.nombre,
                playera.descripcion,
                playera.precio,
                playera.stock,
                playera.color,
                playera.talla,
                playera.tipo,
                playera.material,
                playera.imagen_url,
                new Date(),
                new Date()
            ]);

            playera.id = result.rows[0].id;
            playera.fecha_creacion = result.rows[0].fecha_creacion;
            playera.fecha_actualizacion = result.rows[0].fecha_actualizacion;

            return playera;
        } catch (error) {
            throw new Error(`Failed to save playera: ${error}`);
        }
    }

    async getAll(): Promise<Playera[]> {
        const query = `
            SELECT id, nombre, descripcion, precio, stock, color, talla, tipo, material, imagen_url, fecha_creacion, fecha_actualizacion 
            FROM playeras 
            ORDER BY fecha_creacion DESC
        `;

        try {
            const result = await this.conn.query(query);
            return result.rows as Playera[];
        } catch (error) {
            throw new Error(`Failed to get all playeras: ${error}`);
        }
    }

    async getById(id: number): Promise<Playera | null> {
        const query = `
            SELECT id, nombre, descripcion, precio, stock, color, talla, tipo, material, imagen_url, fecha_creacion, fecha_actualizacion 
            FROM playeras 
            WHERE id = $1
        `;

        try {
            const result = await this.conn.query(query, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0] as Playera;
        } catch (error) {
            throw new Error(`Failed to get playera by id: ${error}`);
        }
    }

    async update(playera: Playera): Promise<void> {
        const query = `
            UPDATE playeras 
            SET nombre = $2, 
                descripcion = $3, 
                precio = $4, 
                stock = $5, 
                color = $6,
                talla = $7,
                tipo = $8,
                material = $9,
                imagen_url = $10,
                fecha_actualizacion = $11
            WHERE id = $1
        `;

        try {
            const result = await this.conn.query(query, [
                playera.id,
                playera.nombre,
                playera.descripcion,
                playera.precio,
                playera.stock,
                playera.color,
                playera.talla,
                playera.tipo,
                playera.material,
                playera.imagen_url,
                new Date()
            ]);

            if (result.rowCount === 0) {
                throw new Error('Playera not found');
            }
        } catch (error) {
            throw new Error(`Failed to update playera: ${error}`);
        }
    }

    async delete(id: number): Promise<void> {
        const query = `DELETE FROM playeras WHERE id = $1`;

        try {
            const result = await this.conn.query(query, [id]);

            if (result.rowCount === 0) {
                throw new Error('Playera not found');
            }
        } catch (error) {
            throw new Error(`Failed to delete playera: ${error}`);
        }
    }

    async search(query: string): Promise<Playera[]> {
        const searchQuery = `
            SELECT id, nombre, descripcion, precio, stock, color, talla, tipo, material, imagen_url, fecha_creacion, fecha_actualizacion 
            FROM playeras 
            WHERE nombre ILIKE $1 OR descripcion ILIKE $1 OR color ILIKE $1 OR talla ILIKE $1 OR tipo ILIKE $1 OR material ILIKE $1
            ORDER BY fecha_creacion DESC
        `;

        try {
            const result = await this.conn.query(searchQuery, [`%${query}%`]);
            return result.rows as Playera[];
        } catch (error) {
            throw new Error(`Failed to search playeras: ${error}`);
        }
    }
}