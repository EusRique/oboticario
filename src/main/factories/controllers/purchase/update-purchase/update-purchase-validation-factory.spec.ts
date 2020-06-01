import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { makeUpdatePurchaseController } from './update-purchase-controller-factory'
import { Validation } from '../../../../../presentation/protocols/validation'

jest.mock('../../../../../validation/validators/validation-composite')

describe('UpdatePurchaseValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdatePurchaseController()
    const validations: Validation[] = []
    for (const field of ['code', 'value', 'cpf']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
