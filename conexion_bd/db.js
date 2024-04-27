import getConexion from './conexion_sql.js';
const mCXPool = await getConexion();

export async function executeQuery(query){
    try {
        return await mCXPool.request().query(query)
    }catch(e){
        return `Error executing query: ${e.message}`;
    } 
}
export async function todos(tabla, condicion){
    let mStrCondicion = 'WHERE ';
    if(typeof(condicion) === 'object'){
        Object.keys(condicion).forEach( (pObjkey, index) => {
            mStrCondicion += `${pObjkey} = ${condicion[pObjkey]} ${(index + 1) !== Object.keys(condicion).length ? 'AND ' : '' }`;
        })
    }else if(typeof(condicion) === null || condicion === ''){
        mStrCondicion = '';
    }else if (typeof(condicion) === 'string'){
        mStrCondicion += condicion;
    }

    let mSQLQuery = `SELECT * FROM ${tabla} ${mStrCondicion}`
    try {
        return await mCXPool.request().query(mSQLQuery)
    }catch(e){
        return `Error executing query: ${e.message}`;
    } 
}

export async function uno(tabla, condicion){

}

export async function agregar(tabla, datos){

}

export async function eliminar(tabla, condicion){

}

export async function update(tabla, condicion, datos){

}

export default {
    executeQuery,
    todos,
    uno,
    agregar,
    eliminar,
    update
}

