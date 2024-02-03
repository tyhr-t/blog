import CommentView from "@/web/components/ui/CommentView"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
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
  const router = useRouter()
  const { query } = router
  const {
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

          <SubmitButton>Enregistrer le commentaire</SubmitButton>
        </Form>
      </Formik>

      <button
        className="border border-gray-300 rounded p-2"
        onClick={() => router.push(`/editpost/${post.id}`)}
      >
        edit that post ?
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">List of Comments</h2>
      {comments.map((comment) => (
        <CommentView key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default ShowPost
