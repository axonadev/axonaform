import React from "react";
import { Button } from "axonaui";
import FiltroTemporale from "./FiltroTemporale";
const ProjectMenuForm = ({ idItem }) => {
  return (
    <div>
      {idItem === "filtro" && (
        <>
          <FiltroTemporale />
        </>
      )}
      {idItem === "stampa" && (
        <>
          <p>Contabilizzazione</p>
          <Button>Selezionata</Button>
        </>
      )}
    </div>
  );
};
export default ProjectMenuForm;

export const getProjectMenuItem = () => {
  const itemspj = [
    {
      id: "filtro",
      label: "filtro",
      img: "calendar",
      function: () => {},
    },
    {
      id: "stampa",
      label: "Stampa",
      img: "print",
      function: () => {},
    },
  ];

  return itemspj;
};
