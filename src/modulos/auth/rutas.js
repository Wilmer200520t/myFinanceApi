import express from "express";
import db from "../../../conexion_bd/db.js";
import { error, success } from "../../red/response.js";
import bcrypt from "bcrypt";
import asignarToken from "../../../autentificacion/index.js";

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
router.get("/login/", login);
router.get("/:id", uno);
router.put("/", eliminar);
router.post("/", agregar);

//login
async function login(req, res) {
  try {
    let mStrQuery = {
      tabname: "autentificacion",
      condicion: {
        id: req.body.id,
      },
    };
    let mResultado = 'Error interno' 

    let data = await mResult(mStrQuery, "one");
        data = data[0][0];

    if (data){
      mResultado = await bcrypt.compare(req.body.pass, data.pass)
                        .then(result => {
                          if (result === true) {
                              //Generar token
                              return asignarToken(data)
                          } else {
                          
                            return "Error al comparar contraseñas"
                          }
                        });
    }

    success(req, res, mResultado, res.statusCode);
    
  } catch (error) {
    console.log(error)
  }

}
//Funcionalidades de rutas
async function todos(req, res) {
  try {
    let mStrQuery = "SELECT * FROM autentificacion";
    success(req, res, await mResult(mStrQuery, "query"), res.statusCode);
  } catch (err) {
    console.log(err)
  }
}

async function uno(req, res) {
  try {
    let mStrQuery = {
      tabname: "autentificacion",
      condicion: {
        id: req.params.id,
      },
    };
    success(req, res, await mResult(mStrQuery, "one"), res.statusCode);
  } catch (err) {
    console.log(err)
  }
}

async function eliminar(req, res) {
  try {
    let mJSONCond = {
      tabname: "autentificacion",
      condicion: {
        id: req.body.idproducto,
      },
    };
    success(req, res, await mResult(mJSONCond, "delete"), res.statusCode);
  } catch (err) {
    console.log(err)
  }
}

async function agregar(req, res) {
  try {
    req.body.pass = (await bcrypt.hash(req.body.pass.toString(), 5));
    await db.agregar("autentificacion", req.body);
    let message = "El producto fue creado correctamente";

    success(req, res, message, res.statusCode);
  } catch (err) {
    console.log(err)
  }
}

export default router;
