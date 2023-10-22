import React, {useEffect, useState} from "react";
import {auth, db} from "../firebase"
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import TweetInput from "./TweetInput";
import styles from "./Feed.module.css"
import Post from "./Post";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Feed: React.FC = () => {
    const [posts, setPosts] = useState([
        {
            id: "",
            avatar: "",
            image: "",
            text: "",
            timestamp: null,
            username: "",
        },
    ]);
    useEffect(() => {
        console.log('Feed useEffect invoked!')
        const unSub = db
            .collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        avatar: doc.data().avatar,
                        image: doc.data().image,
                        text: doc.data().text,
                        timestamp: doc.data().timestamp,
                        username: doc.data().username,
                    }))
                )
            );
        return () => {
            unSub();
        };
    }, []);

    return (
        <div className={styles.feed}>
            <AppBar
                component='nav'
                className={styles.feed_header}
            >
                <Toolbar>
                    <Typography variant={'h3'}>X デモアプリ</Typography>
                    <IconButton
                        className={styles.feed_header_logout}
                        onClick={async () => {
                            await auth.signOut();
                        }}
                    >
                        <ExitToAppIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <TweetInput/>
            <div className={styles.feed_posts}>
                {posts[0]?.id && (
                    <>
                        {posts.map(post => (
                            <Post
                                key={post.id}
                                postId={post.id}
                                avatar={post.avatar}
                                image={post.image}
                                text={post.text}
                                timestamp={post.timestamp}
                                username={post.username}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Feed