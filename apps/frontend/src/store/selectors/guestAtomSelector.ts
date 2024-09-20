import { BACKEND_URL } from "@/constants";
import { IGuest } from "@vr/common";
import axios from "axios";
import { selector } from "recoil";

const guestAtomSelector = selector({
  key: "guestAtomSelector",
  get: async () => {
    const res = await axios.get<IGuest>(`${BACKEND_URL}/guest`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("guest_auth_token")}`,
      },
    });
    return res.data;
  },
});

export default guestAtomSelector;
