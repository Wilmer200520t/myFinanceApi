export function error(pStrMessage) {
  let err = new Error(pStrMessage);

  if (code) {
    err.statusCode = code;
  }
  return err;
}
