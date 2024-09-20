import { BACKEND_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import guestAtom from "@/store/atoms/guestAtom";
import { TCreateGuest } from "@vr/common";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const GuestForm = () => {
  const { toast } = useToast();
  const refreshGuest = useRecoilRefresher_UNSTABLE(guestAtom);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TCreateGuest>();

  const submit: SubmitHandler<TCreateGuest> = async (data) => {
    try {
      const res = await axios.post(
        BACKEND_URL + "/auth/guest/signup",
        {
          name: data.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        localStorage.setItem("guest_auth_token", res.data.token);
        toast({
          title: "Signed in successfully",
        });
        refreshGuest();
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
    <div className="flex justify-center items-center mt-8">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-fit flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 rounded-[8px]">
            or continue as a
            <span className="underline ml-1 text-blue-300 hover:cursor-pointer">
              Guest
            </span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              {...register("name")}
              placeholder="username"
              required
              type="text"
            />
            <div className="flex justify-between items-center mt-2">
              <AlertDialogCancel className="border-none">
                Cancel
              </AlertDialogCancel>
              <Button type="submit" variant="outline">
                Submit
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GuestForm;
