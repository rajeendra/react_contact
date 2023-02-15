import Gateway from './route/Gateway';
import { useState } from 'react';

const TestFun = (arg1, arg2) => {
  
  console.log('Test function started ........................');
  
  const [value, setValue] = useState('val99');

  const attributeObj = {
    value1 : 'value 1',
    onChange: (e) => setValue(e.target.value),
    value2 : 'value 2',
    value3 : 'value 3'
  }

  const obj = {...attributeObj}

  console.log(obj.value3 );
  console.log({...attributeObj}.value2 );
  
  console.log('........................... Test function ended');

}

function App() {
  
  // TestFun();
  var timestamp = new Date().getTime();

  return (
    <Gateway />
  );

}

export default App;