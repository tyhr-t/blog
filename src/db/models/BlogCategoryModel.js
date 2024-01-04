import BaseModel from "@/db/models/BaseModel"
import BlogModel from "./BlogModel"

class BlogCategoryModel extends BaseModel {
  static tableName = "blogCategories"

  static get relationMappings() {
    return {
      blogs: {
        relation: BaseModel.HasManyRelation,
        modelClass: BlogModel,
        join: {
          from: "blogCategories.id",
          to: "blogs.categoryId",
        },
      },
    }
  }
}

export default BlogCategoryModel
