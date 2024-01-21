import auth from "@/api/middlewares/auth"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"

const handle = mw({
  GET: [
    auth,
    getValidateRole(["admin", "author", "user"]),
    async ({
      models: { BlogModel },
      req: {
        query: { blogId },
      },
      res,
    }) => {
      const blog = await BlogModel.query().findById(blogId).throwIfNotFound()
      res.send(blog)
    },
  ],
  PATCH: [
    auth,
    getValidateRole(["admin", "author"]),
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
