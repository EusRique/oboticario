import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddPurchaseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['code', 'value', 'cpf']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
