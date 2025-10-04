import { Pool, PoolConfig, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class ConnPostgreSQL {
    private pool: Pool;

    constructor() {
        const dbHost = process.env.DB_HOST;
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;
        const dbPort = process.env.DB_PORT || '5432';
        const dbSsl = process.env.DB_SSL === 'true';

        if (!dbHost || !dbUser || !dbPassword || !dbName) {
            throw new Error('Error: Faltan variables de entorno. Verifica tu .env');
        }

        const config: PoolConfig = {
            host: dbHost,
            port: parseInt(dbPort),
            user: dbUser,
            password: dbPassword,
            database: dbName,
            ssl: dbSsl ? {
                rejectUnauthorized: false
            } : false,
            max: 10,
            idleTimeoutMillis: 15 * 60 * 1000,
            connectionTimeoutMillis: 2000,
        };

        this.pool = new Pool(config);

        this.pool.on('error', (err) => {
            console.error('Error inesperado en el pool de PostgreSQL:', err);
        });

        this.testConnection();
    }

    private async testConnection(): Promise<void> {
        try {
            await this.pool.query('SELECT NOW()');
            console.log('Conexión a PostgreSQL exitosa.');
        } catch (error) {
            console.error('Error al verificar la conexión a la base de datos:', error);
            throw error;
        }
    }

    async query(text: string, params?: any[]): Promise<QueryResult> {
        try {
            return await this.pool.query(text, params);
        } catch (error) {
            console.error('Error en query:', error);
            throw error;
        }
    }

    async getConnection() {
        return await this.pool.connect();
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}

export const getDBPool = (): ConnPostgreSQL => {
    return new ConnPostgreSQL();
};