import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      streetNumber: { type: Number, required: true },
      aptNumber: { type: Number, required: true },
      zip: { type: Number, required: true },
      deliveryName: {type: String, required: true },
      minDays: { type: Number, required: true },
      maxDays: { type: Number, required: true },
      deliveryPrice: { type: Number, required: true },

    },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
    userEmail: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;