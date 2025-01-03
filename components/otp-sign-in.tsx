"use client";

import { createClient } from "@/lib/supabase/client";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { otpSignInSchema, OtpSignInSchemaFormValues } from "@/actions/schema";
import { verifyOtpAction } from "@/actions/verify-otp.action";

export function OTPSignIn() {
  const verifyOtp = useAction(verifyOtpAction);
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const supabase = createClient();

  const form = useForm<OtpSignInSchemaFormValues>({
    resolver: zodResolver(otpSignInSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: OtpSignInSchemaFormValues) {
    setLoading(true);
    setEmail(email);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error("failed to send otp");
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);

      toast.success("check your email for the otp");
    }
  }

  async function onComplete(token: string) {
    verifyOtp.execute({ token, email });
  }

  if (isSent) {
    return (
      <div className="flex flex-col space-y-4 items-center">
        <InputOTP maxLength={6} onComplete={onComplete} disabled={verifyOtp.status === "executing"}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="w-[62px] h-[62px]" />
            <InputOTPSlot index={1} className="w-[62px] h-[62px]" />
            <InputOTPSlot index={2} className="w-[62px] h-[62px]" />
            <InputOTPSlot index={3} className="w-[62px] h-[62px]" />
            <InputOTPSlot index={4} className="w-[62px] h-[62px]" />
            <InputOTPSlot index={5} className="w-[62px] h-[62px]" />
          </InputOTPGroup>
        </InputOTP>

        <button onClick={() => setSent(false)} type="button" className="text-sm">
          try again
        </button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="enter email" {...field} autoCapitalize="false" autoCorrect="false" spellCheck="false" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <span>continue</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
