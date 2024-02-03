const CommentView = ({ comment }) => (
  <div key={comment.id} className="bg-gray-100 p-4 mb-4">
    <p className="text-blue-500 font-bold">{comment.userId.email}</p>
    <p className="text-gray-800">{comment.content}</p>
    <p className="text-gray-500">{comment.createdAt}</p>
  </div>
)

export default CommentView
