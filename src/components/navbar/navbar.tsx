import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar as MantineNavbar } from "@mantine/core";
import { IconLogout, IconSwitchHorizontal } from "@tabler/icons-react";

import { checkIsActive } from "@/utils/router-helper";
import type { NavItem } from "@/types";

import { useStyles } from "./navbar.styles";
import type { NavbarProps } from "./navbar.types";

const NavItem = (props: NavItem) => {
  const { classes, cx } = useStyles();
  const { pathname } = useRouter();
  const isActive = checkIsActive(pathname, props.link);

  return (
    <Link
      className={cx(classes.link, isActive && classes.linkActive)}
      href={props.link}
    >
      <props.icon className={classes.linkIcon} stroke={1.5} />
      <span>{props.label}</span>
    </Link>
  );
};

const Navbar = ({ navItems, hidden }: NavbarProps) => {
  const { classes } = useStyles();

  return (
    <MantineNavbar
      width={{ sm: 250, lg: 300 }}
      p="md"
      hiddenBreakpoint="sm"
      hidden={hidden}
    >
      <MantineNavbar.Section grow>
        {navItems.map((navItem) => (
          <NavItem key={navItem.label} {...navItem} />
        ))}
      </MantineNavbar.Section>

      <MantineNavbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export { Navbar };
