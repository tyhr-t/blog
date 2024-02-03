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
      models: { postModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      {
        const currentPost = postModel.query().findById(userId).throwIfNotFound()
      }
    },
  ],
})

export default handle
