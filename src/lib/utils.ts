import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(...params: Parameters<typeof format>) {
  const [date, formatStr, options] = params;

  return format(date, formatStr, {
    locale: ptBR,
    ...options,
  });
}
