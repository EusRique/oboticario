import { UpdatePurchaseRepository } from '../../protocols/db/purchase/update-purchase-repository'
import { UpdatePurchase, UpdatePurchaseModel } from '../../../domain/usecases/update-purchases'

export class DbUpdatePurchases implements UpdatePurchase {
  constructor (private readonly updatePurchasesRepository: UpdatePurchaseRepository) {}

  async update (purchaseData: UpdatePurchaseModel): Promise<void> {
    purchaseData.status = purchaseData.cpf === '153.509.460-56' ? 'Aprovado' : 'Em Validação'
    purchaseData.percentage = purchaseData.value < 1000 ? 10 : purchaseData.value < 1500 ? 15 : 20
    purchaseData.cashbackAmount = (purchaseData.value * purchaseData.percentage) / 100
    await this.updatePurchasesRepository.update(purchaseData)
  }
}
