"use client";
import {
  ChevronLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  SearchIcon,
  SettingsIcon,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { UserItem } from "./user-item";
import { Item } from "./item";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { useParams } from "next/navigation";
import { Navbar } from "./Navbar";

const Navigation = () => {
  const router = useRouter();
  const settings = useSettings();
  const search = useSearch();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizeingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const create = useMutation(api.documents.create);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizeingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizeingRef.current) {
      let newWidth = event.clientX;

      if (newWidth < 240) newWidth = 240;
      if (newWidth > 480) newWidth = 480;

      if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`;
        navbarRef.current.style.setProperty("left", `${newWidth}px`);
        navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    isResizeingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = "240px";
      navbarRef.current.style.setProperty("left", "240px");
      navbarRef.current.style.width = "calc(100% - 240px)";
    }
    setTimeout(() => setIsResetting(false), 300);
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.width = "100%";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new page",
      error: "Not Authenticated",
      success: "New page created",
    });
  };

  return (
    <>
      <aside
        className={cn(
          "group/sidebar h-screen bg-secondary overflow-y-auto relative flex-col flex w-60 z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
        ref={sidebarRef}
      >
        <div
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100 "
          )}
        >
          <ChevronLeft onClick={collapse} className="h-6 w-6" />
        </div>

        <div>
          <UserItem />
          <Item label="Search" icon={SearchIcon} onClick={search.onOpen} />
          <Item
            label="Settings"
            icon={SettingsIcon}
            onClick={settings.onOpen}
          />
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>

        <div className="mt-4">
          {/* {documents?.map((document) => (
            <p key={document._id}>{document.title}</p>
          ))} */}
          <DocumentList />
          <Item onClick={handleCreate} label="Add a New Page" icon={Plus} />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item onClick={() => {}} label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72 "
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          className="opacity-0 group-hover/sidebar:opacity-100 bg-primary/10 absolute transition cursor-ew-resize h-full right-0 top-0 w-1"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} resetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full transition duration-300">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
