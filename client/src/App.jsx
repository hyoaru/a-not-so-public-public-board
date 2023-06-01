import { Route, Routes, Link, BrowserRouter, HashRouter } from "react-router-dom";
import { useState } from "react";

// App imports
import Base from "./Base";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";

function App() {
    return (
        <>
            <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
                <Routes>
                    <Route exact path="/" element={<Base />}>
                        <Route index element={<Home />} />
                        <Route path="admin" element={<Admin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
