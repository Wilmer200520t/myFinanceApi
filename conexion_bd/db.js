import e from "express";
import getConexion from "./conexion_sql.js";
const mCXPool = await getConexion();

export async function executeQuery(query) {
  try {
    return await mCXPool.request().query(query);
  } catch (e) {
    return `Error executing query: ${e.message}`;
  }
}
export async function todos(tabla, condicion) {
  let mStrCondicion = "WHERE ";
  if (typeof condicion === "object") {
    Object.keys(condicion).forEach((pObjkey, index) => {
      mStrCondicion += `${pObjkey} = ${condicion[pObjkey]} ${
        index + 1 !== Object.keys(condicion).length ? "AND " : ""
      }`;
    });
  } else if (typeof condicion === null || condicion === "") {
    mStrCondicion = "";
  } else if (typeof condicion === "string") {
    mStrCondicion += condicion;
  }

  let mSQLQuery = `SELECT * FROM ${tabla} ${mStrCondicion}`;
  try {
    return await mCXPool.request().query(mSQLQuery);
  } catch (err) {
    return `Error executing query: ${err}`;
  }
}

export async function uno(tabla, condicion) {
  let mStrCondicion = "WHERE ";
  if (typeof condicion === "object") {
    Object.keys(condicion).forEach((pObjkey, index) => {
      mStrCondicion += `${pObjkey} = ${condicion[pObjkey]} ${
        index + 1 !== Object.keys(condicion).length ? "AND " : ""
      }`;
    });
  } else if (typeof condicion === null || condicion === "") {
    mStrCondicion = "";
  } else if (typeof condicion === "string") {
    mStrCondicion += condicion;
  }
  try {
    return await mCXPool
      .request()
      .query(`SELECT TOP 1 * FROM ${tabla} ${mStrCondicion}`);
  } catch (err) {
    return `Error executing query: ${err}`;
  }
}

export async function agregar(tabla, datos) {
  try {
    console.log(`INSERT INTO ${tabla} (${Object.keys(datos).join(",")}) 
    VALUES ('${Object.values(datos).join("','")}')`);

    return await mCXPool.request().query(
      `INSERT INTO ${tabla} (${Object.keys(datos).join(",")}) 
        VALUES ('${Object.values(datos).join("','").toString()}')`
    );
  } catch (err) {
    return `Error executing query: ${err}`;
  }
}

export async function eliminar(tabla, condicion) {
  let mStrCondicion = "WHERE ";
  if (typeof condicion === "object") {
    Object.keys(condicion).forEach((pObjkey, index) => {
      mStrCondicion += `${pObjkey} = ${condicion[pObjkey]} ${
        index + 1 !== Object.keys(condicion).length ? "AND " : ""
      }`;
    });
  } else if (typeof condicion === null || condicion === "") {
    mStrCondicion = "";
  } else if (typeof condicion === "string") {
    mStrCondicion += condicion;
  }
  try {
    return await mCXPool
      .request()
      .query(`DELETE FROM ${tabla} ${mStrCondicion}`);
  } catch (err) {
    return `Error executing query: ${err}`;
  }
}

export async function update(tabla, condicion, datos) {}

export default {
  executeQuery,
  todos,
  uno,
  agregar,
  eliminar,
  update,
};
