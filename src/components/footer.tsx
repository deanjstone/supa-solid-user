import type { JSX } from "solid-js";
import { A } from "@solidjs/router";

function Link(props: { href: string; target: string; children: JSX.Element }) {
  return (
    <A
      href={props.href}
      target={props.target}
      rel="norefferer"
      class="font-medium underline underline-offset-4">
      {props.children}
    </A>
  );
}

export default function Footer() {
  return (
    <footer class="container border-t border-border/40 py-6 px-8 dark:border-border">
      <div class="container flex items-center justify-between gap-4 ">
        <p class="text-center text-sm leading-loose text-muted-foreground flex-col">
          Built & designed by{" "}
          <Link href="https://github.com/deanjstone/" target="_blank">
            @deanjstone
          </Link>
          . Read about the project{" "}
          <A
            href="/about"
            rel="norefferer"
            class="font-medium underline underline-offset-4">
            here
          </A>
          .
        </p>
      </div>
    </footer>
  );
}
