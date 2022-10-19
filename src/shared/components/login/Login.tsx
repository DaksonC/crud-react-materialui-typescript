import { 
  Box, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CircularProgress, 
  TextField
} from "@mui/material";
import * as yup from 'yup';
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import { IChildrenProps } from "../../services/interfaces";

const loginScheme = yup.object().shape({
  email: yup.string().email().required('O email é obrigatório!'),
  password: yup.string().required().min(6, 'A senha deve ter no mínimo 6 caracteres!'),
})

export const Login = ({ children }: IChildrenProps) => {
  const { isAuthenticated, login } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    loginScheme.validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => login(dadosValidados.email, dadosValidados.password))
      .then(() => setIsLoading(false))
      .catch((err: yup.ValidationError) => {
        setIsLoading(false);
        err.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          }
          if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{ children }</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width={250}
          >
            <TextField 
              fullWidth 
              label="E-mail" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              disabled={isLoading}
            />
            <TextField 
              fullWidth 
              label="Senha" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              disabled={isLoading}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogin()}
              disabled={isLoading}
              endIcon={
                isLoading 
                ? <CircularProgress variant="indeterminate" size={20} color="primary" />
                : undefined
              }
            >
             ENTRAR
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};