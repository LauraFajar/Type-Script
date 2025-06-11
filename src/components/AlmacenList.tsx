import { useEffect, useState } from "react";
import { getAlmacenes, deleteAlmacen } from "../services/almacenService";
import { AlmacenForm } from "./AlmacenForm";

export const AlmacenList = () => {
  const [almacenes, setAlmacenes] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

  const loadAlmacenes = async () => {
    const res = await getAlmacenes();
    setAlmacenes(res.data);
  };

  useEffect(() => {
    loadAlmacenes();
  }, []);

  const handleEdit = (id: number) => {
    setSelectedId(id);
    setEditMode(true);
  };

  const handleSaved = () => {
    setEditMode(false);
    setSelectedId(null);
    loadAlmacenes();
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedId(null);
  };

  return (
    <div>
      <AlmacenForm
        selectedId={selectedId}
        onSaved={handleSaved}
        onCancel={handleCancel}
        editMode={editMode}
      />
      <h2>Lista de Almacenes</h2>
      <ul>
        {almacenes.map((almacen) => (
          <li key={almacen.id_almacen}>
            <span>
            {almacen.nombre_almacen} - {almacen.descripcion}
            </span>
            <span className="actions">
            <button onClick={() => handleEdit(almacen.id_almacen)}>Editar</button>
            <button onClick={() => deleteAlmacen(almacen.id_almacen).then(loadAlmacenes)}>
              Eliminar
            </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};