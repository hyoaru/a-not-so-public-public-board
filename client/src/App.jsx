import { Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Base from "./Base";
import Admin from "./pages/Admin";
import Home from "./pages/Home/Home";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Base />}>
                    <Route index element={<Home />} />
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
