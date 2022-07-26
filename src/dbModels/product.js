import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // = modle
    slug: { type: String, required: true, unique: true }, // = id
    image: { type: String, required: true },
    brand: { type: String, required: true }, // colction 
    category: { type: String, required: true }, // backpack 
    color: { type: String, required: true },
    size: { type: String, required: true }, // S,M,L
    type: { type: String, required: true }, // man , woman , suitcase
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
