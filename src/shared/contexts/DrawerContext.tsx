import { createContext, useCallback, useState, useContext } from 'react';
import { IChildrenProps, IDrawerContextProps, IDrawerOptions } from '../services/interfaces';

export const DrawerContext = createContext({} as IDrawerContextProps);

export const DrawerProvider = ({ children }: IChildrenProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider 
      value={
        { 
          drawerOptions, 
          isDrawerOpen , 
          toggleDrawerOpen, 
          setDrawerOptions: handleSetDrawerOptions 
        }
      }
    >
          { children }
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  return useContext(DrawerContext);
}