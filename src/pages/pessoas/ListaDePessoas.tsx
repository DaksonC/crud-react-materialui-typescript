import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
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
    </LayoutBaseDePagina>
  );
};