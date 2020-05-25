import { PurchaseModel } from '../models/purshase'

export interface AddPurchaseModel {
  code: string
  value: string
  cpf: string
  date: string
}

export interface AddPurchase {
  add (purchase: AddPurchaseModel): Promise<PurchaseModel>
}
