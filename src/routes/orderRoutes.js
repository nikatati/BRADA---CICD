import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import Order from '../dbModels/order.js';
//import Product from '../dbModels/product.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      totalPrice: req.body.totalPrice,
      userEmail: req.body.userEmail,
      user: req.user._id,
    });

    const order = await newOrder.save();

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'theperfectgroup8@gmail.com',
        pass: 'project2022'
      }
    });
    transporter.sendMail({
      from: 'theperfectgroup8@gmail.com',
      to: `${req.body.userEmail}`,
      subject: 'Order Complete',
      html: `<h3>Order ${order._id}</h3>
      <p>Thank you for choosing to place an order through us.<br>
      We will make every effort so that the shipment arrives as soon as possible</p>`, // html body
    });
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/userorders',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.send(orders);
  })
);
orderRouter.delete(
  '/deleteorder/:orderId',
  expressAsyncHandler(async (req, res) => {
    var date = new Date();
    date.setDate(date.getDate() - 3);
    const order = await Order.findById(req.params.orderId);
    if (date.getTime() > order.createdAt.getTime()) {
      res.status(404).send({ message: 'More than 3 days have passed since the order was placed. Unfortunately the order cannot be canceled. Please contact us' });
    }
    if (order) {
      await order.remove();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
export default orderRouter;