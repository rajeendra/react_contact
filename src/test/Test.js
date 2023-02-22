import { useState } from 'react';

function Test() {
  
  const timestamp = new Date().getTime();

  const [value, setValue] = useState('val99');
  
  const attributeObj = {
    value1 : 'value 1',
    onChange: (e) => setValue(e.target.value),
    value2 : 'value 2',
    value3 : 'value 3'
  }

  const number =    {
    "id": "1",
    "number": "+9411112222",
    "type": "0omx"
    //"type": "0o"
    //"type": "0oeweew"
    //"type": "0aaa"
    //"type": ""
    //"type": null
  }

  const numberInOp = number?.type?.length==4 ?number.type: '0omx'

  const obj = {...attributeObj}

  const testFun = (arg1, arg2) => {
  
    console.log('............... Test start ...............');
    
    //console.log(obj.value3 );
    //console.log({...attributeObj}.value2 );

    //console.log(number.type ? number.type: 'no type')
    //console.log(number?.type?.length==4 ?number.type: 'wrong length')
    console.log(
        numberInOp.substring(1,2)=='o'
        ?'personal'
        : numberInOp.substring(1,2)=='w'
        ?'official'
        :'personal' 
     )
    //console.log(numberInOp.substring(2,3) )
    console.log(
        numberInOp.substring(2,3)=='m'
        ?'mob'
        : numberInOp.substring(2,3)=='l'
        ?'fixed'
        :'mob' 
     )    
    
    console.log('............... Test end ...............');
  
  }
  

  return (
    <>
    <h1>test..</h1>
    <button onClick={testFun}>button</button>
    </>
  );

}

export default Test;