import config from "@/web/config"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  pageValidator,
  contentBlogValidator,
  titleBlogValidator,
  idValidator,
} from "@/utils/validators"

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
