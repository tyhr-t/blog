import apiClient from "@/web/services/apiClient"

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/blogs", { params: { page } })

  return {
    props: { initialData: data },
  }
}
// eslint-disable-next-line max-lines-per-function
const IndexPage = ({ initialData }) => {
  console.log(initialData)

  return <div className="relative">coucou</div>
}

export default IndexPage
