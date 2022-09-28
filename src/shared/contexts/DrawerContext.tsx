import { createContext, useCallback, useState, useContext } from 'react';

interface IDrawerOptions {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerContextProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOptions[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

interface IDrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerContext = createContext({} as IDrawerContextProps);

export const DrawerProvider = ({ children }: IDrawerProviderProps) => {
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