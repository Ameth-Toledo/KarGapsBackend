import { IPlayeraRepository } from '../domain/Playera_Repository';
import { Playera } from '../domain/entities/Playera';

export class SearchPlayerasUseCase {
    constructor(private db: IPlayeraRepository) {}

    async execute(query: string): Promise<Playera[]> {
        if (!query || query.trim() === '') {
            throw new Error('Query de búsqueda requerido');
        }
        return await this.db.search(query);
    }
}