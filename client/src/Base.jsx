import React from "react";
import Header from "./base_components/Header";
import Footer from "./base_components/Footer";
import { Outlet } from "react-router-dom";

function Base() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-6 mt-4">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default Base;
