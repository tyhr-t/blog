import apiClient from "@/web/services/apiClient"

export const getServerSideProps = async ({ req }) => {
  const { cookie } = req.headers
  const dashboardStats = await apiClient("/post/dashboard", {
    headers: { Cookie: cookie },
  })

  return {
    props: {
      dashboardStats: dashboardStats,
    },
  }
}
const Dashboard = ({ dashboardStats }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>my Posts count : {dashboardStats.posts}</p>
      <p>my Comments count : {dashboardStats.comments}</p>
    </div>
  )
}

export default Dashboard
