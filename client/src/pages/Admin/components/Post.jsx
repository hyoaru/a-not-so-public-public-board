import { motion } from "framer-motion";
import { useState } from "react";

// App imports
import formatDateTime from "../utilities";

function Post(props) {
    const [isHovered, setIsHovered] = useState(false)

    function handleOnClick(e) {
        e.preventDefault();
        props.onClickHandler();
    }


    return (
        <>
            <motion.a
                href=""
                className="mx-3 mb-6"
                onClick={handleOnClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { delay: 0.2 * props.index, duration: 1 } }}
                onHoverStart={() => {setIsHovered(true)}}
                onHoverEnd={() => {setIsHovered(false)}}
                exit={{ opacity: 0 }}
            >
                <div className={`bg-base-200 p-6 rounded-lg prose hover:border hover:border-primary hover:scale-105 ease-in-out duration-300`}>
                    <small className="font-bold block">
                        Author:{" "}
                        <span className="text-primary">{props.author}</span>
                    </small>
                    {props.isDecrypted ? (
                        <p className="font-regular mt-2 mb-2 leading-snug">
                            {props.message}
                        </p>
                    ) : (
                        <p className="font-regular mt-2 mb-2 leading-snug">
                            {props.cipher}
                        </p>
                    )}

                    <small className="font-bold ms-auto block">
                        Date written:{" "}
                        <span className="text-primary">
                            {formatDateTime(props.creationDate)}
                        </span>
                    </small>
                </div>
            </motion.a>
        </>
    );
}

export default Post;
