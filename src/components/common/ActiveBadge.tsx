import { Badge } from "../ui/badge";

export function ActiveBadge({active}: {active: boolean}) {
  if (active === true) {
    return (
      <Badge className="border border-green-300 bg-green-100 text-green-700 hover:bg-green-50">
        Ativo
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="border border-zinc-300 bg-zinc-100 text-zinc-600 hover:bg-zinc-100"
    >
      Inativo
    </Badge>
  );
}
