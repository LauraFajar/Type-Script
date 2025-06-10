import express from 'express';
import { AppDataSource } from './data-source'; 
import almacenRoutes from './routes/almacen.routes'; 
import rolRoutes from './routes/rol.routes';    
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 

app.use(cors()); 

app.use('/api/almacenes', almacenRoutes); 
app.use('/api/roles', rolRoutes);       

AppDataSource.initialize() 
    .then(() => {
        console.log("Conexión a la base de datos establecida.");
        app.listen(PORT, () => { 
            console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error("Error al conectar a la base de datos:", error)); 