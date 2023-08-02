import React, { useState } from "react";
import { Button, InputData, Frame, FrameInRow } from "axonaui";
import { formatDate } from "axonalib";
const FiltroTemporale = () => {
  const [dateda, setDateDa] = useState();
  const [datea, setDatea] = useState();

  const getgiorno = (valint) => {
    let result = new Date();
    result.setDate(result.getDate() + valint);

    setDateDa(formatDate(result));
    setDatea(formatDate(result));
  };

  const getmese = (valint) => {
    let today = new Date();
    let mm = today.getMonth() + parseInt(valint);
    let firstDayOfMonth = new Date(today.getFullYear(), mm, 1);
    let lastDayOfMonth = new Date(today.getFullYear(), mm + 1, 0);

    setDateDa(formatDate(firstDayOfMonth));
    setDatea(formatDate(lastDayOfMonth));
  };

  const getanno = (valint) => {
    let today = new Date();
    let yy = today.getFullYear() + parseInt(valint);
    let firstDayOfYear = new Date(yy, 0, 1);
    let lastDayOfYear = new Date(yy, 11, 0);

    setDateDa(formatDate(firstDayOfYear));
    setDatea(formatDate(lastDayOfYear));
  };

  return (
    <Frame label="Filtro Temporale">
      <FrameInRow width={[20, 20]}>
        <InputData
          label="da"
          id="projectmenu_filtro_da"
          val={[{ id: "projectmenu_filtro_da", value: dateda }]}
        ></InputData>
        <InputData
          label="a"
          id="projectmenu_filtro_a"
          val={[{ id: "projectmenu_filtro_a", value: datea }]}
        ></InputData>
      </FrameInRow>
      <FrameInRow width={[30, 30, 30]}>
        <Button
          onClick={() => {
            getgiorno(1);
          }}
        >
          Domani
        </Button>
        <Button
          onClick={() => {
            getgiorno(0);
          }}
        >
          Oggi
        </Button>
        <Button
          onClick={() => {
            getgiorno(-1);
          }}
        >
          Ieri
        </Button>
      </FrameInRow>
      <FrameInRow width={[30, 30, 30]}>
        <Button
          onClick={() => {
            getmese(1);
          }}
        >
          Prossimo Mese
        </Button>
        <Button
          onClick={() => {
            getmese(0);
          }}
        >
          Questo Mese
        </Button>
        <Button
          onClick={() => {
            getmese(-1);
          }}
        >
          Mese Scorso
        </Button>
      </FrameInRow>
      <FrameInRow width={[30, 30, 30]}>
        <Button
          onClick={() => {
            getanno(1);
          }}
        >
          Prossimo Anno
        </Button>
        <Button
          onClick={() => {
            getanno(0);
          }}
        >
          Quest'Anno
        </Button>
        <Button
          onClick={() => {
            getanno(-1);
          }}
        >
          Anno Scorso
        </Button>
      </FrameInRow>
    </Frame>
  );
};
export default FiltroTemporale;
