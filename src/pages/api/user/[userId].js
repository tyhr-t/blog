import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getvalidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import { idValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      res.send(user)
    },
  ],
  DELETE: [
    auth,
    getvalidateRole(["admin"]),
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      const user = await UserModel.query().deleteById(userId).throwIfNotFound()

      res.send(user)
    },
  ],
})

export default handle
