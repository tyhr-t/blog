import Button from "@/web/components/ui/Button"
import DeleteButton from "@/web/components/ui/DeleteButton"
import Loader from "@/web/components/ui/Loader"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
export const getServerSideProps = async ({ req }) => {
  const { cookie } = req.headers
  const data = await apiClient("/users", {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      initialData: data,
    },
  }
}
// eslint-disable-next-line max-lines-per-function
const UserListPage = ({ initialData }) => {
  const {
    isLoading,
    data: { result: users },
    refetch,
  } = useQuery({
    queryKey: ["users"],

    queryFn: () => apiClient("/users"),

    initialData,
    enabled: false,
  })
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: (userId) => apiClient.delete(`/user/${userId}`),
  })
  const { mutateAsync: updateUser } = useMutation({
    mutationFn: (userId, role) =>
      apiClient.patch(`/user/${userId}`, {
        role,
      }),
  })
  const handleSelectRole = async (id, role) => {
    await updateUser(id, role)
    await refetch()
  }
  const handleClickDelete = async (id) => {
    await deleteUser(id)
    await refetch()
  }

  return (
    <div className="relative">
      {isLoading && <Loader />}
      <table className="w-full">
        <thead>
          <tr>
            <th className="border">Email</th>
            <th className="border">Role</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="border">{user.email}</td>
              {/* <td className="border">{user.role}</td> */}

              <td className="border">
                <select
                  onChange={(e) => handleSelectRole(user.id, e.target.value)}
                  className="border"
                  name="role"
                  id="role"
                >
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                  <option value="author">author</option>
                  <option value="disabled">disabled</option>
                </select>
              </td>

              <td className="border">
                <DeleteButton handleClick={() => handleClickDelete(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={async () => await refetch()}>Refresh</Button>
    </div>
  )
}

export default UserListPage
