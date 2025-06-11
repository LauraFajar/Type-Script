import { useEffect, useState } from "react";
import { getRoles, deleteRol } from "../services/rolService";
import { RolForm } from "./RolForm";

export const RolList = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

  const loadRoles = async () => {
    const res = await getRoles();
    setRoles(res.data);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleEdit = (id: number) => {
    setSelectedId(id);
    setEditMode(true);
  };

  const handleSaved = () => {
    setEditMode(false);
    setSelectedId(null);
    loadRoles();
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedId(null);
  };

  return (
    <div>
      <RolForm
        selectedId={selectedId}
        onSaved={handleSaved}
        onCancel={handleCancel}
        editMode={editMode}
      />
      <h2>Lista de Roles</h2>
      <ul>
        {roles.map((rol) => (
          <li key={rol.id_rol}>
            <span>
            {rol.nombre_rol} (Tipo: {rol.id_tipo_rol})
            </span>
            <span className="actions">
            <button onClick={() => handleEdit(rol.id_rol)}>Editar</button>
            <button onClick={() => deleteRol(rol.id_rol).then(loadRoles)}>
              Eliminar
            </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};