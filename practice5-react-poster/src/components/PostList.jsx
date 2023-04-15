import Post from "./Post"
import NewPost from "./NewPost";
import Modal from "./Modal";
import classes from "./PostList.module.css"

function PostList() {
  return (
    <>
      <Modal>
        <NewPost />
      </Modal>
      <ul className={classes.posts}>
        <Post author="Emre" body="Such a good day!" />
        <Post author="John" body="I love Jquery! And I am a dinosaur. :D" />
      </ul>
    </>
  )
}

export default PostList;