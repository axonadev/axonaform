import { CssStruct } from "axonaui";
import Login from "./lib/components/Login/Login";
import ProjectMenuForm from "./lib/components/ProjectMenuForm/ProjectMenuForm";

function App() {
  return (
    <>
      <CssStruct>
        <Login
          urlApi='http://192.168.2.159:8811/api/axo_login/'
          onSubmit={() => {
            console.log("aa");
          }}
        />
        {/* <ProjectMenuForm idItem={"filtro"} /> */}
      </CssStruct>
    </>
  );
}

export default App;
