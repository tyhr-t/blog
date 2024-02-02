import BaseModel from "@/db/models/BaseModel"
import BlogModel from "./BlogModel"
import UserModel from "./UserModel"

export default class CommentModel extends BaseModel {
  static tableName = "comments"

  static relationMappings = {
    users: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: "comments.userId",
        to: "users.id",
      },
    },
    blogs: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: BlogModel,
      join: {
        from: "comments.blogId",
        to: "blogs.id",
      },
    },
  }
}
