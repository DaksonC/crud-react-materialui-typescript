import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

export const FerramentasDeDetalhes = () => {
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
      <Button
        variant='contained'
        color='primary'
        size='small'
        disableElevation
        startIcon={<Icon>save</Icon>}
      >Salvar</Button>
      <Button
        variant='outlined'
        color='primary'
        size='small'
        disableElevation
        startIcon={<Icon>save</Icon>}
      >Salvar e Voltar</Button>
      <Button
        variant='outlined'
        color='primary'
        size='small'
        disableElevation
        startIcon={<Icon>delete</Icon>}
      >Apagar</Button>
      <Button
        variant='outlined'
        color='primary'
        size='small'
        disableElevation
        startIcon={<Icon>add</Icon>}
      >Novo</Button>
      <Divider 
        orientation='vertical' 
        flexItem 
        variant='middle'
      />
      <Button
        variant='outlined'
        color='primary'
        size='small'
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
      >voltar</Button>
    </Box>
  );
};