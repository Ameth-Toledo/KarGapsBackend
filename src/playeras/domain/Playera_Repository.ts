import { Playera } from "./entities/Playera";

export interface IPlayeraRepository {
    save(playera: Playera): Promise<Playera>;
    getAll(): Promise<Playera[]>;
    getById(id: number): Promise<Playera | null>;
    update(playera: Playera): Promise<void>;
    delete(id: number): Promise<void>;
    search(query: string): Promise<Playera[]>;
}