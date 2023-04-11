import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Registrar from "../pages/registrar";


const RouterPrincipal = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/registrar" element={<Registrar/>}/>
            </Routes>   
        </BrowserRouter>
    );
};

export default RouterPrincipal;