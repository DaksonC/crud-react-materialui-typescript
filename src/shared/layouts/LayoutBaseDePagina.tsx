import { 
  Icon, 
  IconButton, 
  Theme, 
  Typography, 
  useMediaQuery, 
  useTheme,
  Box
} from '@mui/material';
import { useDrawerContext } from '../contexts';
import { ILayoutBaseDePaginaProps } from '../interfaces';

export const LayoutBaseDePagina = (
  { 
    children, 
    titulo, 
    barraDeFerramentas 
  }: ILayoutBaseDePaginaProps) => {

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box 
      height='100%' 
      display='flex' 
      flexDirection='column'
      gap={1}
    >
      <Box 
        padding={1} 
        gap={1}
        display='flex'
        alignItems='center'
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 10)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography 
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
        >
          {titulo}
        </Typography>
      </Box>
      {barraDeFerramentas && (
        <Box>
          {barraDeFerramentas}
        </Box>
      )}
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  )
}