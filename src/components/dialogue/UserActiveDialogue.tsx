import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

// Reusable Delete Button with AlertDialog
export function ActiveUserButton({
  onDelete,
  userId,
}: {
  onDelete: (id: string) => void;
  userId: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full">
                <IconCheck color="green" size={20} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-primary">
              <p>Make user Active</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will make user ACTIVE!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(userId)}>
            Make Active
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
