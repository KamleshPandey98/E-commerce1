import React from "react";

const CategorySearch = ({ query, querySetter }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control my-2"
        placeholder="Search Category"
        value={query}
        onChange={(event) => {
          querySetter(event.target.value);
        }}
      />
      <button
        class="btn card btn-outline-danger my-2"
        type="button"
        id="button-addon2"
        onClick={() => querySetter("")}
      >
        Clear
      </button>
    </div>
  );
};

export default CategorySearch;
