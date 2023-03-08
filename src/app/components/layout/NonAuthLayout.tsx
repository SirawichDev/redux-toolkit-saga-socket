import { FC } from "react";
import { Routes } from "react-router-dom";
type NonAuthLayoutProps = {
  children: React.ReactNode;
};
const NonAuthLayout: FC<NonAuthLayoutProps> = ({ children }) => {
  return <Routes>{children}</Routes>;
};

export default NonAuthLayout;
