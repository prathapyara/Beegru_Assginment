import mongoose from 'mongoose';
import { User } from './userModel.js';

const propertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  name: String,
  price: Number,
  transactionType: { type: String, enum: ['Sale', 'Rent'] },
  propertyType: { type: String, enum: ['Apartment', 'Land'] },
});

const Property = mongoose.model('Property', propertySchema);
export default Property;
