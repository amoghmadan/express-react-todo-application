import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Browser } from "./constants";
import { Home, Todo } from "./containers";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Browser.ROOT} element={<Home />}></Route>
        <Route path={Browser.TODO} element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
