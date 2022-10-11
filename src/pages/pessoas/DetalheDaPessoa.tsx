import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";

export const DetalheDaPessoa = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasServices.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {};

   const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente excluir?")) {
      PessoasServices.deleteById(id)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Excluído com sucesso!");
            navigate('/pessoas');
          }
        });
    }
  };

  return ( 
    <LayoutBaseDePagina 
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova Pessoa"
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClocarNoBotaoSalvar={() => {}}
          aoClocarNoBotaoSalvarEVoltar={() => {}}
          aoClocarNoBotaoApagar={() => handleDelete(Number(id))}
          aoClocarNoBotaoVoltar={() => navigate('/pessoas')}
          aoClocarNoBotaoNovo={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
      <h1>Detalhe da pessoa {id}</h1>
    </LayoutBaseDePagina>
   );
}