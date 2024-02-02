import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import { contentCommentValidator, idValidator } from "@/utils/validators"
const handle = mw({
  POST: [
    auth,
    getValidateRole(["user", "admin", "author"]),
    validate({
      body: {
        content: contentCommentValidator,
        blogId: idValidator,
      },
    }),
    async ({
      models: { CommentModel },
      input: {
        body: { content, blogId },
      },
      session,
      res,
    }) => {
      console.log("JE SUIS LA ROUTE")
      const comment = await CommentModel.query().insert({
        content,
        blogId,
        userId: session.id,
      })
      res.send({ result: comment })
    },
  ],
})

export default handle
