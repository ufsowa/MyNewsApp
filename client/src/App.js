import './App.css';
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';

import Header from './components/views/Header/Header.js';
import Footer from './components/views/Footer/Footer.js';
import Home from './components/pages/Home/Home.js';
import Search from './components/pages/Search/Search.js';
import PostDetail from './components/pages/PostDetail/PostDetail.js';
import PostEdit from './components/pages/PostEdit/PostEdit.js';
import PostAdd from './components/pages/PostAdd/PostAdd.js';
import Register from './components/pages/Register/Register.js';
import Login from './components/pages/Login/Login.js';
import Logout from './components/pages/Logout/Logout.js';
import NotFound from './components/pages/NotFound/NotFound.js';


function App() {
  return (
    <Container>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/add" element={<PostAdd />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/search/:searchPhrase" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </Container>
  );
}

export default App;
