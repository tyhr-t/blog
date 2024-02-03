import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ params, req }) => {
  const postID = params.postId
  const { cookie } = req.headers
  const data = await apiClient(`/post/${postID}`, {
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

const ShowPost = ({ initialData }) => {
  const { query } = useRouter()

  const {
    isFetching,
    data: { post, comments },
    refetch,
  } = useQuery({
    queryKey: ["post", query.postId],
    queryFn: () => apiClient(`/post/${query.postId}`),
    initialData,
    enabled: false,
  })

  const { mutateAsync: postComment } = useMutation({
    mutationFn: ({ postId, content }) =>
      apiClient.post(`/comments`, {
        postId,
        content,
      }),
  })

  const handleSubmit = async (values, { resetForm }) => {
    await postComment({ postId: post.id, content: values.content })
    await refetch()
    resetForm()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg mb-4">{post.content}</p>
      <p className="text-gray-500 mb-4">{post.createdAt}</p>
      <p className="text-gray-500 mb-4">current visit : {post.visits}</p>
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
          Router.push(`/editpost/${post.id}`)
        }}
      >
        edit that post ?
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">List of Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-4 mb-4">
          <p className="text-blue-500 font-bold">{comment.userId.email}</p>
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-gray-500">{comment.createdAt}</p>
        </div>
      ))}
    </div>
  )
}

export default ShowPost
