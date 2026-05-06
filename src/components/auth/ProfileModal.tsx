import type { UserResponse } from "@/types/user/UserResponse";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { maskCPF } from "@/utils/masks";

export default function ProfileModal({ user, open, onClose }: { user: UserResponse, open: boolean, onClose: () => void; }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>Perfil</DialogHeader>
        <div className="flex items-center justify-center">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="imagem-usuario"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel>Nome</FieldLabel>
            <Input disabled={true} value={user.name} />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input disabled={true} value={user.email} />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel>CPF</FieldLabel>
            <Input disabled={true} value={maskCPF(user.login)} />
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
