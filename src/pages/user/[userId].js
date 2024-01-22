import axios from "axios"

export const getServerSideProps = async ({ params, req }) => {
  const { cookie } = req.headers
  const { userId } = params
  const user = await axios.get(`http://localhost:3000/api/user/${userId}`, {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      user: user.data,
      userId,
    },
  }
}
const ShowUser = ({ user }) => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
    <p className="text-lg mb-4">{user.email}</p>
    <p className="text-gray-500 mb-4">{user.createdAt}</p>
  </div>
)

export default ShowUser
