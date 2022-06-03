import axios from "axios";

//axios instance
const API = axios.create({ baseURL: "http://localhost:5000" });

//el interceptor sirve para pasarle al backend la autorizacion y pueda verificar el usuario, se ejecuta en c/u de las request
API.interceptors.request.use((req) => {
  //verifica que exista el usuario en el local storage con el token
  if (localStorage.getItem("profile")) {
    //le agrega al request la autorizacion con el token para mandarle al backend
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//auth
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
