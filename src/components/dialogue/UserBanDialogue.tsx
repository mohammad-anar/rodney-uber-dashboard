import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconBan } from "@tabler/icons-react";

// Reusable Delete Button with AlertDialog
export function BanUserButton({
  onDelete,
  userId,
}: {
  onDelete: (id: string) => void;
  userId: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="bg-transparent cursor-pointer hover:bg-gray-300 p-2 duration-300 rounded-full">
          <IconBan color="red" size={16} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will block this user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(userId)}>
            Ban
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
