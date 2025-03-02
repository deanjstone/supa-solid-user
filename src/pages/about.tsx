import { A } from "@solidjs/router";

import { Button } from "@ui/button";
import {
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";

export default function About() {
  return (
    <>
      <div class="flex flex-col items-center gap-3">
        <PageHeaderHeading>About Page</PageHeaderHeading>
        <PageHeaderDescription>
          Nothing to see here yet. 😞
        </PageHeaderDescription>
        <PageHeaderActions class="justify-center">
          <Button as={A} href="/">
            Go back home
          </Button>
        </PageHeaderActions>
      </div>
    </>
  );
}
