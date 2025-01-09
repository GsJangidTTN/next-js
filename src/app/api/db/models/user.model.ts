import mongoose, { Schema, Document, Model } from 'mongoose';

export enum UserType{
    Admin = 'admin',
    Customer = 'customer'
}
// Define the interface for the User
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User Schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: UserType,
      default: UserType.Customer,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  }
);

// Create the User Model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
