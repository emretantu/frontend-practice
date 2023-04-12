import Post from "./Post"

function PostList() {
  return (
    <ul>
      <Post author="Emre" body="Such a good day!" />
      <Post author="John" body="I love Jquery! And I am a dinosaur. :D" />
    </ul>
  )
}

export default PostList;