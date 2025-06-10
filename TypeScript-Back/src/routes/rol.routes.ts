import { Router } from 'express';
import {
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
} from '../controllers/rol.controller';

const router = Router();

router.get('/listar', getAllRoles);
router.get('/buscar/:id', getRolById);
router.post('/crear', createRol);
router.put('/actualizar/:id', updateRol);
router.delete('/eliminar/:id', deleteRol);

export default router;