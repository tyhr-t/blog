import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { categoryNameValidator, pageValidator } from "@/utils/validators"
import config from "@/web/config"
const handle = mw({
  POST: [
    validate({
      body: {
        name: categoryNameValidator,
      },
    }),
    async ({
      models: { PostCategoryModel },
      input: {
        body: { name },
      },
      res,
    }) => {
      const category = await PostCategoryModel.query().insertAndFetch({ name })

      res.send(category)
    },
  ],
  GET: [
    async ({ res, req, next }) => {
      console.log("coucou")
      await next()
    },
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({ res, req, next }) => {
      console.log("coucou après")
      await next()
    },
    async ({
      res,
      models: { PostCategoryModel },
      input: {
        query: { page },
      },
    }) => {
      console.log("ALORS WHAT", page)
      const query = PostCategoryModel.query()
      const categories = await query
        .clone()
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()

      console.log("ALORS WHAT 2")
      res.send({
        result: categories,
        meta: {
          count,
        },
      })
    },
  ],
})
export default handle
