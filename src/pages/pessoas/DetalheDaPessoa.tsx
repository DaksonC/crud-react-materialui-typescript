import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { useVForm } from "../../shared/hooks";
import { VForm, VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { AutoCompleteCidades, FerramentasDeDetalhes } from "../../shared/components";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

const schema: yup.SchemaOf<IFormData> = yup.object().shape({
  nomeCompleto: 
    yup.string()
    .required("Nome completo é obrigatório")
    .min(3, "Nome completo deve ter no mínimo 3 caracteres"),

  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  cidadeId: yup.number().required("Cidade é obrigatória"),
});

export const DetalheDaPessoa = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();


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
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: undefined,
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    schema.validate(dados, { abortEarly: false })
    .then((dadosValidados) => {

      setIsLoading(true);
      if (id === 'nova') {
        PessoasServices.create(dadosValidados)
          .then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/pessoas');
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
      } else {
        PessoasServices.updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/pessoas');
              } else {
                setNome(dados.nomeCompleto);
              }
            }
          });
        }
    })
    .catch((err: yup.ValidationError) => {
      const validateErrors: {[ key: string ]: string} = {};
      err.inner.forEach((error) => {
        if (!error.path) return;
        validateErrors[error.path] = error.message;
      });
      formRef.current?.setErrors(validateErrors);
    });

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

          aoClocarNoBotaoSalvar={save}
          aoClocarNoBotaoSalvarEVoltar={saveAndClose}
          aoClocarNoBotaoApagar={() => handleDelete(Number(id))}
          aoClocarNoBotaoVoltar={() => navigate('/pessoas')}
          aoClocarNoBotaoNovo={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <VForm
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
                <AutoCompleteCidades isExternal={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
}