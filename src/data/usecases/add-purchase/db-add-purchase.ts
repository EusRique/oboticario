import { AddPurchase, AddAPurchaseModel, AddPurchaseRepository } from './db-add-purchase-protocols'

export class DbAddPurchase implements AddPurchase {
  constructor (private readonly addPurchaseRepository: AddPurchaseRepository) {}

  async add (data: AddAPurchaseModel): Promise<void> {
    await this.addPurchaseRepository.add(data)
  }
}
