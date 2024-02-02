import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { blogModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      {
        const currentBlog = blogModel.query().findById(userId).throwIfNotFound()
      }
    },
  ],
})

export default handle
