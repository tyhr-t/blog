import axios from "axios"
import Router from "next/router"
export const getServerSideProps = async ({ params, req }) => {
  const blogID = params.blogId
  const { cookie } = req.headers
  const blog = await axios.get(`http://localhost:3000/api/blog/${blogID}`, {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      blog: blog.data,
      blogID,
    },
  }
}
const ShowBlog = ({ blog }) => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
    <p className="text-lg mb-4">{blog.content}</p>
    <p className="text-gray-500 mb-4">{blog.createdAt}</p>
    <textarea
      className="border border-gray-300 rounded p-2"
      placeholder="Enter a comment"
    />
    <button
      className="border border-gray-300 rounded p-2"
      onClick={() => {
        Router.push(`/editpost/${blog.id}`)
      }}
    >
      edit that post ?{" "}
    </button>
  </div>
)

export default ShowBlog
