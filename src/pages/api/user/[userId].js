import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getvalidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import { idValidator, patchUserValidator } from "@/utils/validators"

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
        query: { userId, blogId },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      try {
        if (blogId === userId) {
          res.send(user)
        } else {
          res.send("erreur a mettre a partir des fichiers du prof")
        }
      } catch (error) {
        console.log(error)
      }

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
        body: { role, email },
      },
      res,
    }) => {
      const user = await UserModel.query()
        .patchAndFetchById(userId, {
          role,
          email,
        })
        .throwIfNotFound()
      res.send(user)
    },
  ],
})

export default handle
