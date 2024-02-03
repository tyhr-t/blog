import BaseModel from "@/db/models/BaseModel"
import PostModel from "./PostModel"
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
    posts: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: PostModel,
      join: {
        from: "comments.postId",
        to: "posts.id",
      },
    },
  }
}
