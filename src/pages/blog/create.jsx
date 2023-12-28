import { Formik } from "formik"
import { object } from "yup"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import axios from "axios"

const initialValues = {
  title: "",
  content: "",
}
const validationSchema = object({
  title: object().required().label("Title"),
  content: object().required().label("Content"),
})
const create = () => {
  const handleSubmit = async (values) => {
    await axios.post("http://localhost:3000/api/blog", values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" placeholder="Enter a title" />
        <FormField
          name="content"
          placeholder="Enter some content for your blog post"
        />
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

export default create
