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
import { Icon, IconTrash } from "@tabler/icons-react";
import { LucideIcon } from "lucide-react";

// Reusable Delete Button with AlertDialog
export function ReusableDialogue({
  onDelete,
  userId,
  title,
  buttonText,
  Icon,
}: {
  onDelete: (id: string) => void;
  userId: string;
  title?: string;
  buttonText?: string;
  Icon: Icon | LucideIcon;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full">
          <Icon color="red" size={16} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{title}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(userId)}>
            {buttonText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
