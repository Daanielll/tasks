import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./components/main/Home";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar></Sidebar>
        <Outlet />
      </div>
    </>
  );
}

export default App;
