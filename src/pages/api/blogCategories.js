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
      models: { BlogCategoryModel },
      input: {
        body: { name },
      },
      res,
    }) => {
      const category = await BlogCategoryModel.query().insertAndFetch({ name })

      res.send(category)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({
      res,
      models: { BlogCategoryModel },
      input: {
        query: { page },
      },
    }) => {
      const query = BlogCategoryModel.query()
      const categories = await query
        .clone()
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()

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
