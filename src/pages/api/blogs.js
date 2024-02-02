import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import {
  contentBlogValidator,
  idValidator,
  isPublicValidator,
  pageValidator,
  titleBlogValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({ res, models: { BlogModel } }) => {
      const query = BlogModel.query()
      const blog = await query
        .clone()
        .withGraphFetched("category")
        .where("isPublic", true)
        .orderBy("createdAt", "DESC")
      res.send({
        result: blog,
      })
    },
  ],
  POST: [
    auth,
    getValidateRole(["admin", "author"]),
    validate({
      body: {
        content: contentBlogValidator,
        categoryId: idValidator,
        title: titleBlogValidator,
        isPublic: isPublicValidator,
      },
    }),
    async ({
      models: { BlogModel },
      input: {
        body: { content, title, categoryId, isPublic },
      },
      session: { id },
      res,
    }) => {
      const blog = await BlogModel.query()
        .insertAndFetch({
          content,
          categoryId,
          title,
          isPublic,
          ownerId: id,
        })
        .withGraphFetched("category")
      res.send(blog)
    },
  ],
})

export default handle
