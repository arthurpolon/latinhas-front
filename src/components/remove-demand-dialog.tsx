import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDisclosure } from "@/hooks/use-disclosure";
import { useDeleteDemand } from "@/query/use-delete-demand";
import { Loader2, Trash2 } from "lucide-react";

interface IProps {
  demandId: number;
}

export function RemoveDemandDialog(props: IProps) {
  const [open, handler] = useDisclosure();

  const deleteDemand = useDeleteDemand();

  const onDelete = async () => {
    await deleteDemand.mutateAsync(props.demandId);

    handler.close();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (value ? handler.open() : handler.close())}
    >
      <DialogTrigger asChild>
        <button className="bg-primary rounded py-1 px-1">
          <Trash2 className="text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Excluir Demanda</DialogTitle>
          <DialogDescription className="text-center">
            Tem certeza que deseja excluir essa demanda?
            <br />
            Essa ação não pode ser desfeita
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:justify-center">
          <DialogClose asChild>
            <Button variant={"outline"} className="flex-1">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            disabled={deleteDemand.isPending}
            className="disabled:opacity-60 flex-1"
            onClick={onDelete}
          >
            {deleteDemand.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
