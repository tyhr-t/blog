import BaseModel from "./BaseModel"
import PostCategoryModel from "./PostCategoryModel"

class PostModel extends BaseModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: PostCategoryModel,
        join: {
          from: "posts.categoryId",
          to: "postCategories.id",
        },
      },
    }
  }
}

export default PostModel
