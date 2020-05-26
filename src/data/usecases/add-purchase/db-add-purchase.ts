import { AddPurchase, AddAPurchaseModel, AddPurchaseRepository } from './db-add-purchase-protocols'

export class DbAddPurchase implements AddPurchase {
  constructor (private readonly addPurchaseRepository: AddPurchaseRepository) {}

  async add (data: AddAPurchaseModel): Promise<void> {
    data.status = data.cpf === '153.509.460-56' ? 'Aprovado' : 'Em Validação'
    data.percentage = data.value < 1000 ? 10 : data.value < 1500 ? 15 : 20
    data.cashbackAmount = (data.value * data.percentage) / 100
    await this.addPurchaseRepository.add(data)
  }
}
