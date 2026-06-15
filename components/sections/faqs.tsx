import { homepageFaqs } from "@/lib/data/site"

export function Faqs() {
  return (
    <section id="faqs" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">FAQs</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Questions employers ask before choosing an HR partner in Kenya.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            Clear answers on recruitment, staffing, HR outsourcing, corporate training, and HR consulting support.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {homepageFaqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-border/60 bg-white/85 p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-foreground/70">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
