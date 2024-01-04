import { Formik } from "formik"
import Form from "@/web/components/ui/Form"
import BlogField from "@/web/components/ui/BlogField"
import axios from "axios"
import FormField from "@/web/components/ui/FormField"
import SelectCategory from "@/web/components/ui/SelectCategory"
export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/blogCategories")

  return {
    props: {
      categories: data.result,
    },
  }
}
const initialValues = {
  title: "",
  content: "",
  id: 2,
  categoryId: 2,
}
const create = ({ categories }) => {
  const handleSubmit = async (values) => {
    await axios.post("http://localhost:3000/api/blogs", values)
  }

  console.log(categories)

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <BlogField name="content" placeholder="Enter a content" />
        <FormField name="title" placeholder="Enter a title" />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        >
          Submit
        </button>
        <h1 className="text-2xl">Select a category</h1>
        <SelectCategory categories={categories} />
      </Form>
    </Formik>
  )
}

export default create
