import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ params, req }) => {
  const blogID = params.blogId
  const { cookie } = req.headers
  const data = await apiClient(`/blog/${blogID}`, {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      initialData: data,
    },
  }
}

const ShowBlog = ({ initialData }) => {
  const { query } = useRouter()

  const {
    isFetching,
    data: { blog, comments },
    refetch,
  } = useQuery({
    queryKey: ["blog", query.blogId],
    queryFn: () => apiClient(`/blog/${query.blogId}`),
    initialData,
    enabled: false,
  })

  const { mutateAsync: postComment } = useMutation({
    mutationFn: ({ blogId, content }) =>
      apiClient.post(`/comments`, {
        blogId,
        content,
      }),
  })

  const handleSubmit = async (values, { resetForm }) => {
    await postComment({ blogId: blog.id, content: values.content })
    await refetch()
    resetForm()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-lg mb-4">{blog.content}</p>
      <p className="text-gray-500 mb-4">{blog.createdAt}</p>
      <p className="text-gray-500 mb-4">current visit : {blog.visits}</p>
      <Formik onSubmit={handleSubmit} initialValues={{ content: "" }}>
        <Form>
          <FormField name="content" label="Comment" />

          <button
            className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
            type="submit"
          >
            Enregistrer le commentaire
          </button>
        </Form>
      </Formik>

      <button
        className="border border-gray-300 rounded p-2"
        onClick={() => {
          Router.push(`/editpost/${blog.id}`)
        }}
      >
        edit that post ?
      </button>

      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.userId.email}</p>
          <p>{comment.content}</p>
          <p>{comment.createdAt}</p>
        </div>
      ))}
    </div>
  )
}

export default ShowBlog
