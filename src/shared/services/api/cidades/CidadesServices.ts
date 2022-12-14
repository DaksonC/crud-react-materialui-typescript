
import { IDetalheCidade, TCidadesComTotalCount } from '../../../interfaces';
import { api } from '../axios-config';

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
  try {
    const url = `/cidades?_page=${page}&_limit=${import.meta.env.VITE_LIMITE_DE_LINHAS}&nome_like=${filter}`;

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

const getById = async (id: number): Promise<IDetalheCidade | Error>=> {
   try {
    const { data } = await api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await api.post<IDetalheCidade>(`/cidades`, dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
  try {
    await api.put(`/cidades/${id}`, dados);

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/cidades/${id}`);

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao deletar o registro.');
  }
};

export const CidadesServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};