import { Header } from "@/components/layout/header"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { Footer } from "@/components/layout/footer"
import { About } from "@/components/sections/about"
import { Clients } from "@/components/sections/clients"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Trainings } from "@/components/sections/trainings"

export default function Page() {
  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,146,60,0.08),_transparent_60%)] text-foreground">
      <ScrollProgress />
      <Header />
      <Hero />
      <Services />
      <Trainings />
      <Clients />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
