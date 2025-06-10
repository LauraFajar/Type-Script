import "reflect-metadata"; 
import { DataSource } from "typeorm";
import { Almacen } from "./entities/Almacen"; 
import { Rol } from "./entities/Rol";   
import dotenv from 'dotenv';

dotenv.config(); 

export const AppDataSource = new DataSource({
    type: "postgres", 
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false, 
    logging: false, 
    entities: [Almacen, Rol], 
    migrations: [],
    subscribers: [],
});