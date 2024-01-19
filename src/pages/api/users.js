import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import { emailValidator, passwordValidator } from "@/utils/validators"
import { UnauthorizedError } from "@/api/errors"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator,
        password: passwordValidator,
      },
    }),

    async ({
      input: {
        body: { email, password },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insertAndFetch({
        email,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],

  PATCH: [
    auth,
    validate({
      body: {
        email: emailValidator,
        password: passwordValidator,
        oldPassword: passwordValidator,
      },
    }),
    async ({
      input: {
        body: { email, password, oldPassword },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (!user) {
        res.send({ result: false })

        return
      }

      /* On vérifie que le old password est bien le password actuel */
      const [hash] = await UserModel.hashPassword(
        oldPassword,
        user.passwordSalt,
      )

      if (hash !== user.passwordHash) {
        throw new UnauthorizedError()
      }

      /* On hash le nouveau password et on l'assigne à l'utilisateur */
      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().findOne({ email }).patch({
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],
  GET: [
    auth,
    getValidateRole(["admin"]),
    async ({ models: { UserModel }, res }) => {
      const users = await UserModel.query()

      res.send({ result: users })
    },
  ],
})

export default handle
