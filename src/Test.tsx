import { useEffect } from "react";
import { io } from "socket.io-client";

function Test() {
  useEffect(() => {
    const socket = io("https://gameproject-tnpvp.kinsta.app/")
    socket.connect()
  },[])


  return (
    <div>
        TEST!
    </div>
  );
}

export default Test;
