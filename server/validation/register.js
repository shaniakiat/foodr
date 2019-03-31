import validator from 'validator'
import isEmpty from './is-empty'

const validateRegister = data => {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''
  data.address = !isEmpty(data.address) ? data.address : ''
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''
  data.isShelter = !isEmpty(data.isShelter) ? data.isShelter : ''

  if (!validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = 'Name must be between 1 and 30 characters.'
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required.'
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.'
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required.'
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters.'
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required.'
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords didn't match."
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Please confirm Password.'
  }

  if (!validator.isLength(data.address, { min: 1, max: undefined })) {
    errors.address = 'Address too short.'
  }

  if (validator.isEmpty(data.address)) {
    errors.address = 'Address is required.'
  }

  if (!validator.isLength(data.zipcode, { min: 5, max: 5 })) {
    errors.zipcode = 'ZIP code not valid.'
  }

  if (validator.isEmpty(data.zipcode)) {
    errors.zipcode = 'ZIP code is required.'
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = 'Phone number is required.'
  }

  if (validator.isEmpty(data.isShelter)) {
    errors.isShelter = 'Please state whether this is a Business or Shelter.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateRegister
