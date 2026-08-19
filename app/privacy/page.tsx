import type { Metadata } from "next";
import { loadLegalDoc, extractHeadings } from "@/lib/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
    title: "Privacy Policy | NextOrg",
    description: "How NextOrg collects, uses, and protects personal data across its school-management platform.",
};

export default function PrivacyPolicyPage() {
    const doc = loadLegalDoc("privacy-policy");
    const headings = extractHeadings(doc.body);

    return (
        <LegalPageShell title={doc.title} effectiveDate={doc.effectiveDate} lastUpdated={doc.lastUpdated} headings={headings}>
            <LegalDocument body={doc.body} />
        </LegalPageShell>
    );
}
