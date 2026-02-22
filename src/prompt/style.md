# 🎨 Next.js + Tailwind UI Styling Prompt (Light & True Black Dark Mode)

Use this prompt as a **design and styling reference** for building a modern, elegant, animated, and mobile‑first UI in a **Next.js (JavaScript only)** application using **Tailwind CSS**.

The visual identity is inspired by the provided logo, focusing on **black, blue, and white**, with subtle motion, premium spacing, and excellent mobile usability.

---

## 🎯 Core Design Goals

* Clean, elegant, and modern UI
* Mobile‑first design (mobile experience is the top priority)
* Subtle, life‑like animations (smooth, not flashy)
* Strong visual hierarchy and whitespace
* Fully responsive across all screen sizes
* True **black dark mode** (not grey)
* Tailwind CSS only
* Works seamlessly with Next.js

---

## 📱 Mobile‑First Philosophy

* Design **for mobile screens first**, then scale up
* Large, readable typography
* Comfortable tap targets (minimum 44px height)
* Clear spacing between sections
* Vertical flow over complex layouts    
* Avoid visual clutter on small screens

> Desktop layouts should feel like an enhanced version of the mobile UI — not a different design.

---

## 🎨 Color Palette (From Logo)

### Light Mode

* **Primary:** `#1565C0` (Deep Blue)
* **Background:** `#FFFFFF`
* **Surface / Cards:** `#F9FAFB`
* **Text Primary:** `#0F0F0F`
* **Text Secondary:** `#4B5563`
* **Borders:** `#E5E7EB`

### Dark Mode (True Black)

* **Background:** `#000000`
* **Surface / Cards:** `#0B0B0B`
* **Primary Accent:** `#1E88E5`
* **Text Primary:** `#FFFFFF`
* **Text Secondary:** `#9CA3AF`
* **Borders:** `#1F1F1F`

> Dark mode must feel premium, high‑contrast, and AMOLED‑friendly.

---

## 🌗 Light & Dark Mode Rules

* Use Tailwind `dark:` variants
* Dark mode background must be **pure black (`#000`)**
* Maintain strong contrast for accessibility
* Avoid washed‑out greys in dark mode
* Accent colors should feel slightly more vibrant in dark mode

---

## ✨ Animation & Motion Guidelines

Animations should be **subtle, smooth, and purposeful**.

### General Motion

* Use short durations: `150ms – 300ms`
* Prefer `ease-out` and `ease-in-out`
* Avoid aggressive bounce or elastic effects

### Recommended Animations

* Fade‑in + slight upward movement on load
* Button hover: soft scale (`scale-[1.02]`) + color shift
* Cards: gentle shadow lift on hover
* Page transitions: opacity + translateY
* Mobile menus: smooth slide + fade

### Animation Feel

* Calm
* Professional
* "Alive" but not distracting

---

## 🧩 UI Components Styling

### Buttons

* Rounded corners (`rounded-xl`)
* Primary buttons use **blue accent**
* Hover: slight brightness increase + scale
* Active: subtle press‑down effect

### Cards

* Soft shadows in light mode
* Minimal borders in dark mode
* Generous padding
* Clear separation between content blocks

### Inputs & Forms

* Clean outlines
* Strong focus states (blue accent glow)
* Large touch‑friendly input height

---

## 🧠 Typography Guidelines

* Use a modern sans‑serif font
* Clear size hierarchy:

  * Headings: bold and confident
  * Body text: relaxed and readable
* Line height slightly increased for mobile
* Avoid overcrowded text blocks

---

## 📐 Layout & Spacing

* Use Tailwind spacing scale consistently
* Prefer `space-y-*` for vertical rhythm
* Use grids only when necessary
* Keep layouts simple and breathable

---

## 🌟 Overall Visual Feel

The UI should feel:

* Premium
* Modern
* Confident
* Smooth
* Minimal but expressive

Every screen should look **beautiful on mobile first**, then scale naturally to tablet and desktop.

---

## ✅ Final Checklist

* [ ] Mobile experience feels amazing
* [ ] Dark mode uses true black
* [ ] Animations are subtle and smooth
* [ ] Colors match brand identity (black, blue, white)
* [ ] UI feels modern and elegant
* [ ] No visual clutter
* [ ] Tailwind utilities used consistently

---

**Use this document as your master styling prompt when designing or refining your Next.js + Tailwind application.**