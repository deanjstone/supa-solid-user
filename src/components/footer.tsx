import type { JSX } from "solid-js";
import { A } from "@solidjs/router";

function Link(props: { href: string; target: string; children: JSX.Element }) {
  return (
    <A
      href={props.href}
      target={props.target}
      rel="noreferrer"
      class="font-medium underline underline-offset-4">
      {props.children}
    </A>
  );
}

export default function Footer() {
  return (
    <footer class="w-full border-t border-border/40 py-6 dark:border-border">
      <div class="container flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 px-4">
        <p class="text-center sm:text-left text-sm leading-loose text-muted-foreground">
          Built & designed by{" "}
          <Link href="https://github.com/deanjstone/" target="_blank">
            @deanjstone
          </Link>
        </p>
        <p class="text-center sm:text-right text-sm leading-loose text-muted-foreground">
          Read about the project{" "}
          <A
            href="/about"
            rel="noreferrer"
            class="font-medium underline underline-offset-4">
            here
          </A>
        </p>
      </div>
    </footer>
  );
}
