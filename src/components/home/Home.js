import { useState, useEffect } from "react";
import Gateway from "../../route/Gateway";


function Home() {

    const [biz, setBiz] = useState({admin:{},contact:{}});
    const [app, setApp] = useState({});
  
    return (
      <Gateway biz={biz} setBiz={setBiz} />
    );
  
}
  
export default Home;