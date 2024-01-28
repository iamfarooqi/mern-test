import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: {
    data: Buffer,        // Binary image data
    contentType: String  // Image content type (e.g., "image/jpeg")
  },
});

export const CUSTOMER = mongoose.model("Customer", CustomerSchema);
