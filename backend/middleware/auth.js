import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //traer el token del frontend
    const token = req.headers.authorization.split(" ")[1];
    //para cuando tenes 2 token, el tuyo y el de google
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      //nuestro propio token, verifica el username y el id de cada token especifico para saber cual usuario es
      decodedData = jwt.verify(token, process.env.SECRET);
      // guarda el id del usuario verificado en req.userId
      req.userId = decodedData?.id;
    } else {
      //aqui va el codigo de google auth o cualquier otro que uses
      //decodedData = jwt.decode(token)
      //req.userId = decodedData?.sub -> sub es el nombre que le da google al id que diferencia a cada usuario
      console.log("google auth");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
