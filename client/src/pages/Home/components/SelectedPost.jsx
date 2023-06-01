import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

// App imports
import formatDateTime from "../utilities";

function SelectedPost(props) {
    const [decryptedMessage, setDecryptedMessage] = useState(null);
    const [isCipherShown, setIsCipherShown] = useState(false);
    const keyInputRef = useRef("");

    // API response properties
    let selectedPostId = null;
    let selectedPostAuthor = null;
    let selectedPostKey = null;
    let selectedPostMessage = null;
    let selectedPostCipher = null;
    let selectedPostCreationDate = null;
    let selectedPostCreationDateFormatted = null;
    let selectedPostIsArchived = null;
    let selectedPostIsDecrypted = null;

    if (props.selectedPost) {
        selectedPostId = props.selectedPost["id"];
        selectedPostAuthor = props.selectedPost['author'];
        selectedPostKey = props.selectedPost['key'];
        selectedPostMessage = props.selectedPost['message'];
        selectedPostCipher = props.selectedPost['cipher'];
        selectedPostCreationDate = props.selectedPost['creation_date'];
        selectedPostCreationDateFormatted = formatDateTime(selectedPostCreationDate);
        selectedPostIsArchived = props.selectedPost['is_archived'];
        selectedPostIsDecrypted = props.selectedPost['is_decrypted'];
    }

    function handleKeyInputOnChange(e) {
        const formData = new FormData();
        var keyInput = e.target.value.trim();

        if (keyInput !== "") {
            formData.append("key", e.target.value.trim());
            formData.append("cipher", selectedPostCipher);

            fetch(`${import.meta.env.VITE_API_URL}/message/decrypt`, {
                method: "PUT",
                body: formData,
            })
                .then((response) => response.json())
                .then((json) => setDecryptedMessage(json["message"]));
        }
    }

    function handleDecryptButtonOnClick() {
        const formData = new FormData();
        var inputtedKeyValue = keyInputRef.current.value.trim();

        if (inputtedKeyValue == selectedPostKey) {
            formData.append("id", selectedPostId);
            formData.append("key", inputtedKeyValue);

            fetch(`${import.meta.env.VITE_API_URL}/public_post/decrypt`, {
                method: "PUT",
                body: formData,
            })
            .then(data => data.json())
            .then(json => {
                window.location.reload()
            })
        }

    }

    return (
        <>
            <AnimatePresence>
                {props.selectedPost && (
                    <motion.div>
                        <input
                            type="checkbox"
                            id="selectedPost"
                            className="modal-toggle"
                            onChange={props.onChangeHandler}
                        />
                        <label
                            htmlFor="selectedPost"
                            className="modal modal-open cursor-pointer"
                        >
                            <label className="modal-box relative prose" htmlFor="">
                                <h3 className="text-lg font-bold">Decrypt encrypted message</h3>

                                <small className="font-bold block">
                                    Author:{" "}
                                    <span className="text-primary">
                                        {selectedPostAuthor}
                                    </span>
                                </small>

                                <small className="font-bold block">
                                    Date written:{" "}
                                    <span className="text-primary">
                                        {selectedPostCreationDateFormatted}
                                    </span>
                                </small>

                                { }

                                {selectedPostIsDecrypted && isCipherShown ? (
                                    <button
                                        className="mt-2"
                                        onClick={() => {
                                            setIsCipherShown(!isCipherShown);
                                        }}
                                    >
                                        <small>Hide cipher</small>
                                    </button>

                                ) : selectedPostIsDecrypted && isCipherShown === false ? (
                                    <button
                                        className="mt-2"
                                        onClick={() => {
                                            setIsCipherShown(!isCipherShown);
                                        }}
                                    >
                                        <small>Show cipher</small>
                                    </button>

                                ) : (
                                    <></>
                                )}

                                {decryptedMessage ? (
                                    <p className="font-bold leading-snug mt-2 mb-2 ">
                                        {decryptedMessage}
                                    </p>

                                ) : selectedPostIsDecrypted && isCipherShown ? (
                                    <>
                                        <motion.div
                                            animate={{ opacity: 1 }}
                                            initial={{ opacity: 0 }}
                                        >
                                            <p className="font-bold leading-snug mt-0 mb-2 ">
                                                {selectedPostCipher}
                                            </p>
                                            <small className="font-bold block">
                                                Key:{" "}
                                                <span className="text-primary">
                                                    {selectedPostKey}
                                                </span>
                                            </small>
                                        </motion.div>
                                    </>

                                ) : selectedPostIsDecrypted && isCipherShown === false ? (
                                    <p className="font-bold leading-snug mt-0 mb-2 ">
                                        {selectedPostMessage}
                                    </p>
                                ) : (
                                    <p className="font-bold leading-snug mt-2 mb-2 ">
                                        {selectedPostCipher}
                                    </p>
                                )}

                                {selectedPostIsDecrypted === false && (
                                    <div className="form-control mt-5">
                                        <label className="input-group input-group-md">
                                            <span>Key</span>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="input input-bordered input-md w-full"
                                                onChange={handleKeyInputOnChange}
                                                ref={keyInputRef}
                                            />
                                            <Link to={"/"} className="btn" onClick={handleDecryptButtonOnClick}>
                                                Decrypt
                                            </Link>
                                        </label>
                                    </div>
                                )}
                                
                            </label>
                        </label>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default SelectedPost;
