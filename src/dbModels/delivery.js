import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
    {
        deliveryName: { type: String, required: true, unique: true },
        minDays: { type: Number, required: true },
        maxDays: { type: Number, required: true },
        deliveryPrice: { type: Number, required: true },
    },
);

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;