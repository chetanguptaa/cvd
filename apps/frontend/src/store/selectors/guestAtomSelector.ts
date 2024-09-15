import { BACKEND_URL } from "@/constants";
import { IGuest } from "@repo/common";
import axios from "axios";
import { selector } from "recoil";

const guestAtomSelector = selector({
  key: "guestAtomSelector",
  get: async () => {
    const res = await axios.get<IGuest>(`${BACKEND_URL}/guest`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    });
    return res.data;
  },
});

export default guestAtomSelector;
