import { A } from "@solidjs/router";

import { Button } from "@ui/button";
import {
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";

export default function NotFound() {
  return (
    <div class="flex min-h-screen flex-col items-center justify-center">
      <PageHeaderHeading>Oops! Page not found.</PageHeaderHeading>
      <PageHeaderDescription>
        The page you're looking for doesn't exist or has been moved. 😞
      </PageHeaderDescription>
      <PageHeaderActions class="justify-center">
        <Button as={A} href="/">
          Go back home
        </Button>
      </PageHeaderActions>
    </div>
  );
}
