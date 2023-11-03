import { useNavigate } from "react-router-dom";
import { appMenu } from "@/layout/app-menu";

const useMenu = () => {
  const navigate = useNavigate();
  return appMenu(navigate);
};

export default useMenu;
