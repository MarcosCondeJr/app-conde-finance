import { LoginForm } from "@/components/LoginForm";

export default function Login() {
    return (
      <div className="bg-muted flex min-h-screen min-w-screen flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    )
}