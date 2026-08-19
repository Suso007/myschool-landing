import type { Metadata } from "next";
import { loadLegalDoc, extractHeadings } from "@/lib/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
    title: "Terms of Service | NextOrg",
    description: "The terms governing a school's use of the NextOrg platform and RFID attendance hardware.",
};

export default function TermsOfServicePage() {
    const doc = loadLegalDoc("terms-of-service");
    const headings = extractHeadings(doc.body);

    return (
        <LegalPageShell title={doc.title} effectiveDate={doc.effectiveDate} lastUpdated={doc.lastUpdated} headings={headings}>
            <LegalDocument body={doc.body} />
        </LegalPageShell>
    );
}
