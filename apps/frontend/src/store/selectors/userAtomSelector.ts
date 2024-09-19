import { BACKEND_URL } from "@/constants";
import { IUser } from "@vr/common";
import axios from "axios";
import { selector } from "recoil";

const userAtomSelector = selector({
  key: "userAtomSelector",
  get: async () => {
    const res = await axios.get<IUser>(`${BACKEND_URL}/user`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    });
    return res.data;
  },
});

export default userAtomSelector;
