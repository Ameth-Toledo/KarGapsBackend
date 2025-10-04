import { IPlayeraRepository } from '../domain/Playera_Repository';
import { Playera } from '../domain/entities/Playera';

export class GetAllPlayerasUseCase {
    constructor(private db: IPlayeraRepository) {}

    async execute(): Promise<Playera[]> {
        return await this.db.getAll();
    }
}