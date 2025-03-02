import { A } from "@solidjs/router";

import { Button } from "@ui/button";
import {
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";

export default function NotFound() {
  return (
    <div class="flex flex-col items-center justify-center px-4 text-center">
      <div class="max-w-md space-y-6 py-10">
        <PageHeaderHeading class="text-3xl sm:text-4xl lg:text-5xl">
          Oops! Page not found.
        </PageHeaderHeading>
        <PageHeaderDescription class="text-lg sm:text-xl">
          The page you're looking for doesn't exist or has been moved. 😞
        </PageHeaderDescription>
        <PageHeaderActions class="justify-center pt-4">
          <Button as={A} href="/" size="lg" class="animate-pulse">
            Go back home
          </Button>
        </PageHeaderActions>
      </div>
    </div>
  );
}
