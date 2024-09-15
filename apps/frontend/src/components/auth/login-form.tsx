import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TSignin } from "@repo/common";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register } = useForm<TSignin>();
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          id="email"
          placeholder="me@example.com"
          required
          type="email"
          autoComplete="email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          id="password"
          placeholder="••••••••"
          required
          type="password"
          autoComplete="current-password"
        />
      </div>
      <button className="relative h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
        <span className="relative">Sign In</span>
      </button>
    </form>
  );
};

export default LoginForm;
