import BaseModel from "./BaseModel"
import BlogCategoryModel from "./BlogCategoryModel"

class BlogModel extends BaseModel {
  static tableName = "blogs"

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: BlogCategoryModel,
        join: {
          from: "blogs.categoryId",
          to: "blogCategories.id",
        },
      },
    }
  }
}

export default BlogModel
