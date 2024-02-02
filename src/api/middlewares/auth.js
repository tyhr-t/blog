import { UnauthorizedError } from "@/api/errors"
import config from "@/config"
import jsonwebtoken from "jsonwebtoken"

const auth = async (ctx) => {
  console.log("auth")
  const {
    models: { UserModel },
    req: {
      cookies: { [config.security.jwt.cookieName]: sessionToken },
    },
    next,
  } = ctx

  try {
    console.log("sessionToken : ", sessionToken)
    console.log("config.security.jwt.secret", config.security.jwt.secret)
    const { payload } = jsonwebtoken.verify(
      sessionToken,
      config.security.jwt.secret,
    )
    console.log("PAYLOAD DECRYPTED")
    const { id } = payload
    const user = await UserModel.query().findById(id)

    ctx.session = user

    await next()
  } catch (error) {
    console.log("error auth : ", error)
    throw new UnauthorizedError()
  }
}

export default auth
