import express from 'express';
import db from '../../../conexion_bd/db.js';
import {error, success} from '../../red/response.js';

const router  = express.Router();
let   mResult = await db.executeQuery('SELECT * FROM productos')
router.get('/', function(req, res) {
    success(req, res, mResult.recordsets, res.statusCode)
});

export default router; 