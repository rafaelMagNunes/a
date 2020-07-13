import { injectable, inject } from 'tsyringe';
import { cnpj as CNPJ, cpf as CPF } from 'cpf-cnpj-validator';

import AppError from '@shared/errors/AppError';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

interface IRequest {
  phone?: string;
  name: string;
  email?: string;
  cep?: string;
  state?: string;
  city?: string;
  cnpj?: string;
  address?: string;
  user_id: string;
}

@injectable()
class CreateItenService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute(data: IRequest): Promise<Supplier> {
    let validateDocument = '';

    if (data.cnpj) {
      if (CNPJ.isValid(data.cnpj, false)) {
        validateDocument = CNPJ.format(data.cnpj);
        const supplierExists = await this.supplierRepository.findByCNPJ(
          validateDocument,
          data.user_id,
        );

        if (supplierExists) {
          throw new AppError('Supplier already exists');
        }
      } else if (CPF.isValid(data.cnpj, false)) {
        validateDocument = CPF.format(data.cnpj);
        const supplierExists = await this.supplierRepository.findByCPF(
          validateDocument,
          data.user_id,
        );

        if (supplierExists) {
          throw new AppError('Supplier already exists');
        }
      }
    }

    const newSupplier = this.supplierRepository.create(data);

    return newSupplier;
  }
}

export default CreateItenService;
