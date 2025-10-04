import { IGorraRepository } from '../domain/Gorra_Repository';
import { Gorra } from '../domain/entities/Gorra';

export class SearchGorrasUseCase {
    constructor(private db: IGorraRepository) {}

    async execute(query: string): Promise<Gorra[]> {
        if (!query || query.trim() === '') {
            throw new Error('Query de búsqueda requerido');
        }
        return await this.db.search(query);
    }
}