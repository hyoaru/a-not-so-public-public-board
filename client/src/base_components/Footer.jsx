import React from "react";

function Footer() {
    return (
        <>
            <div className="container mx-auto">
                <div className="flex">
                    <small className="mx-auto opacity-40">
                        © 2023 A Not-So-Public Public Board. A Course Requirement in Algorithms and Complexity 101. {" "}
                        <a className="underline decoration-solid" href="https://github.com/hyoaru">Hyoaru</a>
                        . All Rights Reserved.
                    </small>
                </div>
            </div>
        </>
    );
}

export default Footer;
