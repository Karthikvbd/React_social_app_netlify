import { Link,Routes, Route } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import Postpage from "./Postpage";
import EditPost from "./EditPost";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header  title="Textify" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post">
            <Route index element={<NewPost/>} />
            <Route path=":id" element={<Postpage />} />
            </Route>
            <Route path="edit/:id" element={<EditPost/>} />
          <Route path="about" element = {<About />} />
          <Route path="*" element = {<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
