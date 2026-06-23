import { useAtomValue, useSetAtom } from "jotai";
import { memo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  cancelWritePinDefAtom,
  executeWritePinDefAtom,
  pendingWritePinDefAtom,
} from "@/lib/stores";

const PinChangeConfirmDialogRaw = () => {
  const pending = useAtomValue(pendingWritePinDefAtom);
  const execute = useSetAtom(executeWritePinDefAtom);
  const cancel = useSetAtom(cancelWritePinDefAtom);
  return (
    <AlertDialog open={!!pending}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Pin: ${pending?.affectedPins.join(" ") ?? ""} state will be changed due to this operation, continue?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={execute}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const PinChangeConfirmDialog = memo(PinChangeConfirmDialogRaw);
