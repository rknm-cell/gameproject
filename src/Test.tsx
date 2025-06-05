import { useEffect } from "react";
import { io } from "socket.io-client";

function Test() {
  useEffect(() => {
    const socket = io("http://localhost:3000")
    socket.connect()
  },[])


  return (
    <div>
        TEST!
    </div>
  );
}

export default Test;
