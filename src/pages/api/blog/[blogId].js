import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"

const handle = mw({
  GET: [
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
  POST: [
    auth,
    async ({ models: { BlogModel }, req: { body }, res }) => {
      const newBlog = await BlogModel.query().insertAndFetch({
        ...body,
      })

      res.send(newBlog)
    },
  ],
})

export default handle
