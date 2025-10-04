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
            idleTimeoutMillis: 30000, 
            connectionTimeoutMillis: 10000,
            allowExitOnIdle: false,
        };

        this.pool = new Pool(config);

        this.pool.on('error', (err) => {
            console.error('Error inesperado en el pool de PostgreSQL:', err);
        });

        this.pool.on('connect', () => {
            console.log('Nueva conexión establecida al pool');
        });

        this.testConnection();
    }

    private async testConnection(): Promise<void> {
        try {
            const client = await this.pool.connect();
            await client.query('SELECT NOW()');
            client.release(); 
            console.log('Conexión a PostgreSQL exitosa.');
        } catch (error) {
            console.error('Error al verificar la conexión a la base de datos:', error);
        }
    }

    async query(text: string, params?: any[]): Promise<QueryResult> {
        const maxRetries = 3;
        let lastError;

        for (let i = 0; i < maxRetries; i++) {
            try {
                return await this.pool.query(text, params);
            } catch (error: any) {
                lastError = error;
                console.error(`Error en query (intento ${i + 1}/${maxRetries}):`, error.message);
                
                if (error.code === 'ECONNRESET' || error.code === 'PROTOCOL_CONNECTION_LOST' || error.code === '57P01') {
                    if (i < maxRetries - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                        continue;
                    }
                }
                throw error;
            }
        }
        
        throw lastError;
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