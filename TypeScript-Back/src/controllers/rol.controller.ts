import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Rol } from '../entities/Rol';

const rolRepository = AppDataSource.getRepository(Rol);

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await rolRepository.find();
        res.json(roles);
    } catch (error) {
        console.error("Error al obtener roles:", error);
        res.status(500).json({ message: "Error interno del servidor al obtener los roles" });
    }
};

export const getRolById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rol = await rolRepository.findOneBy({ id_rol: parseInt(id) });
        if (rol) {
            res.json(rol);
        } else {
            res.status(404).json({ message: "Rol no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener rol por ID:", error);
        res.status(500).json({ message: "Error interno del servidor al obtener el rol" });
    }
};

export const createRol = async (req: Request, res: Response) => {
    try {
        const newRol = rolRepository.create(req.body);
        await rolRepository.save(newRol);
        res.status(201).json(newRol);
    } catch (error: any) {
        console.error("Error al crear rol:", error);
        if (error.code === '23505') {
            res.status(409).json({ message: "Ya existe un rol con este nombre." });
        } else {
            res.status(500).json({ message: "Error interno del servidor al crear el rol" });
        }
    }
};

export const updateRol = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rol = await rolRepository.findOneBy({ id_rol: parseInt(id) });
        if (rol) {
            rolRepository.merge(rol, req.body);
            const result = await rolRepository.save(rol);
            res.json(result);
        } else {
            res.status(404).json({ message: "Rol no encontrado para actualizar" });
        }
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).json({ message: "Error interno del servidor al actualizar el rol" });
    }
};

export const deleteRol = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await rolRepository.delete({ id_rol: parseInt(id) });
        if (result.affected && result.affected > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Rol no encontrado para eliminar" });
        }
    } catch (error) {
        console.error("Error al eliminar rol:", error);
        res.status(500).json({ message: "Error interno del servidor al eliminar el rol" });
    }
};