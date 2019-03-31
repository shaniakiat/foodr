import validator from 'validator'
import isEmpty from './is-empty'

const validateFoodPost = data => {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.expDate = !isEmpty(data.expDate) ? data.expDate : ''
  data.fridge = !isEmpty(data.fridge) ? data.fridge : ''

  if (!validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = 'Name must be between 1 and 30 characters.'
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required.'
  }

  if (validator.isEmpty(data.expDate)) {
    errors.expDate = 'Expiration Date is required.'
  }

  if (validator.isEmpty(data.fridge)) {
    errors.fridge = 'Please state whether this food should be refrigerated.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateFoodPost
