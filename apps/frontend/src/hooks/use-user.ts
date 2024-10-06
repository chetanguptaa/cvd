import guestAtom from "@/store/atoms/guestAtom";
import userAtom from "@/store/atoms/userAtom";
import { useRecoilValueLoadable } from "recoil";

export const useUser = (): {
  id?: string;
  name?: string;
  isGuest?: boolean;
  error?: boolean;
} | null => {
  const guest = useRecoilValueLoadable(guestAtom);
  const user = useRecoilValueLoadable(userAtom);
  if (user.state === "hasError" && guest.state === "hasError") {
    return {
      error: true,
    };
  }
  if (user.state === "hasValue") {
    return {
      id: user.getValue().id,
      name: user.getValue().name,
      isGuest: false,
    };
  }
  if (guest.state === "hasValue") {
    return {
      id: guest.getValue().id,
      name: guest.getValue().name,
      isGuest: true,
    };
  }
  return null;
};
