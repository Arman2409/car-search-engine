import Filters from "./components/Filters/Filters"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Searchbar from "./components/Searchbar/Searchbar"

const App = () => {
  return (
    <>
      <Header />
      <Searchbar />
      <Filters />
      <Footer />
    </>
  )
}

export default App
