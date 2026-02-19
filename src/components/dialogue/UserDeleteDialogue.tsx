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
import { IconTrash } from "@tabler/icons-react";

// Reusable Delete Button with AlertDialog
export function DeleteUserButton({
  onDelete,
  userId,
  userName,
}: {
  onDelete: (id: string) => void;
  userId: string;
  userName?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full">
          <IconTrash color="red" size={16} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {userName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(userId)}>
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
