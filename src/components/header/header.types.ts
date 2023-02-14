import { Dispatch, SetStateAction } from "react";

export type HeaderProps = {
  navbarOpened: boolean;
  setNavbarOpened: Dispatch<SetStateAction<boolean>>;
};
