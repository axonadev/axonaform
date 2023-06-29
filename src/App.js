import Login from "./lib/components/Login/Login";

function App() {
  return (
    <Login
      urlApi="http://192.168.2.159:8811/api/axo_login/"
      onSubmit={() => {
        console.log("aa");
      }}
    />
  );
}

export default App;
