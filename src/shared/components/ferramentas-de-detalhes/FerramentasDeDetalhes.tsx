import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

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
      {mostrarBotaoSalvar && (
        <Button
          variant='contained'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClocarNoBotaoSalvar}
        >Salvar</Button>
      )}
      {mostrarBotaoSalvarEVoltar && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClocarNoBotaoSalvarEVoltar}
        >Salvar e Voltar</Button>
      )}
      {mostrarBotaoApagar && (
        <Button
          variant='outlined'
          color='primary'
          size='small'
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClocarNoBotaoApagar}
        >Apagar</Button>
      )}
      {mostrarBotaoNovo && (
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
      {mostrarBotaoVoltar && (
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