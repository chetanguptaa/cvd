import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { TSignup } from "@repo/common";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<TSignup>();
  const navigate = useNavigate();

  // TODO add google and apple Authentication
  const submit: SubmitHandler<TSignup> = async (data) => {
    try {
      const res = await axios.post(
        BACKEND_URL + "/auth/signup",
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        console.log(res.data);
        localStorage.setItem("authorization", res.data.token);
        toast({
          title: "Signed up successfully",
        });
        navigate("/");
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        toast({
          title: e.response?.data.error,
        });
      } else {
        toast({
          title: "Some error occured, please try again later",
        });
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
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
        <Label htmlFor="name">Name</Label>
        <Input
          {...register("name")}
          id="name"
          placeholder="john doe"
          required
          type="text"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          autoComplete="current-password"
          id="password"
          placeholder="••••••••"
          required
          type="password"
        />
      </div>
      <button className="relative h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
        <span className="relative">Register</span>
      </button>
    </form>
  );
};

export default SignupForm;
