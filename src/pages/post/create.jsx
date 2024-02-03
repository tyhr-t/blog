import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import PostField from "@/web/components/ui/PostField"
import apiClient from "@/web/services/apiClient"
import { Formik } from "formik"
export const getServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie
  const data = await apiClient("/postCategories", {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      categories: data.result,
    },
  }
}
const create = ({ categories }) => {
  const initialValues = {
    title: "",
    content: "",
    isPublic: true,
  }
  const handleSubmit = async (values) => {
    await axios.post("http://localhost:3000/api/posts", values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <h1 className="text-2xl text-black"> Write a title ⬇️</h1>
        <FormField name="title" placeholder="Enter a title" />
        <h1 className="text-2xl text-black"> Write a content ⬇️</h1>
        <PostField name="content" placeholder="Enter a content" />
        <h1 className="text-2xl text-black">Is public ? ⬇️</h1>
        <FormField name="isPublic" type="checkbox" />
        <button
          type="submit"
          className="px-3 py-2 bg-slate-600 active:animate-bounce  hover:bg-green-200 text-xl text-green-600"
        >
          Save ✅
        </button>
        <button className="px-3 py-2 bg-slate-600 active:animate-bounce  hover:bg-red-200 text-xl text-red-400">
          reset 🔄
        </button>
      </Form>
    </Formik>
  )
}

export default create
