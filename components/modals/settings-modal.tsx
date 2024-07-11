"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { ModeToggle } from "@/components/mode-toggle";

export const SettingsModal = () => {
  const Settings = useSettings();

  return (
    <Dialog open={Settings.isOpen} onOpenChange={Settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Settings</h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="theme">Theme</label>
              <span className="text-[0.8rem] text-muted-foreground">
                Customize how Lotion looks on your device
              </span>
            </div>
            <ModeToggle />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
