import * as api from "../api"; //importa todas las funciones de index.js de la carpeta api para usarlo aqui
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //log in user
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //sing up user
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
