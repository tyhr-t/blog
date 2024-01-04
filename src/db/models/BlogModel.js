import BaseModel from "./BaseModel"
import CategoryModel from "./CategoryModel"

class BlogModel extends BaseModel {
  static tableName = "blogs"

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "blogs.categoryId",
          to: "categories.id",
        },
      },
    }
  }
}

export default BlogModel
