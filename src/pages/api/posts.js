import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import {
  contentPostValidator,
  isPublicValidator,
  pageValidator,
  titlePostValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    auth,
    getValidateRole(["admin", "author", "user"]),
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({ res, models: { PostModel } }) => {
      const query = PostModel.query()
      const post = await query
        .clone()
        .where("isPublic", true)
        .orderBy("createdAt", "DESC")
      res.send({
        result: post,
      })
    },
  ],
  POST: [
    auth,
    getValidateRole(["admin", "author"]),
    validate({
      body: {
        content: contentPostValidator,
        title: titlePostValidator,
        isPublic: isPublicValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        body: { content, title, isPublic },
      },
      session: { id },
      res,
    }) => {
      const post = await PostModel.query().insertAndFetch({
        content,
        title,
        isPublic,
        ownerId: id,
      })
      res.send(post)
    },
  ],
})

export default handle
