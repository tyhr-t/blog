import { ForbiddenError } from "@/api/errors"
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
    const { payload } = jsonwebtoken.verify(
      sessionToken,
      config.security.jwt.secret,
    )
    const { id } = payload
    const user = await UserModel.query().findById(id)

    ctx.session = user

    await next()
  } catch (error) {
    console.log("error : ", error)
    throw new ForbiddenError()
  }
}

export default auth
