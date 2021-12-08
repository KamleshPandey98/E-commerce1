import React, { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./helper/adminapicall";
import { handleToast } from "../reusables/HandleToast";
import { ToastContainer } from "react-toastify";
import Base from "../core/Base";
import { cPrint } from "../backend";
import { isAuthenticated } from "../auth/helper";
import CategorySearch from "./components/CategorySearch";
import ShowAllCategories from "./components/ShowAllCategories";
import EditCategoryForm from "./components/EditCategoryForm";
import BackToDashboard from "./components/BackToDashboard";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [updateCategName, setUpdateCategName] = useState("");
  const [categoryEdit, setCategoryEdit] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, authToken } = isAuthenticated();
  const [searchQuery, setSearchQuery] = useState("");

  var filteredCategoryList = categories.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    firstFetch();

    // return () => {
    //   cleanup;
    // };
  }, []);

  async function firstFetch() {
    await getAllCategory()
      .then((data) => {
        if (data.error) {
          handleToast(false, data.error, "error");
          setLoading(false);
        } else if (typeof data == typeof [] && data) {
          setCategories(data);
          //   handleToast(true, "data fetched", "success");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        handleToast(false, err, "error");
      });
  }

  // Actions

  const selectCategoryToEdit = (value) => {
    setCategoryEdit(value);
    setUpdateCategName(value.name);
  };

  const onSubmit = async (event) => {
    cPrint(`chk: ${categoryEdit.name}`);
    event.preventDefault();
    if (
      updateCategName &&
      categoryEdit._id &&
      updateCategName !== categoryEdit.name
    ) {
      setLoading(true);
      await updateCategory(
        updateCategName,
        categoryEdit._id,
        user._id,
        authToken
      )
        .then(async (data) => {
          if (data.error) {
            setLoading(false);
            handleToast(false, data.error, "error");
          } else {
            setCategoryEdit({ ...categoryEdit, name: updateCategName });
            handleToast(true, "Updated Successfully", "success");
            await firstFetch();
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          handleToast(false, err, "error");
        });
    } else {
      cPrint("Not cha");
    }
  };

  const handleChange = (event) => {
    setUpdateCategName(event.target.value);
  };

  // DELETE
  const onDeleteCategory = async (categoryId) => {
    setLoading(true);
    await deleteCategory(categoryId, user._id, authToken)
      .then(async (data) => {
        if (data.error) {
          setLoading(false);
          handleToast(false, data.error, "error");
        } else {
          handleToast(true, data.msg, "success");
          await firstFetch();
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        handleToast(false, err, "error");
      });
  };

  // Sub UI

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading.....</h2>
        </div>
      )
    );
  };

  // main UI
  return (
    <Base
      title="Manage category here"
      description="Add a new category for new tshirts"
      className="container p-4"
    >
      <ToastContainer autoClose={3000} limit={3} />
      {showLoading()}
      <div className="row  align-items-center">
        <div className="col-5">
          {CategorySearch({ query: searchQuery, querySetter: setSearchQuery })}
          {ShowAllCategories({
            filteredCategoryList: filteredCategoryList,
            selectCategoryToEdit: selectCategoryToEdit,
            onDeleteCategory: onDeleteCategory,
          })}
          <h5>More</h5>
        </div>
        <div className="col-7">
          {categoryEdit &&
            EditCategoryForm({
              categoryEdit: categoryEdit,
              updateCategName: updateCategName,
              handleChange: handleChange,
              onSubmit: onSubmit,
            })}
          {BackToDashboard()}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;
