import { Gorra } from './entities/Gorra';

export interface IGorraRepository {
    save(gorra: Gorra): Promise<Gorra>;
    getAll(): Promise<Gorra[]>;
    getById(id: number): Promise<Gorra | null>;
    update(gorra: Gorra): Promise<void>;
    delete(id: number): Promise<void>;
    search(query: string): Promise<Gorra[]>;
}