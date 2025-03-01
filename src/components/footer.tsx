import type { JSX } from "solid-js";
import { A } from "@solidjs/router";

function Link(props: { href: string; children: JSX.Element }) {
  return (
    <A
      href={props.href}
      target="_blank"
      rel="norefferer"
      class="font-medium underline underline-offset-4">
      {props.children}
    </A>
  );
}

export default function Footer() {
  return (
    <footer class="border-t border-border/40 py-6 px-8 dark:border-border">
      <div class="container flex flex-col items-center justify-between gap-4 ">
        <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built & designed by{" "}
          <Link href="https://github.com/deanjstone/">deanjstone</Link>
        </p>
      </div>
    </footer>
  );
}
