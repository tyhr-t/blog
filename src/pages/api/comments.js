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
        postId: idValidator,
      },
    }),
    async ({
      models: { CommentModel },
      input: {
        body: { content, postId },
      },
      session,
      res,
    }) => {
      const comment = await CommentModel.query().insert({
        content,
        postId,
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
        query: { postId },
      },
      res,
    }) => {
      const comments = await CommentModel.query()
        .where("postId", postId)
        .withGraphFetched("users")
      res.send({ result: comments })
    },
  ],
})

export default handle
