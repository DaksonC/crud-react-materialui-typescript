import { IDetalhePessoa, TPessoasComTotalCount } from '../../interfaces';
import { api } from '../axios-config';

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const url = `/pessoas?_page=${page}&_limit=${import.meta.env.VITE_LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

    const { data, headers } = await api.get(url);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || import.meta.env.VITE_LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error>=> {
   try {
    const { data } = await api.get(`/pessoas/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await api.post<IDetalhePessoa>(`/pessoas`, dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {
    await api.put(`/pessoas/${id}`, dados);

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/pessoas/${id}`);

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao deletar o registro.');
  }
};

export const PessoasServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};