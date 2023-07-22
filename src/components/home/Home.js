import { useState, useEffect } from "react";
import Gateway from "../../route/Gateway";


function Home() {
    // Login come after this, 
    // so values here would not get reset with this for each login 
    const [biz, setBiz] = useState({
      home:{signinOnce:false, appCount:0, rate:0},
      admin:{},
      contact:{},
      album:{}
    });

    return (
      <Gateway biz={biz} setBiz={setBiz} />
    );
  
}
  
export default Home;