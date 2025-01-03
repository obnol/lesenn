"use client";

import { logOutAction } from "@/actions/log-out.action";

export function LogOut() {
  return <button onClick={logOutAction}>log out</button>;
}
