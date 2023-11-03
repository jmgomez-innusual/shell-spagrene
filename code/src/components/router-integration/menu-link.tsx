/* istanbul ignore file */
import React from "react";
import { useMatch, Link } from "react-router-dom";
import { MenuLink as AmigaMenuLink } from "@amiga-fwk-web/components-navigation/menu";
import type { MenuLinkProps } from "@amiga-fwk-web/components-navigation/menu";

type LinkProps = {
  to: string;
  exact?: boolean;
  strict?: boolean;
};

const MenuLink = ({ children, to, strict, ...props }: MenuLinkProps & LinkProps) => {
  const active = Boolean(useMatch({ path: to, end: strict }));

  return (
    <AmigaMenuLink active={active} {...props}>
      <Link to={to}>{children}</Link>
    </AmigaMenuLink>
  );
};

export default MenuLink;
