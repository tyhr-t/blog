import GridOfAllPost from "@/web/components/ui/post/GridOfAllPost"
import apiClient from "@/web/services/apiClient"
export const getServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie
  const post = await apiClient("http://localhost:3000/api/posts", {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      post: post.result,
    },
  }
}
const index = ({ post }) => (
  <div>
    <GridOfAllPost post={post} />
  </div>
)

export default index
