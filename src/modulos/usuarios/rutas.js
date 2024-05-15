import express from "express";
import db from "../../../conexion_bd/db.js";
import { error, success } from "../../red/response.js";

const router = express.Router();
let mResult = async (pStrQuerry, mTypeRequest) => {
  let mRSResult = {};

  if (mTypeRequest == "query") {
    mRSResult = await db.executeQuery(pStrQuerry);
  } else if (mTypeRequest == "one") {
    mRSResult = await db.uno(pStrQuerry.tabname, pStrQuerry.condicion);
  } else if (mTypeRequest == "delete") {
    await db.eliminar(pStrQuerry.tabname, pStrQuerry.condicion);

    mRSResult.recordsets = "Registro eliminado";
  }
  return mRSResult.recordsets;
};

//Lista de rutas para productos
router.get("/", todos);
router.get("/:id", uno);
router.put("/", eliminar);
router.post("/", agregar);

//Funcionalidades de rutas
async function todos(req, res) {
  try {
    let mStrQuery = "SELECT * FROM usuarios";
    success(req, res, await mResult(mStrQuery, "query"), res.statusCode);
  } catch (err) {
    next(err);
  }
}

async function uno(req, res) {
  try {
    let mStrQuery = {
      tabname: "usuarios",
      condicion: {
        idproducto: req.params.id,
      },
    };
    success(req, res, await mResult(mStrQuery, "one"), res.statusCode);
  } catch (err) {
    next(err);
  }
}

async function eliminar(req, res) {
  try {
    let mJSONCond = {
      tabname: "usuarios",
      condicion: {
        idproducto: req.body.idproducto,
      },
    };
    success(req, res, await mResult(mJSONCond, "delete"), res.statusCode);
  } catch (err) {
    next(err);
  }
}

async function agregar(req, res) {
  try {
    await db.agregar("usuarios", req.body);
    let message = "El producto fue creado correctamente";

    success(req, res, message, res.statusCode);
  } catch (err) {
    next(err);
  }
}

export default router;
