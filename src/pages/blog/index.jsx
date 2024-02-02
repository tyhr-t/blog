import GridOfAllBlog from "@/web/components/ui/GridOfAllBlog"
import axios from "axios"
export const getServerSideProps = async () => {
  const blog = await axios.get("http://localhost:3000/api/blogs")

  return {
    props: {
      blog: blog.data.result,
    },
  }
}
const index = ({ blog }) => (
  <div className="  ">
    {console.log("blog : ", blog)}
    <GridOfAllBlog blog={blog} />
  </div>
)

export default index
