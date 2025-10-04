import { IGorraRepository } from '../domain/Gorra_Repository';
import { Gorra } from '../domain/entities/Gorra';

export class GetAllGorrasUseCase {
    constructor(private db: IGorraRepository) {}

    async execute(): Promise<Gorra[]> {
        return await this.db.getAll();
    }
}