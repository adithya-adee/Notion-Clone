"use client";

import Image from "next/image";
import empty from "@/public/empty.png";
import emptyDark from "@/public/empty-dark.png";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Create a new note...",
      success: "New note created",
      error: "Failed to create a new note",
    });
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <Image
          src={empty}
          alt="empty"
          height={300}
          width={300}
          className="dark:hidden"
        />
        <Image
          src={emptyDark}
          alt="empty"
          height={300}
          width={300}
          className="hidden dark:block"
        />
        <h2 className="text-2xl font-medium">
          Welcome to {user?.firstName}&apos;s Lotion App!
        </h2>
        <Button onClick={onCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create a Note
        </Button>
      </div>
    </>
  );
};

export default DocumentsPage;
