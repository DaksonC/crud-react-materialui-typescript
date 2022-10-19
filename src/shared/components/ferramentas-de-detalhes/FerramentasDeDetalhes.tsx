import { 
  Box, 
  Button, 
  Divider, 
  Icon, 
  Paper,
  useTheme,
  Skeleton, 
  Typography, 
  useMediaQuery, 
  Theme 
  } from "@mui/material";
import { IFerramentasDeDetalhesProps } from "../../interfaces";

export const FerramentasDeDetalhes = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEVoltar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClocarNoBotaoNovo,
  aoClocarNoBotaoVoltar,
  aoClocarNoBotaoApagar,
  aoClocarNoBotaoSalvar, 
  aoClocarNoBotaoSalvarEVoltar,
}: IFerramentasDeDetalhesProps) => {

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const theme = useTheme();
  
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      gap={1}
      component={Paper}
    >
      {mostrarBotaoSalvarCarregando && (
        <Skeleton width={100} height={50}/>
      )}
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button
          variant='contained'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClocarNoBotaoSalvar}
        >
          <Typography 
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >Salvar</Typography>
        </Button>
      )}
      {(mostrarBotaoSalvarEVoltarCarregando && !smDown) && (
        <Skeleton width={160} height={50}/>
      )}
      {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !smDown) && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClocarNoBotaoSalvarEVoltar}
        >
          <Typography 
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >Salvar e Voltar</Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && (
        <Skeleton width={100} height={50}/>
      )}
      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClocarNoBotaoApagar}
        >
          <Typography 
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >Apagar</Typography>
        </Button>
      )}
      {mostrarBotaoNovoCarregando && (
        <Skeleton width={100} height={50}/>
      )}
      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoClocarNoBotaoNovo}
        >
          <Typography 
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >{textoBotaoNovo}</Typography>
        </Button>
      )}
      {
        ((mostrarBotaoVoltar && !smDown) 
          ? <Divider 
              orientation='vertical' 
              flexItem 
              variant='middle'
            />
          : null
        )
      }
      {(mostrarBotaoVoltarCarregando && !smDown) && (
        <Skeleton width={100} height={50}/>
      )}
      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && !smDown) && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClocarNoBotaoVoltar}
        >
          <Typography 
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >Voltar</Typography>
        </Button>
      )}
    </Box>
  );
};