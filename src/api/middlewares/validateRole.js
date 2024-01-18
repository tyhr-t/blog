import { ForbiddenError } from "@/api/errors"
const getValidateRole = (roles) => {
  const validateRole = async (ctx) => {
    const { next, session } = ctx

    if (roles.includes(session.role)) {
      await next()
    } else {
      throw new ForbiddenError("You dont have the require permission :( ")
    }
  }

  return validateRole
}
export default getValidateRole
