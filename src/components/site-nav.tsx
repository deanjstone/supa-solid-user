import { A } from "@solidjs/router";

interface NavLinkProps {
  href: string;
  children: any;
  active?: boolean;
}

const NavLink = (props: NavLinkProps) => {
  return (
    <A
      href={props.href}
      class="text-sm font-medium transition-colors hover:text-primary"
      activeClass="text-foreground font-semibold"
      inactiveClass="text-muted-foreground">
      {props.children}
    </A>
  );
};

export function SiteNav() {
  return (
    <nav class="flex items-center space-x-6">
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/profile">Profile</NavLink>
      <NavLink href="/about">About</NavLink>
    </nav>
  );
}
