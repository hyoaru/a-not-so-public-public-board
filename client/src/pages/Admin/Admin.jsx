import { Outlet } from "react-router"
import { useRef, useState, useEffect } from "react";

// App imports
import Post from "./components/Post";
import SelectedPost from "./components/SelectedPost";

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)
    const [resourceType, setResourceType] = useState('all')
    const [isToggleArchiveOnClick, setIsToggleArchiveOnClick] = useState(false);
    const [posts, setPosts] = useState([]);

    const archiveOnClickToggleRef = useRef(null);
    const tabsRef = useRef(null);
    const authenticationInputRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            fetch(`${import.meta.env.VITE_API_URL}/public_post/${resourceType}`)
                .then(data => data.json())
                .then(json => setPosts(json['public_posts']))
        }, 100)
    }, [resourceType, selectedPost])

    function handlePostOnClick(post) {
        if (isToggleArchiveOnClick) {
            if (post['is_archived']) {
                const formData = new FormData();
                formData.append('id', post['id'])
                fetch(`${import.meta.env.VITE_API_URL}/public_post/unarchive`, {
                    method: 'PUT',
                    body: formData
                })
            } else {
                const formData = new FormData();
                formData.append('id', post['id'])
                fetch(`${import.meta.env.VITE_API_URL}/public_post/archive`, {
                    method: 'PUT',
                    body: formData
                })
            }
        }

        setSelectedPost(post)
    }

    function handleArchiveOnClickToggleOnChange() {
        setIsToggleArchiveOnClick(archiveOnClickToggleRef.current.checked)
    }

    function handleTabOnClick(e) {
        Array.from(tabsRef.current.children).forEach((tab) => {
            tab.classList.remove('tab-active')
        })

        e.target.classList.add('tab-active')
        setResourceType(e.target.getAttribute('value'))
    }

    function handleAuthenticationButtonOnClick() {
        const userInput = authenticationInputRef.current.value.trim();
        if (userInput == import.meta.env.VITE_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    {isToggleArchiveOnClick === false && (
                        <SelectedPost
                            selectedPost={selectedPost}
                            onChangeHandler={() => { setSelectedPost(null) }}
                        />
                    )}

                    <div ref={tabsRef} className="tabs mb-6">
                        <a className="tab tab-active" value="all" onClick={(e) => { handleTabOnClick(e) }}>All</a>
                        <a className="tab" value="archived" onClick={(e) => { handleTabOnClick(e) }}>Archived</a>
                        <a className="tab" value="not_archived" onClick={(e) => { handleTabOnClick(e) }}>Not archived</a>
                        <a className="tab" value="decrypted" onClick={(e) => { handleTabOnClick(e) }}>Decrypted</a>
                        <a className="tab me-auto" value="not_decrypted" onClick={(e) => { handleTabOnClick(e) }}>Not decrypted</a>
                        <div className="tab">
                            <label className="me-3">Toggle archive on click</label>
                            <input
                                ref={archiveOnClickToggleRef}
                                onChange={handleArchiveOnClickToggleOnChange}
                                type="checkbox"
                                className="toggle toggle-primary toggle-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center">
                        {posts && posts.map((post, index) => (
                            <Post
                                key={post["id"]}
                                index={index}
                                author={post["author"]}
                                creationDate={post["creation_date"]}
                                cipher={post["cipher"]}
                                message={post["message"]}
                                isDecrypted={post["is_decrypted"]}
                                onClickHandler={() => {
                                    handlePostOnClick(post);
                                }}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-8 mx-auto">
                        <div className="prose mx-auto mb-4">
                            <h3 className="text-center font-bold">Enter admin code</h3>
                        </div>
                        <div className="flex justify-center">
                            <div className="form-control">
                                <div className="input-group input-group-md">
                                    <input ref={authenticationInputRef} type="password" size={40} placeholder="Type here" className="input input-bordered input-md w-full" />
                                    <button className="btn btn-md" onClick={handleAuthenticationButtonOnClick}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default Admin