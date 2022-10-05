import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";

export const ListaDePessoas = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => searchParams.get("busca") || "", [searchParams]);

  const { debounce } = useDebounce(1000, false);

  useEffect(() => {
    debounce(() => {
      PessoasServices.getAll(1, busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
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