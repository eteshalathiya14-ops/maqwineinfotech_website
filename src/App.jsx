import { BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';

import Navbar    from './Component/Navbar';
import Footer    from './Component/Footer';
import AllRoutes from './Routes/AllRoutes';
import { useSEO, PAGE_SEO } from './hooks/useSEO';

function SEOWrapper() {
  const location = useLocation();
  const path = location.pathname;

  let seoKey = 'home';

  if (path === '/' || path === '') {
    seoKey = 'home';
  } else if (path.startsWith('/services/')) {
    seoKey = path.split('/services/')[1] || 'services';
  } else if (path.startsWith('/service/')) {
    seoKey = path.split('/service/')[1] || 'services';
  } else {
    seoKey = path.replace('/', '') || 'home';
  }

  const seo = PAGE_SEO[seoKey] || PAGE_SEO['home'];
  useSEO(seo);
  return null;
}

function AppInner() {
  return (
    <>
      <SEOWrapper />
      <Navbar />
      <main>
        <AllRoutes />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;