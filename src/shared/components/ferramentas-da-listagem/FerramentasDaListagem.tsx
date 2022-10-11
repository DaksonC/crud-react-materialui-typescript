import {
  Box,
  Button,
  Icon,
  Paper,
  TextField,
  useTheme
} from "@mui/material";
import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBuscar?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClocarNoBotao?: () => void;
}

export const FerramentasDaListagem = ({
  textoDaBusca = '',
  mostrarInputBuscar = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClocarNoBotao,
}: IFerramentasDaListagemProps) => {

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
      {mostrarInputBuscar && (

        <TextField
          size='small'
          label={Environment.INPUT_DE_BUSCA}
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      <Box
        flex={1}
        display='flex'
        justifyContent='flex-end'
      >
        {mostrarBotaoNovo && (
          <Button
            variant='contained'
            color='primary'
            size='small'
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClocarNoBotao}
          >{textoBotaoNovo}</Button>
        )}
      </Box>
    </Box>
  );
};