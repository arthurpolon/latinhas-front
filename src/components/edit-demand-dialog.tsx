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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DatePicker } from "./date-picker";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Loader2, SquarePen } from "lucide-react";
import { TDemand } from "@/types/Demand";
import { useUpdateDemand } from "@/query/use-update-demand";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  description: z.string(),
  totalPlan: z.string().min(1, "Campo obrigatório"),
  date: z.date(),
  status: z.enum(["planning", "in_progress", "completed"]),
});

type TForm = z.infer<typeof formSchema>;

interface IProps {
  demand: TDemand;
}

export function EditDemandDialog(props: IProps) {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    values: {
      date: new Date(props.demand.date),
      totalPlan: props.demand.totalPlan.toString(),
      status: props.demand.status,
      description: props.demand.description || "",
    },
  });

  const [open, handler] = useDisclosure(false, {
    onClose() {
      form.reset();
    },
  });

  const updateDemand = useUpdateDemand();

  const onSubmit = async (values: TForm) => {
    await updateDemand.mutateAsync({
      id: props.demand.id,
      payload: values,
    });

    handler.close();
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (value ? handler.open() : handler.close())}
    >
      <DialogTrigger asChild>
        <button className="bg-blue-900 rounded py-1 px-1">
          <SquarePen className="text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-lg">
        <DialogHeader>
          <DialogTitle>Editar Demanda</DialogTitle>
          <DialogDescription>
            Edite os campos abaixo para modificar uma demanda
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="totalPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total (tons)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="planning">
                        <div className="bg-red-300 w-fit py-1 px-2 rounded-lg">
                          Planejamento
                        </div>
                      </SelectItem>
                      <SelectItem value="in_progress">
                        <div className="bg-blue-300 w-fit py-1 px-2 rounded-lg">
                          Em Andamento
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="bg-green-300 w-fit py-1 px-2 rounded-lg">
                          Concluído
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancelar</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={updateDemand.isPending}
                className="disabled:opacity-60"
              >
                {updateDemand.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Editar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
