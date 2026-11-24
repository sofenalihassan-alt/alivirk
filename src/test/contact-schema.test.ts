import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = { name: "Sara Khan", email: "sara@example.com", subject: "Website help", message: "I need help with my WordPress site." };

describe("contact form validation", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });
  it("rejects a message shorter than 10 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "Hi there" }).success).toBe(false);
  });
  it("rejects a message longer than 3000 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(3001) }).success).toBe(false);
  });
  it("rejects a filled honeypot field", () => {
    expect(contactSchema.safeParse({ ...valid, website: "spam.com" }).success).toBe(false);
  });
});
