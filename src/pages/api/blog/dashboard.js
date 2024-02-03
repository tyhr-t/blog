import auth from "@/api/middlewares/auth"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
const handle = mw({
  GET: [
    auth,
    getValidateRole(["admin", "author", "user"]),
    async ({ models: { BlogModel, CommentModel }, session, res }) => {
      const blogs = await BlogModel.query().where("ownerId", session.id)
      const comments = await CommentModel.query().where("userId", session.id)
      res.send({ blogs: blogs.length, comments: comments.length })
    },
  ],
})

export default handle
