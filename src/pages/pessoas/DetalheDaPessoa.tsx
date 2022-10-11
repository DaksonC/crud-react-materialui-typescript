import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export const DetalheDaPessoa = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);
    if (id === 'nova') {
      PessoasServices.create(dados)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasServices.updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          }
        });
    }
  };

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
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClocarNoBotaoSalvar={() => formRef.current?.submitForm()}
          aoClocarNoBotaoSalvarEVoltar={() => formRef.current?.submitForm()}
          aoClocarNoBotaoApagar={() => handleDelete(Number(id))}
          aoClocarNoBotaoVoltar={() => navigate('/pessoas')}
          aoClocarNoBotaoNovo={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <Form
        ref={formRef}
        onSubmit={handleSave}
      >
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid
            container
            spacing={2}
            padding={2}
            direction="column"
          >
            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={2}
            >
              <Grid
                item
                xs={12} sm={12} md={6} lg={4} xl={2}
              >
                <VTextField
                  fullWidth
                  name="nomeCompleto"
                  label="Nome completo"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={2}
            >
              <Grid
                item
                xs={12} sm={12} md={6} lg={4} xl={2}
              >
                <VTextField
                  fullWidth
                  name="email"
                  label="E-mail"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={2}
            >
              <Grid
                item
                xs={12} sm={12} md={6} lg={4} xl={2}
              >
                <VTextField
                  fullWidth
                  name="cidadeId"
                  label="Cidade"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  );
}