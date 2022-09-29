import { FerramentasDeDetalhes } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo='Layout da Página'
      barraDeFerramentas={
        (
          <FerramentasDeDetalhes 
            mostrarBotaoSalvarEVoltar 
            mostrarBotaoSalvarEVoltarCarregando
          />
        )
      }
    >
      Dashboard
    </LayoutBaseDePagina>
  )
}