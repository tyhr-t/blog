import { ForbiddenError } from "@/api/errors"

const getValidateRole = (roles) => {
  const validateRole = async (ctx) => {
    console.log(" ===> validateRole")
    const { next, session } = ctx

    if (roles.includes(session.role)) {
      console.log(" ===> role validated : ", session.role)
      await next()
    } else {
      throw new ForbiddenError("You dont have the require permission  ")
    }
  }

  return validateRole
}
export default getValidateRole
