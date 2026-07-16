import { useCallback, useMemo, useState } from "react";

export interface CitationRecord {
  id: string;
  label: string;
  title: string;
  excerpt?: string;
  url?: string;
  page?: number;
}

export function useCitation(initialCitations: CitationRecord[] = []) {
  const [citations, setCitations] = useState<CitationRecord[]>(initialCitations);
  const [activeCitationId, setActiveCitationId] = useState<string | null>(initialCitations[0]?.id ?? null);

  const activeCitation = useMemo(
    () => citations.find((citation) => citation.id === activeCitationId) ?? null,
    [activeCitationId, citations]
  );

  const addCitation = useCallback((citation: CitationRecord) => {
    setCitations((current) => [...current, citation]);
    setActiveCitationId((current) => current ?? citation.id);
  }, []);

  const removeCitation = useCallback((id: string) => {
    setCitations((current) => current.filter((citation) => citation.id !== id));
    setActiveCitationId((current) => (current === id ? null : current));
  }, []);

  return { citations, activeCitation, activeCitationId, setActiveCitationId, addCitation, removeCitation };
}
