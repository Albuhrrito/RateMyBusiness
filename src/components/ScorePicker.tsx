/** A 1–5 score as a segmented row of radio buttons. Nothing is preselected. */
export function ScorePicker({ name, label }: { name: string; label: string }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-2 grid max-w-sm grid-cols-5 overflow-hidden rounded-md border border-rule bg-surface">
        {[1, 2, 3, 4, 5].map((value) => (
          <label
            key={value}
            className="relative flex cursor-pointer items-center justify-center border-l border-rule py-2 text-sm font-semibold tabular-nums first:border-l-0 hover:bg-paper has-checked:bg-ballpoint has-checked:text-on-ballpoint has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ballpoint-strong"
          >
            <input type="radio" name={name} value={value} required className="sr-only" />
            {value}
          </label>
        ))}
      </div>
      <div className="mt-1 flex max-w-sm justify-between text-xs text-muted">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </fieldset>
  );
}
