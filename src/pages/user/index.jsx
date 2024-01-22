import Button from "@/web/components/ui/Button"
import axios from "axios"
import Router from "next/router"
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
          {user.map((userr) => (
            <tr key={userr.id}>
              <td className="border">{userr.email}</td>
              <td className="border">{userr.password}</td>
              <td className="border">{userr.role}</td>
              <td className="border">
                <Button>show</Button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Delete
                </button>

                <button
                  className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={Router.push(`/user/${userr.id}`)}
                >
                  {" "}
                  Show user info{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))

export default index
