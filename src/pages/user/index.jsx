import Button from "@/web/components/ui/Button"
import axios from "axios"
export const getServerSideProps = async ({ req }) => {
  const { cookie } = req.headers
  const user = await axios.get("http://localhost:3000/api/users", {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      user: user.data.result,
    },
  }
}
const index = ({ user }) =>
  user.map((item) => (
    <div key={item.id} className="relative">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border">Email</th>
            <th className="border">Password</th>
            <th className="border">Role</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.id}>
              <td className="border">{user.email}</td>
              <td className="border">{user.password}</td>
              <td className="border">{user.role}</td>
              <td className="border">
                <Button>Edit</Button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))

export default index
