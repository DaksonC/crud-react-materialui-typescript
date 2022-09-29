import { DeFerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo='Layout da Página'
      barraDeFerramentas={
        (<DeFerramentasDaListagem
          mostrarInputBuscar
        />
        )
      }
    >
      Dashboard
    </LayoutBaseDePagina>
  )
}