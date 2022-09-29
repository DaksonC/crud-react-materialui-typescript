import { Box, Button, Divider, Icon, Paper, useTheme, Skeleton } from "@mui/material";

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;

  aoClocarNoBotaoNovo?: () => void;
  aoClocarNoBotaoVoltar?: () => void;
  aoClocarNoBotaoApagar?: () => void;
  aoClocarNoBotaoSalvar?: () => void;
  aoClocarNoBotaoSalvarEVoltar?: () => void;
}

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
        >Salvar</Button>
      )}
      {mostrarBotaoSalvarEVoltarCarregando && (
        <Skeleton width={160} height={50}/>
      )}
      {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClocarNoBotaoSalvarEVoltar}
        >Salvar e Voltar</Button>
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
        >Apagar</Button>
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
        >{textoBotaoNovo}</Button>
      )}
      <Divider 
        orientation='vertical' 
        flexItem 
        variant='middle'
      />
      {mostrarBotaoVoltarCarregando && (
        <Skeleton width={100} height={50}/>
      )}
      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClocarNoBotaoVoltar}
        >voltar</Button>
      )}
    </Box>
  );
};