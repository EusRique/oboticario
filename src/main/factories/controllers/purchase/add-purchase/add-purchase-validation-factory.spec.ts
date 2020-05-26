import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { makeAddPurchaseValidation } from './add-purchase-validation-factory'
import { Validation } from '../../../../../presentation/protocols/validation'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddPurchaseValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddPurchaseValidation()
    const validations: Validation[] = []
    for (const field of ['code', 'value', 'cpf']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
