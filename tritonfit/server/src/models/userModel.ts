import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    // id: number;
    firstName: string;
    lastName: string;
    email: string;
    major: string;
    year: string;
    experience: string;
    aboutMe: string;
}

const UserSchema: Schema = new Schema<IUser>({
    // id: { type: Number, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    major: { type: String, required: true},
    year: { type: String, required: true},
    experience: { type: String, required: true},
    aboutMe: { type: String, required: true},
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;