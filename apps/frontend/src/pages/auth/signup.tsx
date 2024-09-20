import GuestForm from "@/components/auth/guest-form";
import SignupForm from "@/components/auth/signup-form";
import { Icons } from "@/components/header/icons";
import AuthWrapper from "@/wrappers/auth";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <AuthWrapper>
      <div className="flex min-h-[100dvh] relative items-center justify-center bg-gray-100 px-4 ">
        <div className="absolute inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] h-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] h-full"></div>
        <div className="absolute top-0 z-[-1] h-screen w-screen"></div>
        <div className="mx-auto z-10 text-gray-700 w-full max-w-[500px]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-normal font-geist tracking-tighter">
              Sign Up
            </h1>
          </div>
          <SignupForm />
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link
                className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
                to="/auth/signin"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-center gap-4">
              <button className="relative flex justify-center items-center  h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Continue with GitHub
              </button>
              <button className="relative flex justify-center items-center  h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
                <Icons.google className="mr-2 h-4 w-4" />
                Continue with Google
              </button>
            </div>
          </div>
          <GuestForm />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignupPage;
