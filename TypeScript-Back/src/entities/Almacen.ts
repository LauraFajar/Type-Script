import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("almacenes") 
export class Almacen {
    @PrimaryGeneratedColumn() 
    id_almacen!: number; 

    @Column({ type: "varchar", length: 255, unique: true }) 
    nombre_almacen!: string;

    @Column({ type: "text", nullable: true }) 
    descripcion!: string | null; 
}