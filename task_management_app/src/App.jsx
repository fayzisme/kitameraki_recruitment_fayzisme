import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Content from './components/Content';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Header/>
      <Sidebar/>
      <Content/>
      <Footer className='footer'/>
    </>
  )
}

export default App
