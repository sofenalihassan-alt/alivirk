import { z } from "zod";

/** Shared by the form (client) and the server function — keep limits in sync with the database checks. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be under 255 characters"),
  subject: z.string().trim().min(3, "Please add a short subject").max(150, "Subject must be under 150 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Your message should be at least 10 characters")
    .max(3000, "Message must be under 3,000 characters"),
  /** Honeypot — real visitors never fill this in. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
