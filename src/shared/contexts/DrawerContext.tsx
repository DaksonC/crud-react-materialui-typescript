import { createContext, useCallback, useMemo, useState, useContext } from 'react';


interface IDrawerContextProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

interface IDrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerContext = createContext({} as IDrawerContextProps);

export const DrawerProvider = ({ children }: IDrawerProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen , toggleDrawerOpen}}>
          { children }
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  return useContext(DrawerContext);
}