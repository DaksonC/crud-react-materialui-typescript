import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, DetalheDaPessoa, ListaDePessoas } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { path: '/pagina-inicial', label: 'Pagina Inicial', icon: 'home' },
      { path: '/pessoas', label: 'Pessoas', icon: 'people' },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/pessoas' element={<ListaDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDaPessoa />} />

      <Route path="*" element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};