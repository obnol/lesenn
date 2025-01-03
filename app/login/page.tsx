import { GoBackButton } from "@/components/go-back-button";
import { OTPSignIn } from "@/components/otp-sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "login",
};

export default function Page() {
  return (
    <div className="flex pt-48">
      <div className="m-auto flex w-full max-w-[380px] flex-col py-8">
        <div className="flex w-full flex-col gap-6">
          <div className="pb-8">
            <GoBackButton />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-3xl">login to lesenn</h1>
            <p className="font-medium text-2xl text-muted-foreground">read. track. repeat.</p>
          </div>

          <div className="py-4">
            <OTPSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
