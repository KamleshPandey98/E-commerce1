import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import CustomCard from "./CustomCard";
import { getAllCategory, getProducts } from "../admin/helper/adminapicall";
import { handleToast } from "../reusables/HandleToast";
import { ToastContainer } from "react-toastify";

export default function Home() {
  console.log("API IS", API);
  const [products, setProducts] = useState([]);

  const loadAllPoducts = () => {
    getProducts().then((data) => {
      console.log(data);
      if (data.error) {
        handleToast(false, data.error, "error");
      } else {
        setProducts(data);
        handleToast(true, "fetched", "success");
      }
    });
  };

  useEffect(() => {
    loadAllPoducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Store !">
      <ToastContainer autoClose={3000} limit={3} />
      <div className="row text-center">
        <h1>All of tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div className="col-4 mb-4" key={index}>
                <CustomCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
