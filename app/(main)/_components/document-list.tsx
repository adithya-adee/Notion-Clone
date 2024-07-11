"use client";

import Spinner from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
}

export const DocumentList = ({ parentDocumentId }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  }) as Doc<"documents">[] | null;

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return <Spinner />;
  }

  if (documents === null || documents.length === 0) {
    return;
    // <p style={{ paddingLeft: "25px" }}>No Pages inside.</p>;
  }

  return (
    <>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            onExpand={() => onExpand(document._id)}
            extended={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} />
          )}
        </div>
      ))}
    </>
  );
};
