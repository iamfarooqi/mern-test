import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: {
    data: Buffer,
    contentType: String  
  },
});

export const CUSTOMER = mongoose.model("Customer", CustomerSchema);
