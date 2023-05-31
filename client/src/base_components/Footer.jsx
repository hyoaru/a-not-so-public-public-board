import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="container mx-auto px-8">
                <div className="flex">
                    <small className="mx-auto opacity-40">
                        © 2023 
                        <Link to={"admin"} className="hover:text-primary"> A Not-So-Public Public Board. {" "}</Link>
                        A Course Requirement in Algorithms and Complexity 101. {" "}
                        <a className="underline decoration-solid" href="https://github.com/hyoaru">Hyoaru</a>
                        . All Rights Reserved.
                    </small>
                </div>
            </div>
        </>
    );
}

export default Footer;
