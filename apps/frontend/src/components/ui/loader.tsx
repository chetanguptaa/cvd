import { Loader } from "lucide-react";

const MainLoader = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Loader className="animate-spin h-12 w-12  text-purple-300" />
    </div>
  );
};

export default MainLoader;
