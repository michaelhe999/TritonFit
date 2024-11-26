// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
  isProfileComplete: boolean;
  emailVerified: boolean;
  createdAt: Date;
  lastLogin: Date;
}

// Create a Model type that includes both IUser and Document
export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUserModel>({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
  isProfileComplete: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

// Update lastLogin on each authentication
UserSchema.pre('save', function(next) {
  if (this.isModified('lastLogin')) {
    this.lastLogin = new Date();
  }
  next();
});

const User = mongoose.model<IUserModel>('User', UserSchema);

export default User;