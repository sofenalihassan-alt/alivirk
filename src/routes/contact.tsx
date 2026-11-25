import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Copy, Github, Linkedin, Loader2, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { PlaceholderTag } from "@/components/site/Placeholder";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContactMessage } from "@/lib/contact.functions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Ali Hassan — Let's Work Together" },
      {
        name: "description",
        content:
          "Get in touch with Ali Hassan for WordPress websites, SEO, graphic design or a conversation about technology. Email, WhatsApp, LinkedIn or the contact form.",
      },
      { property: "og:title", content: "Contact Ali Hassan" },
      { property: "og:description", content: "Send a message about a project, freelance work or collaboration." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

type Status = { state: "idle" } | { state: "success" } | { state: "error"; message: string };

function ContactPage() {
  const submit = useServerFn(submitContactMessage);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus({ state: "idle" });
    try {
      const res = await submit({ data: values });
      if (res.ok) {
        setStatus({ state: "success" });
        reset();
      } else {
        setStatus({ state: "error", message: res.error });
      }
    } catch {
      setStatus({ state: "error", message: "Couldn't reach the server. Check your connection and try again." });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  const channels = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: site.whatsapp.display, href: site.whatsapp.href },
    { icon: Linkedin, label: "LinkedIn", value: "ali-hassan", href: site.socials.linkedin },
    { icon: Github, label: "GitHub", value: "sofenalihassan-alt", href: site.socials.github },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build"
        accent="something together."
        intro="Have a website that needs work, an SEO question, a design idea or an opportunity to share? Send a message — I read and reply to every one personally."
      />

      <section className="container-page grid gap-10 lg:grid-cols-12" aria-label="Contact options">
        {/* Form */}
        <Reveal className="lg:col-span-7" y={40}>
          <div className="glass-lens contact-desk relative overflow-hidden rounded-lg p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status.state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}>
                    <CheckCircle2 className="size-16 text-gold" aria-hidden="true" />
                  </motion.span>
                  <h2 className="mt-6 text-3xl font-medium">Message sent.</h2>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Thank you for reaching out. I'll read your message and get back to you by email.
                  </p>
                  <button type="button" onClick={() => setStatus({ state: "idle" })} className="glass mt-8 min-h-12 rounded-full px-6 text-sm">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-6"
                  aria-label="Contact form"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Your name" id="name" error={errors.name?.message}>
                      <input id="name" autoComplete="name" {...register("name")} className={inputCls(!!errors.name)} placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                    </Field>
                    <Field label="Email address" id="email" error={errors.email?.message}>
                      <input id="email" type="email" autoComplete="email" inputMode="email" {...register("email")} className={inputCls(!!errors.email)} placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                    </Field>
                  </div>
                  <Field label="Subject" id="subject" error={errors.subject?.message}>
                    <input id="subject" {...register("subject")} className={inputCls(!!errors.subject)} placeholder="What's this about?" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} />
                  </Field>
                  <Field label="Message" id="message" error={errors.message?.message}>
                    <textarea id="message" rows={6} {...register("message")} className={cn(inputCls(!!errors.message), "resize-y py-4")} placeholder="Tell me a little about your project or question…" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                  </Field>
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
                  </div>

                  <AnimatePresence>
                    {status.state === "error" && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
                      >
                        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        {status.message}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">Your details are only used to reply to you.</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-7 font-display text-sm font-medium text-primary-foreground shadow-[var(--shadow-gold)] transition-colors hover:bg-gold-soft disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                        </>
                      ) : (
                        <>
                          Send message <ArrowUpRight className="size-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Channels */}
        <div className="space-y-4 lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Or reach me directly</p>
          </Reveal>
          {channels.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 border-b border-hairline py-6 transition-colors duration-500 hover:border-gold"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-hairline text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-muted-foreground">{label}</span>
                  <span className="block break-all font-display text-base sm:text-lg">{value}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
              <Copy className="size-4" aria-hidden="true" />
              {copied ? "Email copied!" : "Copy email address"}
            </button>
          </Reveal>
          {site.socials.others.length === 0 && (
            <Reveal delay={0.35}>
              <div className="border-l border-dashed border-hairline pl-5 text-sm text-muted-foreground">
                <PlaceholderTag>Placeholder</PlaceholderTag>
                <p className="mt-3">More profiles (e.g. Fiverr, Upwork, Instagram) can be added here.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

function inputCls(invalid: boolean) {
  return cn(
    "block min-h-12 w-full rounded-none border-0 border-b bg-background/20 px-3 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:outline-none focus-visible:outline-none",
    invalid ? "border-destructive/70" : "border-hairline hover:border-foreground/25",
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-destructive">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
