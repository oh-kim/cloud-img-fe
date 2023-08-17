import HomeLayout from "./layout";
import Header from "./components/header";
import Main from "./components/main/main";

function App() {
  return (
    <HomeLayout>
      <Header></Header>
      <Main />
    </HomeLayout>
  );
}

export default App;
