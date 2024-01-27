import Button from "@/web/components/ui/Button"
import Loader from "@/web/components/ui/Loader"
import UserAdministrationRow from "@/web/components/ui/UserAdministrationRow"
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
  const { mutateAsync: updateUserRole } = useMutation({
    mutationFn: ({ userId, role }) => {
      console.log("role in mutationFn", userId, role)

      return apiClient.patch(`/user/${userId}`, { role })
    },
  })
  const { mutateAsync: updateUserEmail } = useMutation({
    mutationFn: ({ userId, email }) => {
      console.log("email in mutationFn", userId, email)

      return apiClient.patch(`/user/${userId}`, { email })
    },
  })
  const handleSaveEmailButton = async ({ userId, email }) => {
    console.log("email in handleSaveEmailButton", userId, email)
    await updateUserEmail({ userId, email })
    await refetch()
  }
  const handleSelectRole = async ({ userId, role }) => {
    console.log("role in handleSelectRole", userId, role)
    await updateUserRole({ userId, role })
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
            <UserAdministrationRow
              key={user.id}
              handleSelectRole={handleSelectRole}
              handleClickDelete={handleClickDelete}
              user={user}
              handleSaveEmailButton={handleSaveEmailButton}
            />
          ))}
        </tbody>
      </table>

      <Button onClick={async () => await refetch()}>Refresh</Button>
    </div>
  )
}

export default UserListPage
