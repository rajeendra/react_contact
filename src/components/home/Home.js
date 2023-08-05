import { useState, useEffect } from "react";
import Gateway from "../../route/Gateway";


function Home() {
    // Login come after this, 
    // so values here would not get reset with this for each login 
    //
    // Note: This way is not a good practice to keep state date, .. 
    // ..Insterd use context to share data across components  
    const [biz, setBiz] = useState({
      home:{signinOnce:false, appCount:0, rate:0, responseOne:"", responseTwo:""},
      admin:{},
      contact:{},
      album:{}
    });

    return (
      <Gateway biz={biz} setBiz={setBiz} />
    );
  
}
  
export default Home;