import Product from "../models/product.js";
import formidable from "formidable";
import fs from "fs";
import lodash from "lodash";
import router from "../routes/product.js";

export function getProductById(req, res, next, id) {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
}

//TODO: Revise Again
export function createProduct(req, res) {
  let form = new formidable.IncomingForm({ keepExtensions: true });
  //   form.max;
  //   form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    // destructure the fields
    const { name, price, description, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size to big !",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving product in DB failed.",
          msg: err,
        });
      }
      res.json(product);
    });
  });
}

export function getProduct(req, res) {
  req.product.photo = undefined;
  return res.json(req.product);
}

//middleware
export function photo(req, res, next) {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}

export function deleteProduct(req, res) {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was successfull",
    });
  });
}

export function updateProduct(req, res) {
  let form = new formidable.IncomingForm({ keepExtensions: true });
  //   form.max;
  //   form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    let product = req.product;
    product = lodash.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size to big !",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving product in DB failed.",
          msg: err,
        });
      }
      res.json(product);
    });
  });
}

export function getAllProducts(req, res) {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "No Product Found.",
        });
      }
      res.json(products);
    });
}

export function getAllUniqueCategories(req, res) {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json({ category });
  });
}

// middleware
export function updateStock(req, res, next) {
  // TODO: understand this req.body.order
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
}
