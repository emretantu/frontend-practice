import Post from "./Post"
import classes from "./PostList.module.css"

function PostList() {
  return (
    <ul className={classes.posts}>
      <Post author="Emre" body="Such a good day!" />
      <Post author="John" body="I love Jquery! And I am a dinosaur. :D" />
    </ul>
  )
}

export default PostList;