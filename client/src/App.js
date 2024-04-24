import './App.css';
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';

import Header from './components/views/Header/Header.js';
import Footer from './components/views/Footer/Footer.js';
import Home from './components/pages/Home/Home.js';
import PostDetail from './components/pages/PostDetail/PostDetail.js';
import PostEdit from './components/pages/PostEdit/PostEdit.js';

function App() {
  return (
    <Container>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          {/* <Route path="/post/add" element={<AddPost />} /> */}
          <Route path="/post/edit/:id" element={<PostEdit />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
    </Container>
  );
}

export default App;
