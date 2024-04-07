import jwt from "jsonwebtoken";

export const createToken = (data) => {
  let token = jwt.sign({ data: data }, "BIMAT", {
    algorithm: "HS256",
    expiresIn: "30d",
  });

  return token;
};

export const checkToken = (token) =>
  jwt.verify(token, "BIMAT", (error, decoded) => error);

export const checkRefToken = (token) =>
  jwt.verify(token, "KO_BIMAT", (error, decoded) => error);

// giải mã token
export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const verifyToken = (req, res, next) => {
  let { token } = req.headers;
  let check = checkToken(token);
  if (check == null) {
    //check token hợp lệ
    next();
  } else {
    // token không hợp lệ
    res.status(401).send(check.name);
  }
};
