import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Icon,
  IconButton,
  LinearProgress, 
  Pagination, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TableRow, 
  Theme, 
  useMediaQuery
} from "@mui/material";
import { 
  IListagemCidades, 
  CidadesServices 
} from "../../shared/services/api/cidades/CidadesServices";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { green, red } from "@mui/material/colors";

export const ListaDeCidades = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<IListagemCidades[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { debounce } = useDebounce();
  const busca = useMemo(() => searchParams.get("busca") || "", [searchParams]);
  const pagina = useMemo(() => Number(searchParams.get("pagina") || "1"), [searchParams]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesServices.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente excluir?")) {
      CidadesServices.deleteById(id)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(rows.filter((x) => x.id !== id));
            alert("Excluído com sucesso!");
          }
        });
    }
  };

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <LayoutBaseDePagina
      titulo="Lista de Cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBuscar
          textoBotaoNovo={smDown ? "Nova" : "Nova cidade"}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={
            (texto) => setSearchParams({ busca: texto, pagina: '1' },
            { replace: true })
          }
          aoClocarNoBotao={() => navigate("/cidades/detalhe/nova")}
        />
      }
    >
      <TableContainer 
        component={Paper}
        variant="outlined"
        sx={{m: 1, width: "auto"}}
        >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nome}</TableCell>
                <TableCell>
                  <IconButton 
                    size="small"  
                    onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                  >
                    <Icon sx={{ color: green[200] }} >edit</Icon> 
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Icon sx={{ color: red[200] }} >delete</Icon> 
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter >
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow >
                <TableCell colSpan={3}>
                    <Pagination 
                      showFirstButton 
                      showLastButton
                      color={"primary"}
                      defaultPage={3}
                      boundaryCount={2}
                      page={pagina}                    
                      shape="rounded"
                      variant="outlined"
                      count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)} 
                      onChange={
                        (_, page) => setSearchParams({ busca, pagina: page.toString() }, 
                        { replace: true })
                      }
                    />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};