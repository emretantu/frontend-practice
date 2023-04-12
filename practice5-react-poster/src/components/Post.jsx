import classes from "./Post.module.css";

function Post(props) {
  return (
    <li className={classes.post}>
      <p className={classes.author}>{probs.author}</p>
      <p className={classes.text}>{probs.body}</p>
    </li>
  )
}

export default Post;