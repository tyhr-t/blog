import { boolean, number, string } from "yup"

export const emailValidatorBase = string().email()
export const emailValidator = emailValidatorBase.required()
export const optionalEmailValidator = emailValidatorBase.notRequired()

export const userPatchEmailValidatior = string().email().notRequired()
export const rolePatchValidator = string().notRequired()

export const passwordValidatorBase = string()
  .min(10)
  .matches(
    /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[^\p{L}\d)]).*$/gu,
    "Password must contain 1 upper & 1 lower letter, 1 digit and 1 spe. char.",
  )
export const passwordValidator = passwordValidatorBase.required()
export const optionalPasswordValidator = passwordValidatorBase.notRequired()

export const contentValidator = string().min(8).required()
export const statusValidator = boolean().required()
export const idValidator = number().integer().min(1).required()
export const pageValidator = number().integer().min(1).default(1).required()
export const titlePostValidator = string().required()
export const contentPostValidator = string().required()
export const roleValidator = string().required()
export const patchUserValidator = {
  role: rolePatchValidator,
  email: userPatchEmailValidatior,
}
export const contentCommentValidator = string().required()
export const isPublicValidator = boolean().required()
