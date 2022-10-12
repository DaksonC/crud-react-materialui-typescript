import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  Dashboard, 
  DetalheDaCidade, 
  DetalheDaPessoa, 
  ListaDeCidades, 
  ListaDePessoas 
} from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { path: '/pagina-inicial', label: 'Pagina Inicial', icon: 'home' },
      { path: '/cidades', label: 'Cidades', icon: 'location_city' },
      { path: '/pessoas', label: 'Pessoas', icon: 'people' },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      
      <Route path='/cidades' element={<ListaDeCidades />} />
      <Route path='/cidades/detalhe/:id' element={<DetalheDaCidade />} />

      <Route path='/pessoas' element={<ListaDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDaPessoa />} />

      <Route path="*" element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};