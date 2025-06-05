import { Outlet } from "react-router";


function App() {
  

  return (
   <div className="text-black">
    Tic Tac Toe, baby
    <Outlet />
    </div>
  );
}

export default App;
