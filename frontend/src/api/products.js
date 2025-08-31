import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getProducts = (category) => API.get("/products",{params : { category }});

export const createProduct = (data) => API.post("/products",data);

export const updateProduct = (id,data) => API.put(`/products/${id}`,data);

export const deleteProductApi = (id) => API.delete(`/products/${id}`);