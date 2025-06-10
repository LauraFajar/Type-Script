import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("rol") 
export class Rol {
    @PrimaryGeneratedColumn()
    id_rol!: number;

    @Column({ type: "varchar", length: 100, unique: true })
    nombre_rol!: string;

    @Column({ type: "int" }) 
    id_tipo_rol!: number;
}