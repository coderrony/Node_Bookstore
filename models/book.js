import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number },
    description: { type: String, required: true },
    image: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  { timestamps: true },
);

export const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
