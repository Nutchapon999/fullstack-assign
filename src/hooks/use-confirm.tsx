import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const useConfirm = (
  title?: string,
  description?: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirmStart = () => new Promise((resolve, reject) => {
    setPromise({ resolve });
  })

  const handleClose = () => {
    setPromise(null);
  }

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  }

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent className="max-w-[400px]" notShowClose>
        <DialogHeader>
          <DialogTitle className="text-center">
            { title }
          </DialogTitle>
          <DialogDescription className="text-center">
            { description }
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <Button onClick={handleCancel} variant="outlineSecondary" className="w-full">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="destructive" className="w-full">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirmStart];
}