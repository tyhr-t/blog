import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getvalidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import { idValidator, patchUserValidator } from "@/utils/validators"

const handle = mw({
  GET: [
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
  PATCH: [
    auth,
    getvalidateRole(["admin"]),
    validate({
      query: {
        userId: idValidator,
      },
      body: patchUserValidator,
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
        body: { email },
      },
      res,
    }) => {
      const user = await UserModel.query()
        .patchAndFetchById(userId, {
          email,
        })
        .throwIfNotFound()
      res.send(user)
    },
  ],
})

export default handle
