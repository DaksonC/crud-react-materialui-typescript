import { Icon, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface ILinksProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

export const LinkMenu = ({to, icon, label, onClick}: ILinksProps) => {
  const navigate = useNavigate();

  //Caso o link esteja ativo, o ícone e o texto ficarão em destaque
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({path: resolvedPath.pathname, end: false});

  const handelClick = () => {
    navigate(to);
    onClick && onClick();
  };

  return (
    <ListItemButton selected={!!match} onClick={handelClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};