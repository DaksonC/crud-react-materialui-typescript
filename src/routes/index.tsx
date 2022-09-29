import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { path: '/pagina-inicial', label: 'Pagina Inicial', icon: 'home' },
      { path: '/users', label: 'Usuários', icon: 'people' },
      { path: '/products', label: 'Produtos', icon: 'shopping_cart' },
    ]);
  }, []);

  return (
    <Routes>
      <Route  path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/users' element={<h1>Usuários</h1>} />
      <Route path='/products' element={<h1>Produtos</h1>} />
      <Route path="*" element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};