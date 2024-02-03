import { number, object, string } from "yup"

const validationSchema = object({
  api: object({
    baseUrl: string().required(),
  }).noUnknown(),
  ui: object({
    itemsPerPage: number().max(15).required(),
  }),
  security: object({
    session: object({
      storageKey: string().required(),
    }),
  }),
}).noUnknown()
const data = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API__BASE_URL,
  },
  ui: {
    itemsPerPage: 5,
  },
  security: {
    session: {
      storageKey: "sessionToken",
    },
  },
}
const config = (() =>
  validationSchema.validateSync(data, {
    stripUnknown: true,
    abortEarly: false,
  }))()

export default config
