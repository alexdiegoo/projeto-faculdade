import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-5/6 mx-auto p-2">
      <Outlet />
    </div>
  );
}

export default App;
