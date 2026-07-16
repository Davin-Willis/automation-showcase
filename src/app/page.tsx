import { DemoSection } from "@/components/demo-section";
import { Footer } from "@/components/footer";
import { LeadScanDemo } from "@/components/lead-scan-demo";
import { ReceiptDemo } from "@/components/receipt-demo";

export default function Home() {
  return (
    <>
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-6 sm:pt-28">
        <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
          Automation, shown instead of explained
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          You do this by hand every week. I make it automatic.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          If you run a business, you already do jobs like the one below:
          copying numbers off receipts into a spreadsheet, week after week.
          Watch what happens when software does it instead.
        </p>
      </header>

      <main>
        <DemoSection
          index="01"
          title="Messy receipts into a clean spreadsheet."
          description="Ten transactions, exactly the way they look on a bank statement. One click, and they file themselves."
        >
          <ReceiptDemo />
        </DemoSection>

        <DemoSection
          index="02"
          title="A tool that finds opportunities while you sleep."
          description="Plenty of good local businesses still have no website, and every one of them is a customer somebody hasn't reached yet. This tool reads public business listings and quietly builds you the list."
        >
          <LeadScanDemo />
        </DemoSection>

        {/* Demo 03 (manual vs automated before/after) slots in here
            as another <DemoSection> block. */}
        <section className="mx-auto max-w-3xl px-6 pb-14">
          <p className="text-sm text-muted">
            One more demo is on the way: a side-by-side of a workday with and
            without the robots.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
