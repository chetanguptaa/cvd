import { atom } from "recoil";
import guestAtomSelector from "../selectors/guestAtomSelector";

const guestAtom = atom({
  key: "guestAtom",
  default: guestAtomSelector,
});

export default guestAtom;
