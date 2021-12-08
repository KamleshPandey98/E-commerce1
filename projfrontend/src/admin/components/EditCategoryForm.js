import React from "react";

const EditCategoryForm = ({
  categoryEdit,
  updateCategName,
  handleChange,
  onSubmit,
}) => {
  return (
    <div className="card">
      <h5 className="card-header container text-center">
        {categoryEdit.name ?? "Category Name"}
      </h5>
      <div className="container">
        <form action="">
          <div className="form-group">
            <input
              type="text"
              className="form-control my-2"
              readOnly
              placeholder="Category Id"
              value={categoryEdit._id}
            />
            <p className="lead">Enter the category name</p>
            <input
              type="text"
              className="form-control my-2"
              onChange={handleChange}
              name="name"
              value={updateCategName}
              autoFocus
              required={true}
              placeholder="For ex. Mobile"
            />
            <input
              type="text"
              className="form-control my-2"
              readOnly
              placeholder="Created At"
              value={categoryEdit.createdAt}
            />
            <input
              type="text"
              className="form-control my-2"
              readOnly
              placeholder="Updated At"
              value={categoryEdit.updatedAt}
            />
            <button className="btn btn-outline-success my-2" onClick={onSubmit}>
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
