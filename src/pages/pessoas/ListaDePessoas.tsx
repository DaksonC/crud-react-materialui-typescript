import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { IListagemPessoas, PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";

export const ListaDePessoas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<IListagemPessoas[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const busca = useMemo(() => searchParams.get("busca") || "", [searchParams]);
  const { debounce } = useDebounce();

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PessoasServices.getAll(1, busca)
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
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Lista de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBuscar
          textoBotaoNovo="Nova Pessoa"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto }, { replace: true })}
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
                <TableCell>Ações</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};