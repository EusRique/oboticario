export interface AddAPurchaseModel {
  code: string
  value: string
  cpf: string
  percentage?: string
  cashbackAmount?: string
  status?: string
  date?: string
}

export interface AddPurchase {
  add (data: AddAPurchaseModel): Promise<void>
}
