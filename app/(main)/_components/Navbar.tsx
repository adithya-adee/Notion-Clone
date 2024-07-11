"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";
interface NavbarProps {
  isCollapsed: boolean;
  resetWidth: () => void;
}

export const Navbar = ({ isCollapsed, resetWidth }: NavbarProps) => {
  const params = useParams();

  const documents = useQuery(api.documents.getElementbyId, {
    documentId: params.documentId as Id<"documents">,
  });

  if (documents == undefined) {
    return (
      <>
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 flex items-center gap-x-4 w-full">
          <Title.Skeleton />
        </nav>
      </>
    );
  }
  if (documents == null) return null;

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 flex items-center gap-x-4 w-full">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={resetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={documents} />
        </div>
      </nav>
      {documents.isArchived && <Banner documentId={documents._id} />}
    </>
  );
};
