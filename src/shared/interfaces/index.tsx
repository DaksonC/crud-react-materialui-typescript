export interface IFormData {
  nome: string;
}

export interface IListagemCidades {
  id: number;
  nome: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
}

export type TCidadesComTotalCount = {
  data: IDetalheCidade[];
  totalCount: number;
}

export interface IFormDataPessoas {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export type TAutocompleteOptions = {
  id: number;
  label: string;
}

export interface IAutoCompleteCidadesProps {
  isExternal: boolean;
}

export interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBuscar?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClocarNoBotao?: () => void;
}

export interface IFerramentasDeDetalhesProps {
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

export interface IChildrenProps {
  children: React.ReactNode;
}

export interface ILinksProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

export interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
}

export interface IDrawerOptions {
  icon: string;
  path: string;
  label: string;
}

export interface IDrawerContextProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOptions[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

export interface IThemeContextProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface ILayoutBaseDePaginaProps {
  titulo: string;
  children: React.ReactNode;
  barraDeFerramentas?: React.ReactNode;
}

export interface IAuth {
  access_token: string;
}

export interface IListagemPessoas {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export interface IDetalhePessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export type TPessoasComTotalCount = {
  data: IDetalhePessoa[];
  totalCount: number;
}