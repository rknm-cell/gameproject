import { Outlet } from "react-router";


function App() {
  

  return (
   <div className="text-black flex flex-col justify-center">
    <Outlet />
    </div>
  );
}

export default App;
