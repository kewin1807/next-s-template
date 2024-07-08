import RegisterForm from "@/components/auth/register-form";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full flex-col pt-10">
      <h1>Register</h1>

      <RegisterForm />
    </div>
  );
}
