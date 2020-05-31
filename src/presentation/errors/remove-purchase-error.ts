export class RemovePurchaseError extends Error {
  constructor () {
    super('Oops! You can only delete unapproved orders')
    this.name = 'Oops! You can only delete unapproved orders'
  }
}
