import { 
  Drawer, 
  useTheme, 
  Avatar, 
  Divider,
  List,
  useMediaQuery,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListItemText,
  Box
} from '@mui/material';
import { LinkMenu } from './LinkMenu';
import { useDrawerContext, useThemeContext } from '../../contexts';

interface MenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral = ({ children }: MenuLateralProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useThemeContext();

  return(
    <>
      <Drawer 
        variant={smDown ? 'temporary' : 'permanent'} 
        open={isDrawerOpen}
        onClose={toggleDrawerOpen}
      >
        <Box 
          width={theme.spacing(28)} 
          height='100%' 
          display='flex' 
          flexDirection='column'
        >
          <Box 
            width='100%' 
            height={theme.spacing(20)} 
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Avatar  
              sx={{ width: theme.spacing(10), height: theme.spacing(10) }}
              src="https://avatars.githubusercontent.com/u/81385265?v=4" 
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component='nav' >
              {drawerOptions.map((drawerOption, index) => (
                <LinkMenu 
                  key={index}
                  to={drawerOption.path}
                  icon={drawerOption.icon} 
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined} 
                />  
              ))}          
            </List>
          </Box>
          <Box>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                {
                  theme.palette.mode === 'dark' 
                  ? (<Icon>light_mode</Icon>)
                  :(<Icon>dark_mode</Icon> )
                }
              </ListItemIcon>
              {
                theme.palette.mode === 'dark'
                ? (<ListItemText primary='Modo claro' />)
                : (<ListItemText primary='Modo escuro' />)
              }
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        { children}
      </Box>
    </>
  );
};