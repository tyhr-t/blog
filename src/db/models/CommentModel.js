import BaseModel from "./BaseModel"

class CommentModel extends BaseModel {
  static tablename = "comments"
  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
      },
    }
  }
}

export default CommentModel
