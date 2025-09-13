import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface AuthorDocument extends Document {
  name: string;
  born?: number;
}

const schema = new mongoose.Schema<AuthorDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4
  },
  born: {
    type: Number
  }
});

schema.plugin(uniqueValidator);

export default mongoose.model<AuthorDocument>('Author', schema);
