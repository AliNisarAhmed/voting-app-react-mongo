import jwt from 'jsonwebtoken';

// Bearer Token String -> Boolean

export default function checkTokenExpiry(token) {
  const decoded = jwt.decode(token.split(' ')[1]);
  const now = Date.now().valueOf() / 1000;
  if (decoded.exp > now) {
    return true;
  }
  return false;
}