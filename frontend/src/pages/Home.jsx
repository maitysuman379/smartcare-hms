import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProfileMenu from "../components/ProfileMenu.jsx";
import ReviewSection from "../components/ReviewSection.jsx";

import {
  getCurrentUser,
  getMyPatient,
  getAllDoctors,
  createAppointment,
} from "../services/api.js";

/* ---------- Styles (self-contained: every rule is scoped under .hm-page) ---------- */
const styles = `
.hm-page {
  --hm-bg: #f3f8f8;
  --hm-card: #ffffff;
  --hm-text: #0f2f33;
  --hm-soft: #5b7479;
  --hm-border: #dbe7e8;
  --hm-tile: #f3f8f8;
  --hm-brand: #0f5a5e;
  --hm-brand-2: #178a86;
  --hm-mint: #a7e8d8;
  --hm-danger: #dc2626;
  --hm-danger-bg: #fee2e2;
  --hm-success: #15803d;
  --hm-success-bg: #dcfce7;
  --hm-warn: #b45309;
  --hm-warn-bg: #fef3c7;
  --hm-radius: 20px;
  --hm-shadow: 0 1px 2px rgba(15, 47, 51, 0.05),
    0 8px 24px rgba(15, 47, 51, 0.07);

  position: fixed;
  inset: 0;
  z-index: 1500;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  background: var(--hm-bg);
  color: var(--hm-text);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.hm-page *,
.hm-page *::before,
.hm-page *::after {
  box-sizing: border-box;
}

.hm-page :where(h1, h2, h3, p) {
  margin: 0;
}

.hm-page :is(h1, h2, h3) {
  font-family: inherit;
}

.hm-page :where(a) {
  color: inherit;
  text-decoration: none;
}

.hm-page :focus-visible {
  outline: 2px solid var(--hm-brand);
  outline-offset: 2px;
}

.hm-page section[id] {
  scroll-margin-top: 72px;
}

/* ---------- Top bar ---------- */
.hm-page .hm-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--hm-border);
}

.hm-page .hm-topbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
}

.hm-page .hm-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 800;
  color: var(--hm-brand);
  white-space: nowrap;
}

.hm-page .hm-brand-mark {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: var(--hm-brand);
  color: #ffffff;
  font-weight: 800;
}

.hm-page .hm-nav {
  display: flex;
  align-items: center;
  gap: 26px;
}

.hm-page .hm-nav a,
.hm-page .hm-nav button {
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--hm-soft);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: color 0.15s ease;
}

.hm-page .hm-nav a:hover,
.hm-page .hm-nav button:hover {
  color: var(--hm-brand);
}

.hm-page .hm-nav-mobile-only {
  display: none !important;
}

.hm-page .hm-topbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hm-page .hm-burger {
  display: none;
  width: 40px;
  height: 40px;
  padding: 0 9px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  border: 1px solid var(--hm-border);
  border-radius: 10px;
  background: #ffffff;
  cursor: pointer;
}

.hm-page .hm-burger span {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--hm-brand);
}

/* ---------- Buttons ---------- */
.hm-page .hm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease,
    transform 0.1s ease;
}

.hm-page .hm-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.hm-page .hm-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.hm-page .hm-btn--primary {
  color: #ffffff;
  background: var(--hm-brand);
}

.hm-page .hm-btn--primary:hover:not(:disabled) {
  background: #0c4a4d;
}

.hm-page .hm-btn--ghost {
  color: var(--hm-brand);
  background: #ffffff;
  border-color: var(--hm-border);
}

.hm-page .hm-btn--ghost:hover:not(:disabled) {
  border-color: var(--hm-brand);
  background: color-mix(in srgb, var(--hm-brand) 6%, #ffffff);
}

.hm-page .hm-btn--light {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
}

.hm-page .hm-btn--light:hover {
  background: rgba(255, 255, 255, 0.2);
}

.hm-page .hm-btn--mint {
  color: #0b4247;
  background: var(--hm-mint);
}

.hm-page .hm-btn--mint:hover {
  background: #c1f0e4;
}

.hm-page .hm-btn--lg {
  padding: 14px 28px;
  font-size: 15px;
}

/* ---------- Hero ---------- */
.hm-page .hm-hero {
  position: relative;
  overflow: hidden;
  padding: 96px 24px 80px;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(circle at 15% 20%, rgba(167, 232, 216, 0.22), transparent 40%),
    radial-gradient(circle at 90% 85%, rgba(167, 232, 216, 0.14), transparent 45%),
    linear-gradient(135deg, #0f4c55 0%, #0d5a5c 55%, #0b4247 100%);
}

.hm-page .hm-hero-inner {
  max-width: 700px;
  text-align: center;
  color: #ffffff;
}

.hm-page .hm-hero-badge {
  display: inline-block;
  margin-bottom: 22px;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--hm-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 1px solid rgba(167, 232, 216, 0.5);
}

.hm-page .hm-hero h1 {
  margin-bottom: 20px;
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hm-page .hm-hero h1 span {
  color: var(--hm-mint);
}

.hm-page .hm-hero-text {
  max-width: 560px;
  margin: 0 auto 32px;
  font-size: 16px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
}

.hm-page .hm-hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 48px;
}

.hm-page .hm-hero-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 48px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.hm-page .hm-hero-stats strong {
  display: block;
  font-size: 28px;
  font-weight: 800;
}

.hm-page .hm-hero-stats span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

/* ---------- Sections ---------- */
.hm-page .hm-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 20px;
}

.hm-page .hm-band {
  background: #ffffff;
  border-top: 1px solid var(--hm-border);
  border-bottom: 1px solid var(--hm-border);
}

.hm-page .hm-band-tint {
  background: #e6f4f4;
}

.hm-page .hm-head {
  max-width: 560px;
  margin: 0 auto 40px;
  text-align: center;
}

.hm-page .hm-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--hm-brand);
  background: color-mix(in srgb, var(--hm-brand) 10%, transparent);
  padding: 5px 12px;
  border-radius: 999px;
}

.hm-page .hm-title {
  margin: 12px 0 8px;
  font-size: clamp(24px, 3.4vw, 32px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hm-page .hm-sub {
  font-size: 15px;
  color: var(--hm-soft);
}

.hm-page .hm-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.hm-page .hm-card {
  padding: 26px 24px;
  background: var(--hm-card);
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius);
  box-shadow: var(--hm-shadow);
  min-width: 0;
}

.hm-page .hm-card--hover {
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hm-page .hm-card--hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(15, 76, 85, 0.14);
}

.hm-page .hm-card h3 {
  margin-bottom: 6px;
  font-size: 17px;
  font-weight: 700;
}

.hm-page .hm-card p {
  font-size: 14px;
  color: var(--hm-soft);
}

.hm-page .hm-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 16px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  font-size: 22px;
  color: var(--hm-brand);
  background: color-mix(in srgb, var(--hm-brand) 12%, transparent);
}

.hm-page .hm-icon--round {
  border-radius: 50%;
}

/* Steps */
.hm-page .hm-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.hm-page .hm-step {
  position: relative;
  padding: 0 8px;
  text-align: center;
}

.hm-page .hm-step-num {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  margin: 0 auto 14px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-weight: 800;
  color: #ffffff;
  background: var(--hm-brand);
}

.hm-page .hm-step h3 {
  margin-bottom: 6px;
  font-size: 15px;
  font-weight: 700;
}

.hm-page .hm-step p {
  font-size: 13px;
  color: var(--hm-soft);
}

.hm-page .hm-step-line {
  position: absolute;
  top: 19px;
  left: calc(50% + 28px);
  width: calc(100% - 16px);
  height: 2px;
  background: var(--hm-border);
}

/* Doctors */
.hm-page .hm-avatar {
  width: 58px;
  height: 58px;
  margin: 0 auto 14px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 17px;
  font-weight: 800;
  color: #ffffff;
  background: linear-gradient(135deg, var(--hm-brand), var(--hm-brand-2));
}

.hm-page .hm-doctor-meta {
  margin-bottom: 12px;
}

.hm-page .hm-status {
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: var(--hm-soft);
}

/* Badges + messages */
.hm-page .hm-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.hm-page .hm-badge--low {
  color: var(--hm-success);
  background: var(--hm-success-bg);
}

.hm-page .hm-badge--medium {
  color: var(--hm-warn);
  background: var(--hm-warn-bg);
}

.hm-page .hm-error {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--hm-danger);
  background: var(--hm-danger-bg);
}

.hm-page .hm-error--center {
  max-width: 700px;
  margin: 0 auto 20px;
  text-align: center;
}

.hm-page .hm-ok {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--hm-success);
  background: var(--hm-success-bg);
}

/* Appointment */
.hm-page .hm-appt {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.35fr 0.9fr;
  gap: 24px;
  align-items: start;
}

.hm-page .hm-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.hm-page .hm-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--hm-tile);
}

.hm-page .hm-field--full {
  grid-column: 1 / -1;
}

.hm-page .hm-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hm-soft);
}

.hm-page .hm-input {
  display: block;
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.4;
  color: var(--hm-text);
  background: #ffffff;
  border: 1px solid var(--hm-border);
  border-radius: 10px;
}

.hm-page .hm-input:focus {
  outline: none;
  border-color: var(--hm-brand);
  box-shadow: 0 0 0 3px rgba(15, 90, 94, 0.14);
}

.hm-page .hm-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hm-page .hm-submit {
  width: 100%;
  padding: 13px 22px;
  font-size: 15px;
}

.hm-page .hm-info h3 {
  margin-bottom: 8px;
  font-size: 20px;
  color: var(--hm-brand);
}

.hm-page .hm-info > p {
  margin-bottom: 20px;
}

.hm-page .hm-checks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hm-page .hm-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.hm-page .hm-check-mark {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 800;
  color: var(--hm-brand);
  background: color-mix(in srgb, var(--hm-brand) 12%, transparent);
}

.hm-page .hm-check p {
  font-size: 14px;
}

.hm-page .hm-note {
  margin-top: 20px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 13px;
  color: var(--hm-soft);
  background: var(--hm-tile);
}

.hm-page .hm-note a {
  font-weight: 700;
  color: var(--hm-brand);
}

.hm-page .hm-patient {
  margin-top: 20px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 14px;
  font-size: 13px;
  background: var(--hm-tile);
}

.hm-page .hm-patient strong {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hm-soft);
}

.hm-page .hm-patient span {
  font-size: 15px;
  font-weight: 700;
}

.hm-page .hm-patient small {
  color: var(--hm-soft);
}

/* FAQ */
.hm-page .hm-faq {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hm-page .hm-faq-item {
  overflow: hidden;
  background: var(--hm-card);
  border: 1px solid var(--hm-border);
  border-radius: 16px;
  box-shadow: var(--hm-shadow);
  transition: border-color 0.2s ease;
}

.hm-page .hm-faq-item--open {
  border-color: var(--hm-brand);
}

.hm-page .hm-faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  color: var(--hm-text);
  background: none;
  border: 0;
  cursor: pointer;
}

.hm-page .hm-faq-q:hover {
  color: var(--hm-brand);
}

.hm-page .hm-faq-icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  color: var(--hm-brand);
  background: color-mix(in srgb, var(--hm-brand) 12%, transparent);
  transition: transform 0.2s ease;
}

.hm-page .hm-faq-item--open .hm-faq-icon {
  transform: rotate(45deg);
}

.hm-page .hm-faq-a {
  padding: 0 20px 18px;
}

.hm-page .hm-faq-a p {
  font-size: 14px;
  line-height: 1.65;
  color: var(--hm-soft);
}

/* Contact */
.hm-page .hm-contact {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.hm-page .hm-contact .hm-card {
  text-align: center;
}

.hm-page .hm-contact strong {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hm-brand);
}

.hm-page .hm-contact p {
  overflow-wrap: anywhere;
}

.hm-page .hm-contact hr {
  margin: 10px 0;
  border: 0;
  border-top: 1px solid var(--hm-border);
}

/* Footer */
.hm-page .hm-footer {
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  font-size: 13px;
  color: var(--hm-soft);
  background: #ffffff;
  border-top: 1px solid var(--hm-border);
}

/* ---------- Responsive ---------- */
@media (max-width: 860px) {
  .hm-page .hm-burger { display: flex; }
  .hm-page .hm-topbar-actions > .hm-btn { display: none; }
  .hm-page .hm-nav-mobile-only { display: block !important; }

  .hm-page .hm-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 6px 20px 10px;
    background: #ffffff;
    border-bottom: 1px solid var(--hm-border);
    box-shadow: 0 10px 24px rgba(15, 47, 51, 0.1);
  }

  .hm-page .hm-nav--open { display: flex; }

  .hm-page .hm-nav a,
  .hm-page .hm-nav button {
    width: 100%;
    padding: 14px 4px;
    text-align: left;
    border-bottom: 1px solid var(--hm-border);
  }

  .hm-page .hm-nav > :last-child { border-bottom: 0; }

  .hm-page .hm-grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hm-page .hm-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hm-page .hm-step-line { display: none; }
  .hm-page .hm-appt { grid-template-columns: 1fr; }
  .hm-page .hm-contact { grid-template-columns: 1fr; }
  .hm-page .hm-section { padding: 48px 20px; }
}

@media (max-width: 640px) {
  .hm-page .hm-hero { padding: 64px 18px 52px; }
  .hm-page .hm-hero-text { font-size: 14px; }
  .hm-page .hm-hero-actions { flex-direction: column; }
  .hm-page .hm-hero-actions .hm-btn { width: 100%; }
  .hm-page .hm-hero-stats { gap: 24px; }

  .hm-page .hm-grid-3,
  .hm-page .hm-steps,
  .hm-page .hm-form { grid-template-columns: 1fr; }

  .hm-page .hm-field--full { grid-column: auto; }
  .hm-page .hm-card { padding: 20px 18px; }
  .hm-page .hm-faq-q { padding: 16px; font-size: 14px; }
  .hm-page .hm-faq-a { padding: 0 16px 16px; }

  /* 16px inputs stop mobile browsers from zooming in on focus */
  .hm-page .hm-input { font-size: 16px; }
}

@media (max-width: 480px) {
  .hm-page .hm-brand-name { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hm-page { scroll-behavior: auto; }
  .hm-page .hm-btn,
  .hm-page .hm-card--hover,
  .hm-page .hm-faq-icon { transition: none; }
}
`;

/* ---------- Content ---------- */
const services = [
  {
    title: "Heart Disease",
    icon: "♥",
    desc: "AI-based risk screening from your vitals — BP, cholesterol indicators, and history.",
  },
  {
    title: "Diabetes",
    icon: "◈",
    desc: "Glucose-based risk prediction, matched instantly with an Endocrinologist.",
  },
  {
    title: "Kidney Disease",
    icon: "◐",
    desc: "Early risk detection so you get routed to a Nephrologist without delay.",
  },
];

const steps = [
  {
    title: "Register",
    desc: "Create your patient account in under a minute.",
  },
  {
    title: "Fill health profile",
    desc: "Submit your vitals and symptoms.",
  },
  {
    title: "Get matched",
    desc: "AI predicts risk and finds the right specialist.",
  },
  {
    title: "Book appointment",
    desc: "Confirm a slot with your matched doctor.",
  },
];

const appointmentPerks = [
  "Choose from available doctors",
  "Select your preferred date and time",
  "Appointment is stored in the HMS database",
  "View your appointment from your dashboard",
  "AI-recommended appointments are also supported",
];

const faqs = [
  {
    question: "How does the AI health assessment work?",
    answer:
      "You submit your vitals and symptoms through your health profile. A trained machine-learning model estimates a risk percentage for the conditions SmartCare screens — Heart Disease, Diabetes and Kidney Disease — and shows the result on your dashboard.",
  },
  {
    question: "Is the AI result a medical diagnosis?",
    answer:
      "No. The result is a screening estimate that helps point you to the right specialist. It cannot replace an examination, tests or advice from a qualified doctor, so please consult one before making any health decision.",
  },
  {
    question: "How is my doctor chosen?",
    answer:
      "Your predicted condition is mapped to a specialization — for example, a heart-related result points to Cardiology. If no specialist in that field is available, you are matched with a General Medicine doctor instead.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Log in with a patient account, open the Book an appointment section on this page, choose an available doctor, a date and a time, and submit. Your booking is saved and you can see it from your dashboard.",
  },
  {
    question: "Why do I need to verify my email?",
    answer:
      "When you register, we send a 6-digit code to your email address. Entering it confirms the address belongs to you and keeps accounts secure. The code expires after 10 minutes, and you can request a new one.",
  },
  {
    question: "Can doctors register on SmartCare?",
    answer:
      "Yes. Choose Doctor when registering and verify your email. The hospital admin then sets up your doctor profile — specialization, fee and availability — before you appear in the doctor list.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Passwords are stored in hashed form, access uses secure login tokens, and role-based permissions control what patients, doctors and admins can see. SmartCare HMS is an academic project, so please avoid entering real sensitive medical details while testing.",
  },
];

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How it works" },
  { href: "#doctors", label: "Doctors" },
  { href: "#appointment", label: "Appointment" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

/* ---------- Helpers (outside render) ---------- */
const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getInitials = (name) =>
  (name || "Doctor")
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ---------- Small components (outside render so inputs keep focus) ---------- */
function SectionHead({ eyebrow, title, subtitle }) {
  return (
    <div className="hm-head">
      <span className="hm-eyebrow">{eyebrow}</span>
      <h2 className="hm-title">{title}</h2>
      {subtitle && <p className="hm-sub">{subtitle}</p>}
    </div>
  );
}

function Field({ id, label, full = false, children }) {
  return (
    <div className={`hm-field${full ? " hm-field--full" : ""}`}>
      <label className="hm-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const user = getCurrentUser();
  const userRole = user?.role || null;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [doctorsError, setDoctorsError] = useState("");

  const [appointmentPatient, setAppointmentPatient] = useState(null);

  const [appointmentForm, setAppointmentForm] = useState({
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [appointmentMessage, setAppointmentMessage] = useState("");
  const [appointmentError, setAppointmentError] = useState("");

  /* Load real doctors */
  useEffect(() => {
    async function loadDoctors() {
      try {
        setDoctorsLoading(true);
        setDoctorsError("");

        const data = await getAllDoctors();

        setDoctors(data.doctors || []);
      } catch (error) {
        console.error("Failed to load doctors:", error);

        setDoctorsError(
          error.message || "Failed to load doctors from the server.",
        );
      } finally {
        setDoctorsLoading(false);
      }
    }

    loadDoctors();
  }, []);

  /* Load patient profile (logged-in patients only) */
  useEffect(() => {
    async function loadPatient() {
      if (userRole !== "PATIENT") {
        setAppointmentPatient(null);
        return;
      }

      try {
        const data = await getMyPatient();

        setAppointmentPatient(data.patient);
      } catch (error) {
        console.error("Failed to load patient profile:", error);

        setAppointmentError(error.message || "Failed to load patient profile.");
      }
    }

    loadPatient();
  }, [userRole]);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleDashboard = () => {
    closeMenu();

    if (userRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (userRole === "DOCTOR") {
      navigate("/doctor/dashboard");
    } else if (userRole === "PATIENT") {
      navigate("/patient/dashboard");
    }
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;

    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAppointmentError("");
    setAppointmentMessage("");
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    setAppointmentError("");
    setAppointmentMessage("");

    if (!user) {
      setAppointmentError(
        "Please login as a patient before booking an appointment.",
      );

      navigate("/login");
      return;
    }

    if (userRole !== "PATIENT") {
      setAppointmentError(
        "Only patient accounts can book appointments from this form.",
      );
      return;
    }

    if (!appointmentPatient?.id) {
      setAppointmentError(
        "Patient profile not found. Please complete your patient profile.",
      );
      return;
    }

    if (
      !appointmentForm.doctor_id ||
      !appointmentForm.appointment_date ||
      !appointmentForm.appointment_time
    ) {
      setAppointmentError(
        "Please select a doctor, appointment date and appointment time.",
      );
      return;
    }

    if (appointmentForm.appointment_date < getTodayDate()) {
      setAppointmentError("Appointment date cannot be in the past.");
      return;
    }

    try {
      setAppointmentLoading(true);

      const appointmentCode = `APT-${Date.now()}`;

      await createAppointment({
        appointment_code: appointmentCode,
        patient_id: appointmentPatient.id,
        doctor_id: Number(appointmentForm.doctor_id),
        appointment_date: appointmentForm.appointment_date,
        appointment_time: appointmentForm.appointment_time,
        reason:
          appointmentForm.reason.trim() ||
          "Manual appointment booking from home page",
      });

      setAppointmentMessage(
        `Appointment booked successfully. Appointment code: ${appointmentCode}`,
      );

      setAppointmentForm({
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
      });
    } catch (error) {
      console.error("Appointment booking error:", error);

      setAppointmentError(error.message || "Failed to book appointment.");
    } finally {
      setAppointmentLoading(false);
    }
  };

  const availableDoctors = doctors.filter(
    (doctor) => doctor.availability_status === "AVAILABLE",
  );

  return (
    <div className="hm-page">
      <style>{styles}</style>

      {/* ================= TOP BAR ================= */}
      <header className="hm-topbar">
        <div className="hm-topbar-inner">
          <div className="hm-brand">
            <span className="hm-brand-mark">+</span>
            <span className="hm-brand-name">SmartCare HMS</span>
          </div>

          <nav
            className={`hm-nav${mobileMenuOpen ? " hm-nav--open" : ""}`}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="hm-nav-mobile-only"
                  onClick={closeMenu}
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="hm-nav-mobile-only"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <button
                type="button"
                className="hm-nav-mobile-only"
                onClick={handleDashboard}
              >
                Dashboard
              </button>
            )}
          </nav>

          <div className="hm-topbar-actions">
            {!user ? (
              <>
                <Link to="/login" className="hm-btn hm-btn--ghost">
                  Log in
                </Link>

                <Link to="/register" className="hm-btn hm-btn--primary">
                  Register
                </Link>
              </>
            ) : (
              <ProfileMenu />
            )}

            <button
              type="button"
              className="hm-burger"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="hm-hero">
        <div className="hm-hero-inner">
          <span className="hm-hero-badge">AI-powered diagnosis matching</span>

          <h1>
            Care that finds <span>the right specialist</span> for you.
          </h1>

          <p className="hm-hero-text">
            Submit your health profile and let SmartCare's AI model predict your
            risk for Heart Disease, Diabetes, or Kidney Disease — then connect
            you with the right doctor, automatically.
          </p>

          <div className="hm-hero-actions">
            {!user ? (
              <>
                <Link to="/register" className="hm-btn hm-btn--mint hm-btn--lg">
                  Get Started
                </Link>

                <Link to="/login" className="hm-btn hm-btn--light hm-btn--lg">
                  Log in
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="hm-btn hm-btn--mint hm-btn--lg"
                onClick={() => navigate("/patient/health-profile")}
              >
                Get Started
              </button>
            )}
          </div>

          <div className="hm-hero-stats">
            <div>
              <strong>3</strong>
              <span>Conditions screened</span>
            </div>

            <div>
              <strong>{doctors.length}</strong>
              <span>Specialist doctors</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Booking access</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="hm-section">
        <SectionHead
          eyebrow="What we screen for"
          title="Our services"
          subtitle="Three well-documented conditions, screened with a trained classification model."
        />

        <div className="hm-grid-3">
          {services.map((service) => (
            <div key={service.title} className="hm-card hm-card--hover">
              <div className="hm-icon">{service.icon}</div>

              <h3>{service.title}</h3>

              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <div className="hm-band">
        <section id="how" className="hm-section">
          <SectionHead eyebrow="Simple process" title="How it works" />

          <div className="hm-steps">
            {steps.map((step, index) => (
              <div key={step.title} className="hm-step">
                <div className="hm-step-num">{index + 1}</div>

                <h3>{step.title}</h3>

                <p>{step.desc}</p>

                {index < steps.length - 1 && <div className="hm-step-line" />}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= DOCTORS ================= */}
      <section id="doctors" className="hm-section">
        <SectionHead eyebrow="Meet the team" title="Our doctors" />

        {doctorsLoading && <div className="hm-status">Loading doctors...</div>}

        {doctorsError && (
          <p className="hm-error hm-error--center" role="alert">
            {doctorsError}
          </p>
        )}

        {!doctorsLoading && !doctorsError && doctors.length === 0 && (
          <div className="hm-status">No doctors available.</div>
        )}

        <div className="hm-grid-3">
          {doctors.map((doctor) => {
            const isAvailable = doctor.availability_status === "AVAILABLE";

            return (
              <div key={doctor.id} className="hm-card hm-card--hover">
                <div className="hm-avatar">{getInitials(doctor.name)}</div>

                <h3>{doctor.name}</h3>

                <p className="hm-doctor-meta">
                  {doctor.specialization || "General Medicine"}
                  {doctor.experience ? ` · ${doctor.experience}` : ""}
                </p>

                <span
                  className={`hm-badge ${
                    isAvailable ? "hm-badge--low" : "hm-badge--medium"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= APPOINTMENT ================= */}
      <div className="hm-band hm-band-tint">
        <section id="appointment" className="hm-section">
          <SectionHead
            eyebrow="Book your visit"
            title="Book an appointment"
            subtitle="Choose a doctor, select your preferred date and time, and submit your appointment request."
          />

          <div className="hm-appt">
            <div className="hm-card">
              <form
                className="hm-form"
                onSubmit={handleAppointmentSubmit}
                noValidate
              >
                <Field id="doctor_id" label="Select Doctor">
                  <select
                    id="doctor_id"
                    name="doctor_id"
                    className="hm-input"
                    value={appointmentForm.doctor_id}
                    onChange={handleAppointmentChange}
                    disabled={
                      appointmentLoading || availableDoctors.length === 0
                    }
                  >
                    <option value="">Select Doctor</option>

                    {availableDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} — {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="appointment_date" label="Appointment Date">
                  <input
                    id="appointment_date"
                    type="date"
                    name="appointment_date"
                    className="hm-input"
                    value={appointmentForm.appointment_date}
                    min={getTodayDate()}
                    onChange={handleAppointmentChange}
                    disabled={appointmentLoading}
                  />
                </Field>

                <Field id="appointment_time" label="Appointment Time">
                  <input
                    id="appointment_time"
                    type="time"
                    name="appointment_time"
                    className="hm-input"
                    value={appointmentForm.appointment_time}
                    onChange={handleAppointmentChange}
                    disabled={appointmentLoading}
                  />
                </Field>

                <Field id="reason" label="Reason for Visit">
                  <input
                    id="reason"
                    type="text"
                    name="reason"
                    className="hm-input"
                    value={appointmentForm.reason}
                    onChange={handleAppointmentChange}
                    placeholder="e.g. Routine checkup"
                    disabled={appointmentLoading}
                  />
                </Field>

                {appointmentError && (
                  <p className="hm-error hm-field--full" role="alert">
                    {appointmentError}
                  </p>
                )}

                {appointmentMessage && (
                  <p className="hm-ok hm-field--full" role="status">
                    {appointmentMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="hm-btn hm-btn--primary hm-submit hm-field--full"
                  disabled={appointmentLoading}
                >
                  {appointmentLoading ? "Booking..." : "Book Appointment"}
                </button>
              </form>
            </div>

            <div className="hm-card hm-info">
              <h3>Why book with SmartCare?</h3>

              <p>
                Manage your hospital appointments directly through the SmartCare
                HMS platform.
              </p>

              <div className="hm-checks">
                {appointmentPerks.map((perk) => (
                  <div key={perk} className="hm-check">
                    <span className="hm-check-mark" aria-hidden="true">
                      ✓
                    </span>
                    <p>{perk}</p>
                  </div>
                ))}
              </div>

              {!user && (
                <div className="hm-note">
                  Please <Link to="/login">log in</Link> as a patient to book an
                  appointment.
                </div>
              )}

              {user && userRole !== "PATIENT" && (
                <div className="hm-note">
                  Appointment booking from this page is available for patient
                  accounts.
                </div>
              )}

              {userRole === "PATIENT" && appointmentPatient && (
                <div className="hm-patient">
                  <strong>Booking for</strong>

                  <span>{appointmentPatient.name}</span>

                  <small>Patient ID: {appointmentPatient.id}</small>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ================= REVIEWS ================= */}
      <ReviewSection />

      {/* ================= FAQ ================= */}
      <section id="faq" className="hm-section">
        <SectionHead
          eyebrow="Questions"
          title="Frequently asked questions"
          subtitle="Quick answers about how SmartCare works."
        />

        <div className="hm-faq">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className={`hm-faq-item${isOpen ? " hm-faq-item--open" : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    className="hm-faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>

                    <span className="hm-faq-icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="hm-faq-a"
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <div className="hm-band">
        <section id="contact" className="hm-section">
          <SectionHead eyebrow="Get in touch" title="Contact us" />

          <div className="hm-contact">
            <div className="hm-card">
              <div className="hm-icon hm-icon--round">☎</div>

              <strong>Phone</strong>

              <p>+91 8967333550</p>
              <hr />
              <p>+91 8145508186</p>
            </div>

            <div className="hm-card">
              <div className="hm-icon hm-icon--round">✉</div>

              <strong>Email</strong>

              <p>smartcarehms@gmail.com</p>
              <hr />
              <p>devsuman.in@gmail.com</p>
            </div>

            <div className="hm-card">
              <div className="hm-icon hm-icon--round">⚲</div>

              <strong>Address</strong>

              <p>SmartCare HMS</p>
              <hr />
              <p>
                Haldia Institute of Technology, ICARE Complex, Haldia, Purba
                Medinipur, West Bengal, India.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="hm-footer">
        <div className="hm-brand">
          <span className="hm-brand-mark">+</span>
          <span>SmartCare HMS</span>
        </div>

        <span>© 2026 SmartCare HMS. Academic project — MCA 3rd semester.</span>
      </footer>
    </div>
  );
}
