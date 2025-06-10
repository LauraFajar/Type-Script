import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Almacen } from '../entities/Almacen';

const almacenRepository = AppDataSource.getRepository(Almacen);

export const getAllAlmacenes = async (req: Request, res: Response) => {
    try {
        const almacenes = await almacenRepository.find(); 
        res.json(almacenes); 
    } catch (error) {
        console.error("Error al obtener almacenes:", error);
        res.status(500).json({ message: "Error interno del servidor al obtener los almacenes" });
    }
};

export const getAlmacenById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const almacen = await almacenRepository.findOneBy({ id_almacen: parseInt(id) }); 
        if (almacen) {
            res.json(almacen);
        } else {
            res.status(404).json({ message: "Almacén no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener almacén por ID:", error);
        res.status(500).json({ message: "Error interno del servidor al obtener el almacén" });
    }
};

export const createAlmacen = async (req: Request, res: Response) => {
    try {
        const newAlmacen = almacenRepository.create(req.body);
        await almacenRepository.save(newAlmacen); 
        res.status(201).json(newAlmacen); 
    } catch (error: any) { 
        console.error("Error al crear almacén:", error);
        if (error.code === '23505') { 
            res.status(409).json({ message: "Ya existe un almacén con este nombre." });
        } else {
            res.status(500).json({ message: "Error interno del servidor al crear el almacén" });
        }
    }
};

export const updateAlmacen = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const almacen = await almacenRepository.findOneBy({ id_almacen: parseInt(id) });
        if (almacen) {
            almacenRepository.merge(almacen, req.body); 
            const result = await almacenRepository.save(almacen);
            res.json(result); 
        } else {
            res.status(404).json({ message: "Almacén no encontrado para actualizar" });
        }
    } catch (error) {
        console.error("Error al actualizar almacén:", error);
        res.status(500).json({ message: "Error interno del servidor al actualizar el almacén" });
    }
};

export const deleteAlmacen = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await almacenRepository.delete({ id_almacen: parseInt(id) });
        if (result.affected && result.affected > 0) { 
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: "Almacén no encontrado para eliminar" });
        }
    } catch (error) {
        console.error("Error al eliminar almacén:", error);
        res.status(500).json({ message: "Error interno del servidor al eliminar el almacén" });
    }
};