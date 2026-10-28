"use client";

import { startTransition, useActionState, type FormEvent } from "react";

/**
 * useActionState, submitted from onSubmit instead of the form action prop.
 * React resets a form after an action prop runs; submitting this way keeps
 * what the person typed when the server sends back a validation error.
 */
export function useFormAction<S>(
  action: (prev: Awaited<S>, formData: FormData) => Promise<S>,
  initial: Awaited<S>,
) {
  const [state, dispatch, pending] = useActionState<S, FormData>(action, initial);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  }

  return [state, onSubmit, pending] as const;
}
