export function success(req, res, mensaje, status) {
  res.status(status).send({
    error: false,
    status: status,
    body: mensaje || "",
  });
}

export function error(req, res, mensaje, status) {
  res.status(status).send({
    error: true,
    status: status,
    body: mensaje || "Error interno",
  });
}
