import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export function maskCPF(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 9);
  const p4 = digits.slice(9, 11);

  let result = p1;
  if (p2) result += `.${p2}`;
  if (p3) result += `.${p3}`;
  if (p4) result += `-${p4}`;

  return result;
}

export function unmask(value: string) {
  return value.replace(/\D/g, "");
}

export function maskCurrencyBRL(value: string) {
  const digits = unmask(value);

  if (!digits) {
    return "";
  }

  const integerPart = digits.slice(0, -2) || "0";
  const decimalPart = digits.slice(-2).padStart(2, "0");
  const formattedInteger = Number(integerPart).toLocaleString("pt-BR");

  return `${formattedInteger},${decimalPart}`;
}

export function unmaskCurrencyToDecimal(value: string) {
  const digits = unmask(value);

  if (!digits) {
    return "";
  }

  const padded = digits.padStart(3, "0");
  const integerPart = padded.slice(0, -2).replace(/^0+(?=\d)/, "") || "0";
  const decimalPart = padded.slice(-2);

  return `${integerPart}.${decimalPart}`;
}

export function formatDateBr(date: string) {
  const dateFormat = format(new Date(date), "dd/MM/yyyy", {
    locale: ptBR,
  });

  return dateFormat;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
