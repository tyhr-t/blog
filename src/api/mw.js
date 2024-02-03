import log from "@/api/middlewares/log"
import methodNotAllowed from "@/api/middlewares/methodNotAllowed"
import config from "@/config"
import BaseModel from "@/db/models/BaseModel"
import CommentModel from "@/db/models/CommentModel"
import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"
import knex from "knex"

const mw = (handlers) => async (req, res) => {
  const middlewares = handlers[req.method]
  const sanitizedMiddlewares = [log, ...(middlewares || [methodNotAllowed])]
  let currentMiddlewareIndex = 0
  const db = knex(config.db)

  BaseModel.knex(db)

  const ctx = {
    db,
    models: {
      UserModel,
      PostModel,
      CommentModel,
    },
    req,
    res,
    next: async () => {
      const middleware = sanitizedMiddlewares[currentMiddlewareIndex]
      currentMiddlewareIndex += 1
      await middleware(ctx)
    },
  }

  try {
    await ctx.next()
  } catch (err) {
    res.status(500).send(err.message)
  } finally {
    await db.destroy()
  }
}

export default mw
