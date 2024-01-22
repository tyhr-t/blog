import axios from "axios"
import Router from "next/router"
export const getServerSideProps = async ({ params }) => {
  const blogID = params.id
  const blog = await axios.get(`http://localhost:3000/api/blogs/${blogID}`)

  return {
    props: {
      blog: blog.data.result,
      blogID,
    },
  }
}
const ShowBlog = ({ blog }) => (
  <div>
    <h1>{blog.title}</h1>
    <p>{blog.content}</p>
    <p>{blog.createdAt}</p>
    <button
      className="border border-gray-300 rounded p-2"
      onClick={() => {
        Router.push(`/editpost/${blog.id}`)
      }}
    >
      edit that post ?{" "}
    </button>
    <textarea placeholder="enter a comment" />
  </div>
)

export default ShowBlog
