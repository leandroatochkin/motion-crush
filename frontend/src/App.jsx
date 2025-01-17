import React, { useEffect, useState } from "react";
import {Route, Routes} from 'react-router-dom';
import Main from "./views/main/Main";
import Login from "./views/login/Login";


const App = () => {


  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App;
