"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo, useState } from "react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";

interface EditorProps {
  onChange: () => void;
  initialContent?: string;
  editable?: boolean;
}

async function saveToStorage(jsonBlocks: Block[]) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem("editorContent");
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export const Editor = ({ onChange, editable }: EditorProps) => {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  // Loads the previously stored editor contents.
  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload;
    ({
      file,
    });

    console.log(res);
  };

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }
  {
    console.log(initialContent);
  }

  // Renders the editor instance.
  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        saveToStorage(editor.document);
      }}
    />
  );
};
