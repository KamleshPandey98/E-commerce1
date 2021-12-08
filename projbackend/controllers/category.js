import Category from "../models/category.js";

export function getCategoryById(req, res, next, id) {
  Category.findById(id).exec((err, categ) => {
    if (err) {
      return res.status(400).json({
        error: "Category Not Found in Db",
      });
    }
    req.category = categ;
    next();
  });
}

export function createCategory(req, res) {
  const category = new Category(req.body);
  category.save((err, categoryObject) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }
    res.json({
      categoryObject,
    });
  });
}

export function getCategory(req, res) {
  return res.json(req.category);
}

export function getAllCategory(req, res) {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories found",
      });
    }
    res.json(categories);
  });
}

export function updateCategory(req, res) {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Failed to update category.",
        msg: err._message,
      });
    }
    res.json(updatedCategory);
  });
}

export function deleteCategory(req, res) {
  const category = req.category;
  console.log(req.category);

  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status().json({
        error: "Failed to delete category.",
        msg: err._message,
      });
    }
    res.json({
      msg: "Successfully Deleted",
    });
  });
}
