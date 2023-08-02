import React from "react";
import { Button, InputData, Frame, FrameInRow } from "axonaui";
const FiltroTemporale = () => {
  return (
    <Frame label="Filtro Temporale">
      <FrameInRow width={[20, 20]}>
        <InputData label="da" id="projectmenu_filtro_da"></InputData>
        <InputData label="a" id="projectmenu_filtro_a"></InputData>
      </FrameInRow>
      <FrameInRow width={[20, 20, 20]}>
        <Button>Domani</Button>
        <Button>Oggi</Button>
        <Button>Ieri</Button>
      </FrameInRow>
      <FrameInRow width={[20, 20, 20]}>
        <Button>Prossimo Mese</Button>
        <Button>Questo Mese</Button>
        <Button>Mese Scorso</Button>
      </FrameInRow>
      <FrameInRow width={[20, 20, 20]}>
        <Button>Prossimo Anno</Button>
        <Button>Quest'Anno</Button>
        <Button>Anno Scorso</Button>
      </FrameInRow>
    </Frame>
  );
};
export default FiltroTemporale;
