import mssql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const connectionSettings = {
    server      : process.env.MSSQL_HOST || "localhost",
    database    : process.env.MSSQL_DB   || "principal",
    user        : process.env.MSSQL_USER || "sa",
    password    : process.env.MSSQL_PASS || "Wilmer2005!",
    options     : {
        encrypt : true,
        trustServerCertificate : true
    }
}

export default async function getConexion() { 
    try {
        return await mssql.connect(connectionSettings);
    } catch(e) {
        console.error(e);
    }
}