export const getServerSideProps = async ({ req }) => {
  console.clear()
  const cookies = req.headers.cookie
  console.log("cookies", cookies)

  const test = await fetch("http://localhost:3000/api/test", {
    headers: {
      test: "test",
    },
    method: "GET",
  })
  console.log("test", test.data)

  return {
    props: { initialData: {} },
  }
}

export default function TestPage() {
  return <>test</>
}
