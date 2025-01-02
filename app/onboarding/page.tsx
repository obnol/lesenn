import { OnboardingForm } from "@/components/onboarding-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "onboarding",
};

export default async function Page() {
  return (
    <div className="flex pt-48">
      <div className="m-auto flex w-full max-w-[380px] flex-col py-8">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-3xl">onboarding</h1>
            <p className="font-medium text-xl text-muted-foreground">introduce yourself and get started</p>
          </div>

          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
