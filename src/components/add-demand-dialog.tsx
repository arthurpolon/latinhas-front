import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import DatePicker from "./date-picker";
import { useCreateDemand } from "@/query/use-create-demand";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  description: z.string(),
  totalPlan: z.string().min(1, "Campo obrigatório"),
  date: z.date(),
});

type TForm = z.infer<typeof formSchema>;

export function AddDemandDialog() {
  const [open, handler] = useDisclosure();

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      totalPlan: "",
      date: new Date(),
    },
  });

  const createDemand = useCreateDemand();

  const onSubmit = async (values: TForm) => {
    await createDemand.mutateAsync(values);

    handler.close();
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (value ? handler.open() : handler.close())}
    >
      <DialogTrigger asChild>
        <Button>+ Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Demanda</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar uma demanda
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

            <DialogFooter>
              <Button
                type="submit"
                disabled={createDemand.isPending}
                className="disabled:opacity-60"
              >
                {createDemand.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
