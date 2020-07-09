import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IConstructionsRepository from '@modules/constructions/repositories/IConstructionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteItenService {
  constructor(
    @inject('ConstructionsRepository')
    private constructionsRepository: IConstructionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.constructionsRepository.remove(id);
  }
}

export default DeleteItenService;
