import mongoose from 'mongoose';
import { User } from './user.js';

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

// When a book is deleted, remove its ID from all users' addToCart arrays
bookSchema.pre("findOneAndDelete", async function(next) {
  const bookId = this.getQuery()._id;
  if (bookId) {

   
    await User.updateMany(
      { addToCart: bookId },
      { $pull: { addToCart: bookId } }
    );
  }
  next();
});

export const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
