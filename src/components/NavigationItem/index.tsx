import { useRouter } from "next/router";
import React, {
  EventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  ReactSVGElement,
} from "react";
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
  return <NavigationItemView {...props} isActive={isActive} />;
};
