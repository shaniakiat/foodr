import mongoose from 'mongoose'

const Schema = mongoose.Schema

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  expDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  fridge: {
    type: Boolean,
    required: true
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

const Food = mongoose.model('food', FoodSchema)

export default Food
