import { Router } from 'express'; 
import {
    getAllAlmacenes,
    getAlmacenById,
    createAlmacen,
    updateAlmacen,
    deleteAlmacen
} from '../controllers/almacen.controller'; 

const router = Router(); 

router.get('/listar', getAllAlmacenes);         
router.get('/buscar/:id', getAlmacenById);       
router.post('/crear', createAlmacen);          
router.put('/actualizar/:id', updateAlmacen);        
router.delete('/eliminar/:id', deleteAlmacen);    

export default router;