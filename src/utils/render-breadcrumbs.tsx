import Link from "next/link";
import { Anchor, ActionIcon, Breadcrumbs } from "@mantine/core";
import { IconLayoutDashboard } from "@tabler/icons-react";

import { BreadcrumbItem } from "@/types";

export const renderBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
  return (
    <Breadcrumbs mb="xl">
      <Link href="/">
        <ActionIcon size="xs">
          <IconLayoutDashboard />
        </ActionIcon>
      </Link>

      {breadcrumbs.map((item) => (
        <Link key={item.key} href={item.href} passHref legacyBehavior>
          <Anchor>{item.title}</Anchor>
        </Link>
      ))}
    </Breadcrumbs>
  );
};
