import type { Metadata } from "next";
import { isUnlocked } from "@/lib/docs-auth";
import { loadDeploymentDoc } from "@/lib/deployment-docs";
import { UnlockGate } from "@/components/admin-docs/UnlockGate";
import { DocsShell } from "@/components/admin-docs/DocsShell";
import { MarkdownContent } from "@/components/admin-docs/MarkdownContent";

export const metadata: Metadata = {
    title: "Deployment runbook — internal",
    robots: { index: false, follow: false },
};

// Always re-check the cookie/env on request — this is an auth gate, not content that should
// ever be cached or statically generated.
export const dynamic = "force-dynamic";

export default async function DeploymentDocsPage() {
    if (!(await isUnlocked())) {
        return <UnlockGate />;
    }

    const doc = loadDeploymentDoc();
    const lastUpdated = doc.lastUpdated.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <DocsShell title={doc.title} headings={doc.headings} lastUpdated={lastUpdated}>
            <div className="mb-10">
                <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">{doc.title}</h1>
                <p className="text-sm text-muted-foreground">
                    Web app deployment through mobile app builds, end to end. Last updated {lastUpdated}.
                </p>
            </div>
            <MarkdownContent body={doc.body} />
        </DocsShell>
    );
}
