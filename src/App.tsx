import InputForm from "./components/InputForm";
import HomeLayout from "./layout";
import MapContainer from "./components/map/mapContainer";
import Header from "./components/header";

function App() {
  return (
    <HomeLayout>
      <Header></Header>
      {/* <생성된네이버객체컨텍스트> */}
      <MapContainer></MapContainer>
      <InputForm></InputForm>
      {/* </생성된네이버객체컨텍스트> */}
    </HomeLayout>
  );
}

export default App;
