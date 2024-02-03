import GridOfAllBlog from "@/web/components/ui/blog/GridOfAllBlog"
import apiClient from "@/web/services/apiClient"
export const getServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie
  const blog = await apiClient("http://localhost:3000/api/blogs", {
    headers: {
      Cookie: cookie,
    },
  })

  return {
    props: {
      blog: blog.result,
    },
  }
}
const index = ({ blog }) => (
  <div>
    <GridOfAllBlog blog={blog} />
  </div>
)

export default index
