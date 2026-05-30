/**
 * @module JoineeForm
 * @description Joinee display ID and access code login form.
 * @author auto
 * @since 1.0.0
 */
"use client";

import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@onboarding/ui";
import styles from "@/app/(auth)/login/_styles/AuthForm.module.scss";
import { en } from "@/i18n/en";
import { loginJoinee } from "@/lib/apiClient";
import { useSessionStore } from "@/stores/sessionStore";

/**
 * Renders joinee access controls.
 * @returns Joinee login form.
 */
export function JoineeForm(): JSX.Element {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);
  const [displayId, setDisplayId] = useState("JN-2026-00042");
  const [accessCode, setAccessCode] = useState("firstday");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles joinee login form submission.
   * @param event - Form submit event.
   */
  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!/^JN-\d{4}-\d{5}$/.test(displayId) || accessCode.length < 6) {
      setError(en.loginJoineeError);
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      const session = await loginJoinee({ accessCode, displayId });
      setSession("joinee", session.token, displayId);
      router.push(session.redirectTo);
    } catch {
      setError(en.loginJoineeError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.header}>
        <h2 className={styles.title}>{en.loginJoineeTitle}</h2>
        <p className={styles.copy}>{en.loginJoineeCopy}</p>
      </div>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>{en.loginDisplayIdLabel}</span>
          <input
            className={styles.input}
            onChange={(event) => setDisplayId(event.target.value.toUpperCase())}
            placeholder="JN-2026-00042"
            value={displayId}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{en.loginAccessCodeLabel}</span>
          <input
            className={styles.input}
            onChange={(event) => setAccessCode(event.target.value)}
            placeholder="Access code"
            type="password"
            value={accessCode}
          />
        </label>
      </div>
      {error ? <div className={`${styles.message} ${styles.error}`}>{error}</div> : null}
      <Button className={styles.button} disabled={isSubmitting} type="submit" variant="secondary">
        <KeyRound size={16} />
        {isSubmitting ? en.redirecting : en.loginJoineeCta}
      </Button>
    </form>
  );
}
