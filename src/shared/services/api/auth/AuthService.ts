import { IAuth } from "../../../interfaces";
import { api } from "../axios-config";

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try{
    const { data } = await api.get("/auth", { data: {email, password} });
    if (data) {
      return data;
    }
    return new Error(`Erro no login`);
  } 
  catch(error){
    return new Error((error as {message: string}).message || "Erro no login");
  }
}; 

export const AuthService = {
  auth,
};