import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Delivery from '../dbModels/delivery.js';
import Product from '../dbModels/product.js';
import Order from '../dbModels/order.js';
const managerRouter = express.Router();

managerRouter.get('/deliveries', async (req, res) => {
  const Deliveries = await Delivery.find();
  console.log(Deliveries);
  res.send(Deliveries);
});
managerRouter.get(
  '/orders',
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.send(orders);
  })
);

managerRouter.get('/orders/:userOrderEmail',
  expressAsyncHandler(async (req, res) => {
    if (Order.find({ userEmail: req.params.userOrderEmail })) {
      const orders = await Order.find({ userEmail: req.params.userOrderEmail });
      res.send(orders);
    }
  })
);

managerRouter.get('/staristic/:sort',
  expressAsyncHandler(async (req, res) => {
    const sortDate = req.params.sort;
    var date = new Date();
    if (sortDate === 'year') {
      date = date.setMonth(date.getMonth() - 12);
      const orders = await Order.find({ "createdAt": { $gte: date } });
      res.send(orders);
    }
    else if (sortDate === '1month') {
      date = date.setMonth(date.getMonth() - 1);
      const orders = await Order.find({ "createdAt": { $gte: date } });
      res.send(orders);
    }
    else if (sortDate === '6month') {
      date = date.setMonth(date.getMonth() - 6);
      const orders = await Order.find({ "createdAt": { $gte: date } });
      res.send(orders);
    }
    else if (sortDate === 'allTime'){
      const orders = await Order.find();
      res.send(orders);
    }

  })
);

managerRouter.put('/orders/delivery',
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.body.orderId);
    if (order) {
      order.isDelivered = true;
      const updatedOrder = await order.save();
      res.send(updatedOrder);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
// managerRouter.get('/orders/ordernumber/:orderNumber',
//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.findById(req.params.orderNumber);
//     res.send(orders);
//   })
// );

managerRouter.delete('/delivery/:deliveryName',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.deliveryName);
    const deliveryDeleted = await Delivery.findOne({ deliveryName: req.params.deliveryName });
    if (deliveryDeleted) {
      await deliveryDeleted.remove();
      res.send({ message: 'Delivery Deleted' });
    } else {
      res.status(404).send({ message: 'Delivery Not Found' });
    }
  })
);
managerRouter.delete('/product/:productTitle',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.productTitle);
    const productDeleted = await Product.findOne({ title: req.params.productTitle });
    if (productDeleted) {
      await productDeleted.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

managerRouter.post(
  '/adddelivery',
  expressAsyncHandler(async (req, res) => {
    const checkDelivery = await Delivery.findOne({ deliveryName: req.body.deliveryName });
    if (checkDelivery) {
      res.status(401).send({ message: 'Delivery name is already use, please select another name' });
    }
    else {
      const newDelivery = new Delivery({
        deliveryName: req.body.deliveryName,
        minDays: req.body.minDays,
        maxDays: req.body.maxDays,
        deliveryPrice: req.body.deliveryPrice,
      });
      await newDelivery.save();
      res.send({
        message: 'Delivery option add successfully'
      });
    }
  })
);
managerRouter.post(
  '/addproduct',
  expressAsyncHandler(async (req, res) => {
    const checkProduct = await Product.findOne({ title: req.body.title });
    if (checkProduct) {
      res.status(401).send({ message: 'Product name is already use, please select another name' });
    }
    else {
      const newProduct = new Product({
        title: req.body.title,
        slug: req.body.title.replaceAll(' ', '-'),
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        color: req.body.color,
        size: req.body.size,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: 0,
        numReviews: 0,
      });
      await newProduct.save();
      res.send({
        message: 'Product add successfully'
      });
    }
  })
);
managerRouter.put(
  '/editproduct',
  expressAsyncHandler(async (req, res) => {
    const checkProduct = await Product.findOne({ slug: req.body.slug });
    const notavailableProduct = await Product.findOne({ title: req.body.title });
    if (notavailableProduct && notavailableProduct.slug !== checkProduct.slug) {
      res.status(401).send({ message: 'Product name is already use, please select another name' });
    }
    else if (checkProduct) {
      checkProduct.title = req.body.title || checkProduct.title;
      checkProduct.slug = req.body.title.replaceAll(' ', '-') || checkProduct.slug;
      checkProduct.image = req.body.image || checkProduct.image;
      checkProduct.brand = req.body.brand || checkProduct.brand;
      checkProduct.category = req.body.category || checkProduct.category;
      checkProduct.color = req.body.color || checkProduct.color;
      checkProduct.size = req.body.size || checkProduct.size;
      checkProduct.type = req.body.type || checkProduct.type;
      checkProduct.description = req.body.description || checkProduct.description;
      checkProduct.price = req.body.price || checkProduct.price;
      checkProduct.countInStock = req.body.countInStock || checkProduct.countInStock;
      // checkProduct.rating = checkProduct.rating;
      // checkProduct.numReviews = checkProduct.numReviews;

      await checkProduct.save();
      res.send({
        message: 'Product Update',
      });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  })
);

export default managerRouter;
