import { useState, useEffect } from "react";
import { createAlmacen, updateAlmacen, getAlmacenById } from "../services/almacenService";

export const AlmacenForm = ({ selectedId, onSaved, onCancel, editMode }: any) => {
  const [nombreAlmacen, setNombreAlmacen] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (editMode && selectedId) {
      getAlmacenById(selectedId).then(res => {
        setNombreAlmacen(res.data.nombre_almacen);
        setDescripcion(res.data.descripcion);
      });
    } else {
      setNombreAlmacen("");
      setDescripcion("");
    }
  }, [selectedId, editMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreAlmacen && descripcion) {
      if (editMode && selectedId) {
        await updateAlmacen(selectedId, {
          nombre_almacen: nombreAlmacen,
          descripcion: descripcion
        });
      } else {
        await createAlmacen({
          nombre_almacen: nombreAlmacen,
          descripcion: descripcion
        });
      }
      setNombreAlmacen("");
      setDescripcion("");
      onSaved();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombreAlmacen}
        onChange={(e) => setNombreAlmacen(e.target.value)}
        placeholder="Nombre del almacén"
        required
      />
      <input
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        required
      />
      <button type="submit">{editMode ? "Actualizar" : "Guardar"}</button>
      {editMode && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
};