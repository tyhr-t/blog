import { ForbiddenError } from "@/api/errors"
import config from "@/config"
import jsonwebtoken from "jsonwebtoken"

const auth = async (ctx) => {
  const {
    models: { UserModel },
    req: {
      cookies: { [config.security.jwt.cookieName]: sessionToken },
    },
    next,
  } = ctx

  try {
    const { payload } = jsonwebtoken.verify(
      sessionToken,
      config.security.jwt.secret,
    )
    const { id } = payload
    const user = await UserModel.query().findById(id)

    ctx.session = user

    await next()
  } catch (error) {
    throw new ForbiddenError()
  }
}

export default auth
