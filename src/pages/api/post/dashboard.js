import auth from "@/api/middlewares/auth"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
const handle = mw({
  GET: [
    auth,
    getValidateRole(["admin", "author", "user"]),
    async ({ models: { PostModel, CommentModel }, session, res }) => {
      const posts = await PostModel.query().where("ownerId", session.id)
      const comments = await CommentModel.query().where("userId", session.id)
      res.send({ posts: posts.length, comments: comments.length })
    },
  ],
})

export default handle
