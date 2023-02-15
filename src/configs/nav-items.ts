import {
  IconLayoutDashboard,
  IconPackage,
  IconShoppingCart,
} from "@tabler/icons-react";

import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    link: "/products",
    label: "Products",
    icon: IconPackage,
  },
  {
    link: "/carts",
    label: "Carts",
    icon: IconShoppingCart,
  },
];
