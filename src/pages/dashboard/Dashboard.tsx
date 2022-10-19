import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhes } from '../../shared/components';
import { CidadesServices } from '../../shared/services/api/cidades/CidadesServices';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';

export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);
      CidadesServices.getAll(1)
        .then((result) => {
          setIsLoadingCidades(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCountCidades(result.totalCount);
          }
        });
        PessoasServices.getAll(1)
        .then((result) => {
          setIsLoadingPessoas(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCountPessoas(result.totalCount);
          }
        });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={(
      <FerramentasDeDetalhes 
        mostrarBotaoSalvarEVoltar={false}
        mostrarBotaoSalvar={false}
        mostrarBotaoVoltar={false}
        mostrarBotaoApagar={false}
        mostrarBotaoNovo={false}
      />)}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2} >
          <Grid item container spacing={2} >
            <Grid item xs={12} sm={12} md={8} lg={4} xl={3} >
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    Total de pessoas cadastradas
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                    {!isLoadingPessoas && (
                      <Typography variant="h3" component="div" align="center">
                        {totalCountPessoas}
                      </Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant="h3" component="div" align="center">
                        <CircularProgress />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    Total de cidades cadastradas
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                    {!isLoadingCidades && (
                      <Typography variant="h3" component="div" align="center">
                        {totalCountCidades}
                      </Typography>
                    )}
                    {isLoadingCidades && (
                      <Typography variant="h3" component="div" align="center">
                        <CircularProgress />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  )
}