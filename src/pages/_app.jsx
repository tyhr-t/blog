import "@/styles/globals.css"
import Header from "@/web/components/Header"
import { SessionProvider } from "@/web/components/SessionContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient()
const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={client}>
    <SessionProvider>
      <div className=" font-mono h-screen bg-gradient-to-r  from-gray-100 to-gray-300 flex flex-col">
        <Header />
        <section className="p-4">
          <div className="md:max-w-3xl p-4 mx-auto">
            <Component {...pageProps} />
          </div>
        </section>
      </div>
    </SessionProvider>
  </QueryClientProvider>
)

export default App
