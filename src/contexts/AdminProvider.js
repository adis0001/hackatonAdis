import React from "react";
import axios from "axios";
import { API } from "../helpers/const";
import { toast } from "react-toastify";

export const AdminContext = React.createContext();

const INIT_STATE = {
  products: null,
  productToEdit: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_TO_EDIT":
      return { ...state, productToEdit: action.payload };
    default:
      return state;
  }
};

const AdminProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE);
  const addProduct = async (newProduct) => {
    try {
      // ! (Куда запрос, что отправить)
      await axios.post(API, newProduct);
      toast.success("Успешно добавлено!");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка! Попробуйте снова");
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_PRODUCT_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditedProduct = async (productEdit) => {
    try {
      await axios.patch(`${API}/${productEdit.id}`, productEdit);
      toast.success("Изменения сохранены");
      getProducts();
    } catch (error) {
      toast.error("Ошибка! Попробуйте позже");
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getProducts();
      toast.success("Успешно удалено!");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка! Попробуйте позже");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        addProduct,
        getProducts,
        getProductToEdit,
        saveEditedProduct,
        deleteProduct,
        products: state.products,
        productToEdit: state.productToEdit,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
