import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler, ReactElement } from "react";
import { NavigationItemView } from "./view";

export type NavigationItemProps = {
  title: string;
  href?: string;
  onClick?: MouseEventHandler;
  icon?: ReactElement<React.ComponentProps<"svg">>;
};

export const NavigationItem = (props: NavigationItemProps) => {
  const router = useRouter();
  const isActive = router.route === props.href;
  if (props.href) {
    return (
      <Link href={props.href}>
        <a>
          <NavigationItemView {...props} isActive={isActive} />
        </a>
      </Link>
    );
  } else {
    return <NavigationItemView {...props} isActive={isActive} />;
  }
};
