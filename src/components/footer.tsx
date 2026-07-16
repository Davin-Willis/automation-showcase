export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          Demo by{" "}
          <a
            href="https://davinwillis.dev"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Davin Willis
          </a>
        </p>
        <p className="text-xs">
          Everything on this page is simulated and runs in your browser.
        </p>
      </div>
    </footer>
  );
}
