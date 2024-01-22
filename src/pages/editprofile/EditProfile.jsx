import axios from "axios"

export const getServerSideProps = async ({ params, req }) => {
  const { cookie } = req.headers
  const userID = params.id
  const user = await axios.get(`http://localhost:3000/api/users/${userID}`, {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      user: user.data.result,
      userID,
    },
  }
}
const EditProfile = ({ user }) => (
  <div>
    <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
    <input
      className="border border-gray-300 rounded p-2"
      placeholder="enter your old password"
    />
    <input
      className="border border-gray-300 rounded p-2"
      placeholder="enter your new password"
    />
    <p> your last email are : {user.email} </p>
    <input
      className="border border-gray-300 rounded p-2"
      placeholder="enter your new email"
    />
  </div>
)

export default EditProfile
