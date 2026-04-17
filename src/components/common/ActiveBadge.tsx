import { Badge } from "../ui/badge";

export function ActiveBadge({active}: {active: boolean}) {
  if (active === true) {
    return (
      <Badge className="border border-green-200 bg-green-50 text-green-700 hover:bg-green-50">
        Ativo
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="border border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-100"
    >
      Inativo
    </Badge>
  );
}
