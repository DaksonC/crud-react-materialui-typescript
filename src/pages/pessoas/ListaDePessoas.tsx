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
  TableRow 
} from "@mui/material";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { IListagemPessoas, PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";
import { Environment } from "../../shared/environment";

export const ListaDePessoas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<IListagemPessoas[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { debounce } = useDebounce();
  const busca = useMemo(() => searchParams.get("busca") || "", [searchParams]);
  const pagina = useMemo(() => Number(searchParams.get("pagina") || "1"), [searchParams]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PessoasServices.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente excluir?")) {
      PessoasServices.deleteById(id)
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

  return (
    <LayoutBaseDePagina
      titulo="Lista de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBuscar
          textoBotaoNovo="Nova Pessoa"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={
            (texto) => setSearchParams({ busca: texto, pagina: '1' },
            { replace: true })
          }
          aoClocarNoBotao={() => navigate("/pessoas/detalhe/nova")}
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
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton 
                    size="small"  
                    onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon> 
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Icon>delete</Icon> 
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
              <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
              </TableCell>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow >
                <TableCell colSpan={3}>
                  <Pagination 
                    page={pagina}                    
                    shape="rounded"
                    variant="outlined"
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)} 
                    onChange={
                      (_, page) => setSearchParams({ busca, pagina: page.toString() }, 
                      { replace: true })}
                      showFirstButton 
                      showLastButton
                      color={"primary"}
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