import { Link } from "react-router-dom";
import React, { useRef } from "react";

function CreatePost() {
    let modalRef = useRef(null)
    let authorRef = useRef('')
    let keyRef = useRef('')
    let messageRef = useRef('')

    function handleButtonClick() {
        if (keyRef.current.value !== '' && messageRef.current.value !== '') {
            const formData = new FormData();
            formData.append('author', authorRef.current.value)
            formData.append('key', keyRef.current.value)
            formData.append('message', messageRef.current.value)

            fetch(`${import.meta.env.VITE_API_URL}/public_post/encrypt`, {
                method: 'PUT',
                body: formData,
            })
            .then(data => data.json())
            .then(json => {
                window.location.reload();
            })
        }
    }

    function handleButtonCancelOnClick(){
        modalRef.current.classList.remove('modal-open')
    }

    return (
        <>
            <input type="checkbox" id="createPost" className="modal-toggle" />
            <label htmlFor="createPost" className="modal cursor-pointer" id="createPostModal" ref={modalRef}>
                <div className="modal-box relative">
                    <h3 className="font-bold text-lg">Create a encrypted post</h3>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="form-control">
                            <input
                                ref={authorRef}
                                type="text"
                                placeholder="Name to display"
                                className="input input-md input-bordered w-full"
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <input
                                ref={keyRef}
                                type="text"
                                placeholder="Encryption key"
                                className="input input-md input-bordered w-full"
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <textarea
                                ref={messageRef}
                                className="textarea textarea-bordered"
                                placeholder="Message"
                                maxLength={300}
                                rows={6}
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-error" onClick={handleButtonCancelOnClick}>Cancel</button>
                        <Link to="/" className="btn" onClick={handleButtonClick}>
                            Post
                        </Link>
                    </div>
                </div>
            </label>
        </>
    );
}

export default CreatePost;
