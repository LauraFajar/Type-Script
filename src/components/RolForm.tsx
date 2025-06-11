import { useState, useEffect } from "react";
import { createRol, updateRol, getRolById } from "../services/rolService";

export const RolForm = ({ selectedId, onSaved, onCancel, editMode }: any) => {
  const [nombreRol, setNombreRol] = useState("");
  const [idTipoRol, setIdTipoRol] = useState("");

  useEffect(() => {
    if (editMode && selectedId) {
      getRolById(selectedId).then(res => {
        setNombreRol(res.data.nombre_rol);
        setIdTipoRol(res.data.id_tipo_rol);
      });
    } else {
      setNombreRol("");
      setIdTipoRol("");
    }
  }, [selectedId, editMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreRol && idTipoRol) {
      if (editMode && selectedId) {
        await updateRol(selectedId, {
          nombre_rol: nombreRol,
          id_tipo_rol: Number(idTipoRol)
        });
      } else {
        await createRol({
          nombre_rol: nombreRol,
          id_tipo_rol: Number(idTipoRol)
        });
      }
      setNombreRol("");
      setIdTipoRol("");
      onSaved();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombreRol}
        onChange={(e) => setNombreRol(e.target.value)}
        placeholder="Nombre del rol"
        required
      />
      <input
        type="number"
        value={idTipoRol}
        onChange={(e) => setIdTipoRol(e.target.value)}
        placeholder="ID tipo rol"
        required
      />
      <button type="submit">{editMode ? "Actualizar" : "Guardar"}</button>
      {editMode && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
};