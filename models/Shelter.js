import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ShelterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  driverPhoneNumbers: {
    type: String
  },
  capacity: {
    type: Number
  }
})

module.exports = Shelter = mongoose.model('shelter', ShelterSchema)
