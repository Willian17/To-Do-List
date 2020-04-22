import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import React from 'react';
import './App.css';

import Header from './components/Header'
import Main from './components/Main'

function App() {
  return (
    <div className="App">
     < Header />
     < Main />
    </div>
  );
}

export default App;
