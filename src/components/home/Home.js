import { useState, useEffect } from "react";
import Gateway from "../../route/Gateway";


function Home() {

    const [biz, setBiz] = useState({home:{signinOnce:false},admin:{},contact:{}});
  
    return (
      <Gateway biz={biz} setBiz={setBiz} />
    );
  
}
  
export default Home;