/* eslint-disable max-lines-per-function */
import DeleteButton from "@/web/components/ui/DeleteButton"
import { useRef, useState } from "react"

const UserAdministrationRow = ({
  handleSelectRole,
  handleClickDelete,
  handleSaveEmailButton,
  user,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)

  return (
    <tr>
      <td className="border">
        {!isEditing && <span>{user.email}</span>}
        {isEditing && (
          <>
            <input ref={inputRef} defaultValue={user.email} type="email" />
            <button
              onClick={async () => {
                await handleSaveEmailButton({
                  userId: user.id,
                  email: inputRef.current.value,
                })

                setIsEditing(false)
              }}
            >
              Save
            </button>
          </>
        )}

        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </td>

      <td className="border">
        <select
          defaultValue={user.role}
          onChange={(e) =>
            handleSelectRole({ userId: user.id, role: e.target.value })
          }
          className="border"
          name="role"
          id="role"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
          <option value="author">author</option>
          <option value="disabled">disabled</option>
        </select>
      </td>

      <td className="border">
        <DeleteButton handleClick={() => handleClickDelete(user.id)} />
      </td>
    </tr>
  )
}
export default UserAdministrationRow
