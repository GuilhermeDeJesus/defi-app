import { Header, Main } from "./components";

const style = {
    wrapper: `h-screen max-h-screen h-min-screen w-screen`
}

const App = () => (
  <div className={style.wrapper}>
    <Header />
    <Main />
  </div> 
)

export default App;
