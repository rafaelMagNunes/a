import { injectable, inject } from 'tsyringe';

import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

interface IRequest {
  supplier_id: string;
}

@injectable()
class CreateItenService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({ supplier_id }: IRequest): Promise<void> {
    await this.supplierRepository.remove(supplier_id);
  }
}

export default CreateItenService;
