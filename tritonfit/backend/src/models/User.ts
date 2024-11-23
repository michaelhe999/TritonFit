import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  // OAuth fields (required on creation)
  googleId: string;
  email: string;
  name: string;
  picture: string;
  createdAt: Date;

  // Profile fields (from createAccount.tsx)
  firstName?: string;
  lastName?: string;
  major?: string;
  year?: string;
  experience?: string;
  aboutMe?: string;

  // Workout preferences (from Step components)
  gender?: string;  // StepOne
  goal?: string;    // StepTwo
  targetAreas?: string[];  // StepThree
  level?: string;   // StepFour
  duration?: string;  // StepFive

  // Profile completion tracking
  isProfileComplete: boolean;
  lastLogin: Date;
}

const userSchema = new mongoose.Schema({
  // OAuth fields
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now
  },

  // Profile fields
  firstName: String,
  lastName: String,
  major: String,
  year: String,
  experience: String,
  aboutMe: String,

  // Workout preferences
  gender: {
    type: String,
    enum: ['Female', 'Male', 'Neither', 'Prefer not to say']
  },
  goal: {
    type: String,
    enum: ['Weight loss', 'Muscle gain', 'Maintenance', 'Improved general health']
  },
  targetAreas: [{
    type: String,
    enum: ['Full Body', 'Shoulders', 'Chest', 'Arms', 'Back', 'Legs', 'Abs']
  }],
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'No Preference']
  },
  duration: {
    type: String,
    enum: ['20-30 min', '30-50 min', '60 min +', 'No Preference']
  },

  // Profile completion tracking
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for faster queries
userSchema.index({ email: 1, googleId: 1 });

// Update lastLogin on every save
userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified()) {
    this.lastLogin = new Date();
  }
  next();
});

// Check if profile is complete
userSchema.methods.checkProfileComplete = function(): boolean {
  return !!(
    this.firstName &&
    this.lastName &&
    this.major &&
    this.year &&
    this.experience &&
    this.aboutMe &&
    this.gender &&
    this.goal &&
    this.targetAreas?.length &&
    this.level &&
    this.duration
  );
};

export default mongoose.model<IUser>('User', userSchema);