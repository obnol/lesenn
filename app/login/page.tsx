import { OTPSignIn } from "@/components/otp-sign-in";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "login",
};

export default function Page() {
  return (
    <div className="flex pt-48">
      <div className="m-auto flex w-full max-w-[380px] flex-col py-8">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-3xl">login to lesenn</h1>
            <p className="font-medium text-2xl text-muted-foreground">read. track. repeat.</p>
          </div>

          <div className="py-4">
            <OTPSignIn />
          </div>

          <p className="text-xs text-muted-foreground">
            by clicking continue, you acknowledge that you have read and agree to lesenn&apos;s{" "}
            <Link href="/terms" className="underline">
              terms of service
            </Link>{" "}
            and{" "}
            <Link href="/policy" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
