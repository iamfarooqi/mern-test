import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  // profilePicture: { type: String, required: true },
});

export const CUSTOMER = mongoose.model("Customer", CustomerSchema);
