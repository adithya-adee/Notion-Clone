"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { update } from "@/convex/documents";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const coverImage = useCoverImage();
  const update = useMutation(api.documents.update);
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    let res;
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      if (coverImage.url) {
        res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: coverImage.url,
          },
        });
      }
    }

    // if (file != undefined) {
    //   res = await edgestore.publicFiles.upload({
    //     file,
    //   });
    // }
    await update({
      id: params.documentId as Id<"documents">,
      coverImage: res?.url,
    });

    onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader className="text-center text-lg font-semibold">
          <h2>CoverImage</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
