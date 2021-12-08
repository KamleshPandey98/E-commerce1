import React from "react";

const ShowAllCategories = ({
  filteredCategoryList,
  selectCategoryToEdit,
  onDeleteCategory,
}) => {
  const scrollStyle = {
    overflow: "scroll",
    height: "80vh",
    whiteSpace: "nowrap",
  };
  return (
    <div style={scrollStyle}>
      {filteredCategoryList &&
        filteredCategoryList.map((value) => (
          <div className="row">
            <div
              className="col-md-8 card btn btn-sm btn-outline-warning 
              bg-opacity-25 bg-body text-white text-center m-2 ms-3"
              onClick={() => selectCategoryToEdit(value)}
            >
              <h2 key={value._id}>{value.name}</h2>
            </div>
            <div
              className="col-md-2 card bg-danger btn btn-sm btn-outline-light 
              btn-sm m-2 mx-0 my-3 text-white text-center justify-content-center"
              onClick={() => onDeleteCategory(value._id)}
            >
              Delete
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowAllCategories;
