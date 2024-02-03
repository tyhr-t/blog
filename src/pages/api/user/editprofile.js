import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import {
  optionalEmailValidator,
  optionalPasswordValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    auth,
    getValidateRole(["admin", "user", "author"]),
    async ({ models: { UserModel }, session, res }) => {
      const user = await UserModel.query().findById(session.id)
      res.send({
        email: user.email,
        role: user.role,
        id: user.id,
        PASSWORD: user.passwordHash, // A RETIRER
      })
    },
  ],
  PATCH: [
    auth,
    validate({
      body: {
        email: optionalEmailValidator,
        password: optionalPasswordValidator,
        oldPassword: optionalPasswordValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        body: { email, password, oldPassword },
      },
      session,
      res,
    }) => {
      if (!email && !password && !oldPassword) {
        // Vérifier que l'email OU le password/oldPassword est renseigné
        throw new Error("Bad request - No field provided")
      }

      if (email && password && oldPassword) {
        throw new Error("Bad request - Can modify only one field at a time")
      }

      if (email) {
        // On change le mail
        await UserModel.query().findById(session.id).patch({ email })
      }

      if (password && oldPassword) {
        const [hash] = await UserModel.hashPassword(
          oldPassword,
          session.passwordSalt,
        )
        if (hash !== session.passwordHash) {
          throw new Error("Unauthorized")
        }

        const [passwordHash, passwordSalt] =
          await UserModel.hashPassword(password)

        await UserModel.query().findById(session.id).patch({
          passwordHash,
          passwordSalt,
        })
      }

      res.send({})
    },
  ],
})

export default handle
