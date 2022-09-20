import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopPage from "./pages/TopPage";

const App = () => {
  return (
    <BrowserRouter basename="babylonjs">
      <Routes>
        <Route index element={<TopPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
