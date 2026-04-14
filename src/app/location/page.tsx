import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function LocationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-primary">
                Location
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight text-secondary">
                Find us in Yelahanka New Town
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">
                Visit Best Shot Sports Arena at our Yelahanka location. Get directions, opening hours, and all the details you need to reach us easily.
              </p>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-secondary">Address</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                          686/42/3, 8th Cross Attur V, near CQAL Layout, 4th Phase, Attur Layout, Yelahanka New Town, Bengaluru, Karnataka 560064
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-secondary">Opening Hours</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Daily · 5:00 AM – 11:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-secondary">Phone</h2>
                        <p className="mt-2 text-sm text-muted-foreground">+91 96320 757 09</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-secondary">Email</h2>
                        <p className="mt-2 text-sm text-muted-foreground">bestshotbsba@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
                  <iframe
                    title="Best Shot Sports Arena Location"
                    src="https://maps.google.com/maps?q=686%2F42%2F3%2C%208th%20Cross%20Attur%20V%2C%20near%20CQAL%20Layout%2C%204th%20Phase%2C%20Attur%20Layout%2C%20Yelahanka%20New%20Town%2C%20Bengaluru%2C%20Karnataka%20560064&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="h-full min-h-[520px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="mt-10 text-sm text-muted-foreground">
                <p>
                  Need help with bookings or membership questions? <Link href="/contact" className="font-bold text-primary hover:underline">Visit our contact page</Link> for faster support.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
