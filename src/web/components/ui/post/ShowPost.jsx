import WriteCommentSection from "@/web/components/ui/comment/WriteCommentSection"
import axios from "axios"
import Router from "next/router"
export const getServerSideProps = async ({ params }) => {
  const postID = params.id
  const post = await axios.get(`http://localhost:3000/api/posts/${postID}`)

  return {
    props: {
      post: post.data.result,
      postID,
    },
  }
}
const ShowPost = ({ post }) => (
  <div>
    <h1>{post.title}</h1>
    <p>{post.content}</p>
    <p>{post.createdAt}</p>
    <p> current visite : {post.visits}</p>

    <button
      className="border border-gray-300 rounded p-2"
      onClick={() => {
        Router.push(`/editpost/${post.id}`)
      }}
    >
      edit that post ?{" "}
    </button>
    <WriteCommentSection postId={post.id} />
  </div>
)

export default ShowPost
