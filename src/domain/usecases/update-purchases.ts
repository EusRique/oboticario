export interface UpdatePurchaseModel {
  purchaseId: string
  accountId: string
  code: string
  value: number
  cpf: string
  percentage: number
  cashbackAmount: number
  status: string
  date: Date
}

export interface UpdatePurchase {
  update (data: UpdatePurchaseModel): Promise<void>
}
