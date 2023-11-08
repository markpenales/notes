import mongoose, { Model } from 'mongoose';

export const connect = async () => {
  const conn = await mongoose
    .connect(process.env.MONGODB_URI as string)
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // Notes Schema
  const NotesSchema = new mongoose.Schema({
    user_id: String,
    title: String,
    content: String,
  });

  // User Schema
  const UserSchema = new mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String,
    accessToken: String,
    refreshToken: String,
  });
  const Note = mongoose.models.Note || mongoose.model('Note', NotesSchema);
  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  return { conn, Note, User };
};
