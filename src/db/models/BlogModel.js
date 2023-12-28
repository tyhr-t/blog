import BaseModel from "./BaseModel"
import CategoryModel from "./CategoryModel"

class BlogModel extends BaseModel {
  static tableName = "blog"

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "blog.blogId",
          to: "categoriesPage.id",
        },
      },
    }
  }
}

export default BlogModel
