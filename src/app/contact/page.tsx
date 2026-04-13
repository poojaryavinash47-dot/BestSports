import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-primary">
                Contact Us
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight text-secondary">
                Send us a message
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">
                Have a question about booking, membership, or facility details? Use the form below and we&apos;ll get back to you shortly.
              </p>

              <form className="mt-10 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold uppercase tracking-[0.25em] text-secondary">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-[0.25em] text-secondary">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold uppercase tracking-[0.25em] text-secondary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={7}
                    placeholder="Tell us how we can help"
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Button type="submit" className="w-full rounded-3xl bg-secondary text-white font-black uppercase tracking-[0.3em] hover:bg-secondary/90">
                  Send Message
                </Button>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
