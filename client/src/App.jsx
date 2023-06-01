import { Route, Routes, Link, BrowserRouter, HashRouter } from "react-router-dom";
import { useState } from "react";

// App imports
import Base from "./Base";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";

function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Base />}>
                        <Route index element={<Home />} />
                        <Route path="admin" element={<Admin />} />
                    </Route>
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
