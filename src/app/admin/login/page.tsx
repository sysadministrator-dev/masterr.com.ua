"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-neutral-900/60 p-8 sm:p-10"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white">
          М
        </div>
        <h1 className="mb-8 text-center text-2xl font-bold text-white">Майстерня</h1>

        <label htmlFor="username" className="sr-only">Логін</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Логін"
          required
          autoFocus
          autoComplete="username"
          className="mb-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
        />

        <label htmlFor="password" className="sr-only">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          autoComplete="current-password"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
        />

        {state?.error && <p className="mt-4 text-center text-sm text-red-400">{state.error}</p>}

        <div className="my-6 border-t border-white/10" />

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </main>
  );
}
