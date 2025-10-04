import { IPlayeraRepository } from '../domain/Playera_Repository';
import { Playera } from '../domain/entities/Playera';

export class GetPlayeraByIdUseCase {
    constructor(private db: IPlayeraRepository) {}

    async execute(id: number): Promise<Playera | null> {
        if (id <= 0) {
            throw new Error('ID inválido');
        }
        return await this.db.getById(id);
    }
}