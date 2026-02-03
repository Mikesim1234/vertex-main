"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { clients, navLinks, services, siteConfig, trainingAreas } from "@/lib/data/site"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 shadow-sm shadow-black/5 backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:h-24 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-foreground z-50"
        >
          <Image
            src="/vertex-logo-final.png"
            alt={`${siteConfig.name} logo`}
            width={120}
            height={80}
            className="h-12 w-auto"
            priority
          />
          <span className="text-lg tracking-tight lg:text-xl">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuTrigger className="bg-transparent text-foreground/70 hover:text-foreground hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {services.map((service) => (
                            <Link
                              key={service.id}
                              href="/#services"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                <service.icon className="h-4 w-4 text-primary" />
                                {service.title}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                {service.summary}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }

                if (link.label === "Training Areas") {
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuTrigger className="bg-transparent text-foreground/70 hover:text-foreground hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {trainingAreas.map((area) => (
                            <Link
                              key={area.id}
                              href="/#training"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                <area.icon className="h-4 w-4 text-primary" />
                                {area.title}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                {area.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }

                if (link.label === "Clients") {
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuTrigger className="bg-transparent text-foreground/70 hover:text-foreground hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {clients.slice(0, 9).map((client) => {
                              const initials = client.name
                                .split(" ")
                                .slice(0, 2)
                                .map((part) => part[0])
                                .join("")
                                .toUpperCase()

                              return (
                                <Link
                                  key={client.name}
                                  href="/#clients"
                                  className="flex select-none flex-col items-center justify-center gap-2 rounded-md border border-border/40 bg-accent/20 p-3 text-center transition-colors hover:bg-accent focus:bg-accent"
                                >
                                  {client.logo ? (
                                    <div className="relative h-8 w-full">
                                      <Image
                                        src={client.logo}
                                        alt={client.name}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                      {initials}
                                    </span>
                                  )}
                                  <span className="line-clamp-1 text-[10px] font-medium text-muted-foreground">
                                    {client.name}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                          <Link
                            href="/#clients"
                            className="text-center text-xs font-medium text-primary hover:underline"
                          >
                            View all clients
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }

                return (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent text-foreground/70 hover:text-foreground hover:bg-transparent focus:bg-transparent"
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild size="sm" className="rounded-full px-5">
            <Link href="/#contact">Book a Consultation</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-full border border-border/60 p-2 text-foreground/80 transition hover:text-foreground md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 px-4 py-6 backdrop-blur-lg md:hidden h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              if (link.label === "Services") {
                return (
                  <Accordion key={link.href} type="single" collapsible className="w-full">
                    <AccordionItem value="services" className="border-none">
                      <AccordionTrigger className="py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                        {link.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-3 py-2 pl-4">
                          {services.map((service) => (
                            <Link
                              key={service.id}
                              href="/#services"
                              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                              onClick={() => setMobileOpen(false)}
                            >
                              <service.icon className="h-4 w-4 text-primary" />
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )
              }

              if (link.label === "Training Areas") {
                return (
                  <Accordion key={link.href} type="single" collapsible className="w-full">
                    <AccordionItem value="training" className="border-none">
                      <AccordionTrigger className="py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                        {link.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-3 py-2 pl-4">
                          {trainingAreas.map((area) => (
                            <Link
                              key={area.id}
                              href="/#training"
                              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                              onClick={() => setMobileOpen(false)}
                            >
                              <area.icon className="h-4 w-4 text-primary" />
                              {area.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )
              }

              if (link.label === "Clients") {
                return (
                  <Accordion key={link.href} type="single" collapsible className="w-full">
                    <AccordionItem value="clients" className="border-none">
                      <AccordionTrigger className="py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                        {link.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 py-2 pl-2">
                          {clients.slice(0, 6).map((client) => (
                            <Link
                              key={client.name}
                              href="/#clients"
                              className="flex flex-col items-center justify-center gap-1 rounded-md border border-border/40 bg-accent/10 p-2 text-center"
                              onClick={() => setMobileOpen(false)}
                            >
                              {client.logo && (
                                <div className="relative h-6 w-full">
                                  <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              <span className="line-clamp-1 text-[10px] text-muted-foreground">
                                {client.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <Button asChild className="mt-6 w-full rounded-full">
            <Link href="/#contact" onClick={() => setMobileOpen(false)}>
              Book a Consultation
            </Link>
          </Button>
        </div>
      )}
    </header>
  )
}
