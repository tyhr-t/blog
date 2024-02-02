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
      models: { BlogModel, CommentModel },
      req: {
        query: { blogId },
      },
      res,
    }) => {
      const blog = await BlogModel.query().findById(blogId).throwIfNotFound()

      await BlogModel.query().updateAndFetchById(blogId, {
        visits: blog.visits + 1,
      })

      const comments = await CommentModel.query()
        .clone()
        .where("blogId", blogId)
        // .orderBy("createdAt", "DESC")
        .withGraphFetched("users")
      // .limit(config.ui.itemsPerPage)
      // .offset((page - 1) * config.ui.itemsPerPage)

      res.send({ blog, comments })
    },
  ],
  PATCH: [
    auth,
    getValidateRole(["admin", "author"]),
    validate({
      query: {
        blogId: idValidator,
      },
      body: {
        title: todoDescriptionValidator.optional(),
        content: todoDescriptionValidator.optional(),
      },
    }),
    async ({
      models: { BlogModel },
      req: {
        query: { blogId },
        body,
      },
      res,
    }) => {
      const updatedBlog = await BlogModel.query()
        .updateAndFetchById(blogId, {
          ...body,
          updatedAt: BlogModel.fn.now(),
        })
        .throwIfNotFound()

      res.send(updatedBlog)
    },
  ],
  DELETE: [
    auth,
    getValidateRole(["admin", "author"]),
    async ({
      models: { BlogModel },
      req: {
        query: { blogId },
      },
      res,
    }) => {
      await BlogModel.query().deleteById(blogId).throwIfNotFound()
      res.send({ message: "Blog deleted" })
    },
  ],
})

export default handle
