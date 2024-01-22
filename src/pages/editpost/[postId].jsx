import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

export const getServerSideProps = async ({ params, req }) => {
  const { cookie } = req.headers
  const { postId } = params
  const post = await axios.get(`http://localhost:3000/api/blog/${postId}`, {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      initialData: post.data,
      postId,
    },
  }
}
const EditPost = ({ initialData, postId }) => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useQuery({
    queryKey: ["post"],
    queryFn: () => axios.get(`http://localhost:3000/api/blog/${postId}`),
    initialData,
    enabled: false,
  })

  useMutation({
    mutationFn: (blog) =>
      axios.patch(`/api/blog/${blog.id}`, {
        title: blog.title,
        content: blog.content,
      }),
  })

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <input
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Enter your old title"
      />
      <textarea
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Enter your new title"
      />
      <p className="mb-4"> Your last body are: {initialData.content}</p>
      <input
        className="border border-gray-300 rounded p-2"
        placeholder="Enter your new body"
      />
    </div>
  )
}

export default EditPost
