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
      const comment = await CommentModel.query().insert({
        content,
        blogId,
        userId: session.id,
      })
      res.send({ result: comment })
    },
  ],
  GET: [
    auth,
    getValidateRole(["admin", "author", "user"]),
    async ({
      models: { CommentModel },
      input: {
        query: { blogId },
      },
      res,
    }) => {
      const comments = await CommentModel.query()
        .where("blogId", blogId)
        .withGraphFetched("users")
      res.send({ result: comments })
    },
  ],
})

export default handle
