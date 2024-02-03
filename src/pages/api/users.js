import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import { emailValidator, passwordValidator } from "@/utils/validators"

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
