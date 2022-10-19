import { useEffect, useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { useDebounce } from "../../hooks";
import { CidadesServices } from "../../services/api/cidades/CidadesServices";
import CircularProgress from "@mui/material/CircularProgress";
import { useField } from "@unform/core";
import { IAutoCompleteCidadesProps, TAutocompleteOptions } from "../../interfaces";

export const AutoCompleteCidades = ({isExternal = false}: IAutoCompleteCidadesProps) => {
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError
  } = useField("cidadeId");
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
  const [opcoes, setOpcoes] = useState<TAutocompleteOptions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const { debounce } = useDebounce();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [selectedId, registerField, fieldName]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesServices.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setOpcoes(result.data.map((cidade) => ({id: cidade.id, label: cidade.nome})));
          }
        });
    });
  }, [busca]);

  const autocompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOpcoes = opcoes.find((opcao) => opcao.id === selectedId);
    if (!selectedId) return null;
    return selectedOpcoes;

  }, [selectedId, opcoes]);

  return (
    <Autocomplete 
      disablePortal
      openText="Abrir"
      closeText="Fechar"
      loadingText="Carregando..."
      noOptionsText="Nenhuma opção"

      options={opcoes}
      loading={isLoading}
      disabled={isExternal}
      value={autocompleteSelectedOption}
      onInputChange={(_, value) => setBusca(value)}
      popupIcon={(isExternal || isLoading) ? <CircularProgress size={26}/> : undefined}
      onChange={(_, value) => {setSelectedId(value?.id); setBusca(''); clearError();}}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Cidade" 
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
}