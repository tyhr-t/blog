import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { Formik } from "formik"

const WriteCommentSection = ({ handleSubmiting, initialValues }) => (
  <Formik onSubmit={handleSubmiting} initialValues={initialValues}>
    <Form>
      <FormField name="comment" label="Comment" />
      <button
        className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        type="submit"
      >
        Enregistrer le commentaire
      </button>
    </Form>
  </Formik>
)
export default WriteCommentSection
