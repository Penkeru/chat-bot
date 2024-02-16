import React from 'react';
import './App.css';
import { AppRouter } from "./router/app-router";

function App() {
  const [userName, setUserName] = React.useState('');
  return (
    <div className="App">
      <AppRouter {...{userName, setUserName}}/>
    </div>
  );
}

export default App;
