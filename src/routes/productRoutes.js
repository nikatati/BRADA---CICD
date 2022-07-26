
import express from 'express';
import Product from '../dbModels/product.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize;
    const page = query.page || 1;
    const type = query.type || '';
    const category = query.category || '';
    const price = query.price || '';
    const color = query.color || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
          title: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
        : {};
    const typeFilter = type && type !== 'all' ? { type } : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const colorFilter = color && color !== 'all' ? { color } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
          rating: {
            $gte: Number(rating),
          },
        }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
          // 1-50
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
          ? { price: 1 }
          : order === 'highest'
            ? { price: -1 }
            : order === 'toprated'
              ? { rating: -1 }
              : order === 'newest'
                ? { createdAt: -1 }
                : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...typeFilter,
      ...categoryFilter,
      ...priceFilter,
      ...colorFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...typeFilter,
      ...categoryFilter,
      ...priceFilter,
      ...colorFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.post(
  '/:id/reviews',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.email === req.body.email)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        email: req.body.email,
        rating: Number(req.body.rating),
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/colors',
  expressAsyncHandler(async (req, res) => {
    const colors = await Product.find().distinct('color');
    res.send(colors);
  })
);

productRouter.get(
  '/types',
  expressAsyncHandler(async (req, res) => {
    const types = await Product.find().distinct('type');
    res.send(types);
  })
);

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    console.log(product);
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


export default productRouter;
