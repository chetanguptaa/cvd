import { atom } from "recoil";
import userAtomSelector from "../selectors/userAtomSelector";

const userAtom = atom({
  key: "userAtom",
  default: userAtomSelector,
});

export default userAtom;
