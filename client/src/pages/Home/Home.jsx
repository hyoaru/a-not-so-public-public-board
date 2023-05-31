import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// App imports
import figureNoResultsFound from "../../assets/svg/undraw_void.svg"
import Post from "./components/Post";
import SelectedPost from "./components/SelectedPost";

function Home() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_POSTS_NOT_ARCHIVED)
            .then((response) => response.json())
            .then((json) => setPosts(json["public_posts"]));

    }, []);

    function handlepostOnClick(post) {
        setSelectedPost(post);
    }

    function handleWriteEncryptedPostOnClick(e) {
        e.preventDefault();
        document.querySelector('#createPostModal').classList.toggle('modal-open');
    }

    return (
        <>
            <SelectedPost
                selectedPost={selectedPost}
                onChangeHandler={() => { setSelectedPost(null) }}
            />

            <div className="flex flex-wrap justify-center items-center">
                {posts.length == 0 && (
                    <>
                        <motion.div 
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{delay: 2}}
                            className="bg-base-200 px-40 py-20 mt-4 mb-8 rounded-lg"
                        >
                            <div className="prose text-center">
                                <h1 className="m-0 mb-2">No posts yet</h1>
                                <label htmlFor="createPost">
                                    <a href="" onClick={(e) => { handleWriteEncryptedPostOnClick(e) }} className="text-primary text-sm underline">Write an encrypted post</a>
                                </label>
                            </div>
                        </motion.div>
                    </>
                )}

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
                            handlepostOnClick(post);
                        }}
                    />
                ))}
            </div>

            {/* <div style={{ height: "20em" }}></div> */}
        </>
    );
}

export default Home;
