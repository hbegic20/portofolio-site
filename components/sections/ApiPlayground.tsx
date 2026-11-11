import { getSection } from "@/content/sections";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ApiConsole } from "./api/ApiConsole";

export function ApiPlayground() {
  return (
    <Section id="api" alt>
      <SectionHeading section={getSection("api")} />
      <p data-reveal="item" className="mt-4 max-w-[56ch] text-text-muted">
        This site has a real API. Send a request and read the response.
      </p>

      <Card data-reveal="item" className="mt-10 overflow-hidden">
        <ApiConsole />
      </Card>
    </Section>
  );
}
