import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `http://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/book.jpg`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "50%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
