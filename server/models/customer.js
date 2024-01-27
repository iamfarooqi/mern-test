import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: { type: String, required: true },
});

export default mongoose.model('Customer', customerSchema);
