import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { useVForm } from "../../shared/hooks";
import { VForm, VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { IFormData } from "../../shared/services/interfaces";
import { FerramentasDeDetalhes } from "../../shared/components";
import { CidadesServices } from "../../shared/services/api/cidades/CidadesServices";


const schema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required("Campo obrigatório").min(3, "Mínimo de 3 caracteres"),
});

export const DetalheDaCidade = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();


  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      CidadesServices.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            setNome(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    schema.validate(dados, { abortEarly: false })
    .then((dadosValidados) => {

      setIsLoading(true);
      if (id === 'nova') {
        CidadesServices.create(dadosValidados)
          .then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/cidades');
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
      } else {
        CidadesServices.updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/cidades');
              } else {
                setNome(dados.nome);
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
      CidadesServices.deleteById(id)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Excluído com sucesso!");
            navigate('/cidades');
          }
        });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova cidade' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClocarNoBotaoSalvar={save}
          aoClocarNoBotaoSalvarEVoltar={saveAndClose}
          aoClocarNoBotaoApagar={() => handleDelete(Number(id))}
          aoClocarNoBotaoVoltar={() => navigate('/cidades')}
          aoClocarNoBotaoNovo={() => navigate('/cidades/detalhe/nova')}
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
                  name="nome"
                  label="Nome"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>            
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
}