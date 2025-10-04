import { IGorraRepository } from '../domain/Gorra_Repository';
import { Gorra } from '../domain/entities/Gorra';

export class GetGorraByIdUseCase {
    constructor(private db: IGorraRepository) {}

    async execute(id: number): Promise<Gorra | null> {
        if (id <= 0) {
            throw new Error('ID inválido');
        }
        return await this.db.getById(id);
    }
}