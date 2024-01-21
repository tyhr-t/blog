import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import {
  contentBlogValidator,
  idValidator,
  pageValidator,
  titleBlogValidator,
} from "@/utils/validators"
import config from "@/web/config"

const handle = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({
      res,
      models: { BlogModel },
      input: {
        query: { page },
      },
    }) => {
      const query = BlogModel.query()
      const blog = await query
        .clone()
        .withGraphFetched("category")
        .where("isPublic", true)
        .orderBy("createdAt", "DESC")
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()
      res.send({
        result: blog,
        meta: {
          count,
        },
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
      },
    }),
    async ({
      models: { BlogModel },
      input: {
        body: { content, title, categoryId, isPublic },
      },
      res,
    }) => {
      const blog = await BlogModel.query()
        .insertAndFetch({
          content,
          categoryId,
          title,
          isPublic,
        })
        .withGraphFetched("category")
      res.send(blog)
    },
  ],
})

export default handle
