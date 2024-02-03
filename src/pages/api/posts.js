import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import {
  contentPostValidator,
  idValidator,
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
        .withGraphFetched("category")
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
        categoryId: idValidator,
        title: titlePostValidator,
        isPublic: isPublicValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        body: { content, title, categoryId, isPublic },
      },
      session: { id },
      res,
    }) => {
      const post = await PostModel.query()
        .insertAndFetch({
          content,
          categoryId,
          title,
          isPublic,
          ownerId: id,
        })
        .withGraphFetched("category")
      res.send(post)
    },
  ],
})

export default handle
