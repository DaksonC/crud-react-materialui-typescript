import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DetalheDaPessoa = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  return ( 
    <LayoutBaseDePagina 
      titulo="Detalhe da pessoa"
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova Pessoa"
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClocarNoBotaoSalvar={() => {}}
          aoClocarNoBotaoSalvarEVoltar={() => {}}
          aoClocarNoBotaoApagar={() => {}}
          aoClocarNoBotaoVoltar={() => navigate('/pessoas')}
          aoClocarNoBotaoNovo={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <h1>Detalhe da pessoa {id}</h1>
    </LayoutBaseDePagina>
   );
}