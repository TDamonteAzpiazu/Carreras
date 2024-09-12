import './App.css';
import { Navbar } from './components/primary/navbar/navbar';
import { Footer } from './components/primary/footer/footer';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/home/home';
import { Sistemas } from './views/carreras/sistemas/sistemas';
import { Admin } from './views/carreras/admin/admin';
import { Contador } from './views/carreras/contador/contador';
import { ActEcon } from './views/carreras/actEcon/actEcon';
import { ActAdmin } from './views/carreras/actAdmin/actAdmin';
import { Economia } from './views/carreras/economia/economia';

function App() {
  return (
    <div className="todo">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sistemas" element={<Sistemas />} />
          <Route path="/actuarioEconomia" element={<ActEcon />} />
          <Route path="/actuarioAdministracion" element={<ActAdmin />} />
          <Route path="/economia" element={<Economia />} />
          <Route path="/administracion" element={<Admin />} />
          <Route path="/contador" element={<Contador />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
