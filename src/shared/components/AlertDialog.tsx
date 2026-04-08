import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface AlertDialogProps {
  children?: React.ReactNode;
  heading?: string;
  description?: string;
  onConfirm?: () => void | Promise<void>;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AlertDialog = ({
  children,
  heading,
  description,
  onConfirm = () => {},

  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: AlertDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const isControlled = controlledOpen !== undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger if in UnControlled Mode */}
      {!isControlled && (
        <DialogTrigger asChild>
          {children || <Button>Open Alert</Button>}
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{heading || "Are you absolutely sure?"}</DialogTitle>

          <DialogDescription>
            {description || "This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={async () => {
              await onConfirm();
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
