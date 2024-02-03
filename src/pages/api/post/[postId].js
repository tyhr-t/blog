import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
import { idValidator, todoDescriptionValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    auth,
    getValidateRole(["admin", "author", "user"]),
    async ({
      models: { PostModel, CommentModel },
      req: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostModel.query().findById(postId).throwIfNotFound()

      await PostModel.query().updateAndFetchById(postId, {
        visits: post.visits + 1,
      })

      const comments = await CommentModel.query()
        .clone()
        .where("postId", postId)
        // .orderBy("createdAt", "DESC")
        .withGraphFetched("users")
      // .limit(config.ui.itemsPerPage)
      // .offset((page - 1) * config.ui.itemsPerPage)

      res.send({ post, comments })
    },
  ],
  PATCH: [
    auth,
    getValidateRole(["admin", "author"]),
    validate({
      query: {
        postId: idValidator,
      },
      body: {
        title: todoDescriptionValidator.optional(),
        content: todoDescriptionValidator.optional(),
      },
    }),
    async ({
      models: { PostModel },
      req: {
        query: { postId },
        body,
      },
      res,
    }) => {
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postId, {
          ...body,
          updatedAt: PostModel.fn.now(),
        })
        .throwIfNotFound()

      res.send(updatedPost)
    },
  ],
  DELETE: [
    auth,
    getValidateRole(["admin", "author"]),
    async ({
      models: { PostModel },
      req: {
        query: { postId },
      },
      res,
    }) => {
      await PostModel.query().deleteById(postId).throwIfNotFound()
      res.send({ message: "Post deleted" })
    },
  ],
})

export default handle
