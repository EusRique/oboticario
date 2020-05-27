export interface AddAPurchaseModel {
  code: string
  value: number
  cpf: string
  percentage: number
  cashbackAmount: number
  status: string
  date: Date
}

export interface AddPurchase {
  add (data: AddAPurchaseModel): Promise<void>
}
