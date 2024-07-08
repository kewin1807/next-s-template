import LoginForm from "@/components/auth/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full flex-col pt-10">
      <h1>Login</h1>

      <LoginForm />
    </div>
  );
}
