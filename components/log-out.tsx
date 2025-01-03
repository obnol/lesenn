"use client";

import { logOutAction } from "@/actions/log-out.action";

export function LogOut() {
  return (
    <button className="cursor-default" onClick={logOutAction}>
      log out
    </button>
  );
}
