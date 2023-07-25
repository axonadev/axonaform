import React from "react";
import { Button } from "axonaui";
const ProjectMenuForm = ({ idItem }) => {
  return (
    <div>
      {idItem === "anni" && (
        <>
          <p>Anni</p>
          <input type="date" />
        </>
      )}
      {idItem === "conta" && (
        <>
          <p>Contabilizzazione</p>
          <Button>Selezionata</Button>
        </>
      )}
    </div>
  );
};
export default ProjectMenuForm;

export const getProgectMenuItem = () => {
  const itemspj = [
    {
      id: "anni",
      label: "Anni",
      img: "calendar",
      function: () => {},
    },
    {
      id: "conta",
      label: "Contabilizzazione",
      img: "print",
      function: () => {},
    },
  ];

  return itemspj;
};
