import BaseModel from "@/db/models/BaseModel"
import PostModel from "./PostModel"

class PostCategoryModel extends BaseModel {
  static tableName = "postCategories"

  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
        modelClass: PostModel,
        join: {
          from: "postCategories.id",
          to: "posts.categoryId",
        },
      },
    }
  }
}

export default PostCategoryModel
