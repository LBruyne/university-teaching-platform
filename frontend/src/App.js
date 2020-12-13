import { BrowserRouter } from 'react-router-dom';

import AppRouter from "./router/router";
import HeaderComponent from "./components/Header/HeaderComponent";

/**
 *  入口组件
 */
function App() {
  return (
      <BrowserRouter>
          <HeaderComponent/>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
