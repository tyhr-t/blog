import { faker } from "@faker-js/faker"

export const seed = async (db) => {
  await db("users").delete()
  await db("users").insert(
    [...Array(5)].map(() => ({
      email: faker.internet.email(),
      passwordHash: "alskdjalsdkjasdlkj",
      passwordSalt: "alskdjalsdkjasdlkj",
    })),
  )
}
