import React from "react";

const ProductForm = ({ values, categories, handleChange, onSubmit }) => {
  return (
    <form>
      <span>Post photo</span>
      <div className="form-group col">
        {/* <label className="btn btn-block btn-success mt-2"> */}
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          className="form-control"
          accept="image"
          placeholder="choose a file"
        />
        {/* </label> */}
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={values.description}
        />
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("price")}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={values.price}
        />
      </div>
      <div className="form-group mt-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          name="category"
        >
          <option>Select</option>
          {categories &&
            categories.map((categ, index) => (
              <option key={index} value={categ._id}>
                {categ.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          name="quantity"
          value={values.stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success my-3"
      >
        Create Product
      </button>
    </form>
  );
};

export default ProductForm;
