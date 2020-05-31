export interface RemovePurchaseModel {
  id: string
  accountId: string
  code: string
  value: number
  cpf: string
  percentage: number
  cashbackAmount: number
  status: string
  date: Date
}

export interface RemovePurchase {
  remove (data: RemovePurchaseModel): Promise<void>
}
