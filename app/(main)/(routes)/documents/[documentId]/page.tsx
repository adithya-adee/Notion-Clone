"use client";

import { Navbar } from "@/app/(main)/_components/Navbar";
import Navigation from "@/app/(main)/_components/Navigation";
import { Cover } from "@/components/cover";
import { Editor } from "@/components/editor";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const documents = useQuery(api.documents.getElementbyId, {
    documentId: params.documentId,
  });

  if (documents == undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="pt-4 pl-8 space-y-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (documents == null) {
    console.log(documents);
    return null;
  }

  return (
    <div className="pb-40">
      <Cover url={documents.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={documents}></Toolbar>
        <Editor onChange={() => {}} initialContent={documents.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
