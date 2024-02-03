import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Form, Formik } from "formik"

const emailFormInitialValues = {
  email: "",
}
const passwordFormInitialValues = {
  password: "",
  oldPassword: "",
}

export const getServerSideProps = async ({ req }) => {
  const { cookie } = req.headers
  const user = await apiClient(`/user/editprofile`, {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      initialData: user,
    },
  }
}
const EditProfile = ({ initialData }) => {
  const {
    data: { id, email, role },
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient(`/user/editprofile`),
    initialData,
    enabled: false,
  })
  const { mutateAsync: editProfile } = useMutation({
    mutationFn: (data) => apiClient.patch(`/user/editprofile`, data),
  })
  const handleSubmit = async (values, { resetForm }) => {
    await editProfile({ ...values, id })
    await refetch()
    resetForm()
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <p>Vous avez le rôle : {role}</p>
      <p>Votre email actuel est : {email}</p>

      <Formik initialValues={emailFormInitialValues} onSubmit={handleSubmit}>
        <Form>
          <h2 className="text-2xl font-bold">Change your email</h2>
          <FormField name="email" placeholder="Enter a  new email" />
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Formik>

      <Formik initialValues={passwordFormInitialValues} onSubmit={handleSubmit}>
        <Form>
          <h2 className="text-2xl font-bold">
            Confirm your old password first
          </h2>
          <FormField name="oldPassword" placeholder="Enter old password" />

          <h2 className="text-2xl font-bold">New password</h2>
          <FormField name="password" placeholder="Enter a new password" />

          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  )
}

export default EditProfile
