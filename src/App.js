import Home from './components/home/Home';
//import { AuthProvider } from './iam/context/AuthProvider';
import { AppContextProvider } from './state/AppContextProvider';
import { useState } from 'react';
import Test from './test/Test';

function App() {
  
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
    // <Test />
  );

}

export default App;