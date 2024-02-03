import Router from "next/router"
const GridOfAllPost = ({ post }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
    {post.map((posts) => (
      <div
        key={posts.id}
        className=" hover:text-white bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer relative"
      >
        <div className="bg-transparent rounded-full text-xs px-2 py-1 mb-2">
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
            {posts.title}
          </span>
        </div>
        <span className="text-2xl text-gray-800">
          {`${posts.content.slice(0, 7).toUpperCase()}...`}
        </span>
        <button
          onClick={() => {
            Router.push(`/post/${posts.id}`)
          }}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Show
        </button>
      </div>
    ))}
  </div>
)

export default GridOfAllPost
