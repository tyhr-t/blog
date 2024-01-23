import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Formik } from "formik"



const initialValues = {
  title: "",
  content: "",
}

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

  const handleSubmit = async (values) => {
    await axios.patch(`/api/blog/${postId}`, {
      title: values.title,
      content: values.content,
    })
  }

  return (

    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <FormField name="title" placeholder="Enter a title" />
        <FormField name="content" placeholder="Enter a content" />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        >
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export default EditPost
