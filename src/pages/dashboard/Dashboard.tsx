import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina 
      titulo='Layout da Página'
      barraDeFerramentas={<>Barra de Ferramentas</>}
    >
      Dashboard
    </LayoutBaseDePagina>
  )
}