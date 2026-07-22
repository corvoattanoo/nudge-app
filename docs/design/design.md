# Design System & UI Guidelines

> This document defines the visual language, design philosophy, and UI implementation rules for this project.
>
> Every UI component, page, and interaction should follow these guidelines unless explicitly instructed otherwise.

---

# Design Philosophy

Our goal is **clarity over decoration**.

The application should feel like a modern SaaS product built by companies such as:

* Linear
* Vercel
* Stripe
* DojoSales
* Resend
* Notion
* Raycast

The UI should feel:

* Clean
* Professional
* Fast
* Trustworthy
* Minimal
* Enterprise-ready

Avoid making the interface look "AI generated" or overloaded with unnecessary visual effects.

---

# Core Principles

## 1. Typography First

Typography should communicate hierarchy.

Use font weight, size and spacing before introducing colors or decorative elements.

Never rely on colors alone to create emphasis.

---

## 2. Whitespace is a Feature

Every section should have generous breathing room.

Never try to fill empty space.

A clean layout is preferred over a dense layout.

---

## 3. One Purpose Per Section

Each section should communicate exactly one idea.

Avoid mixing unrelated content inside the same container.

---

## 4. Simplicity Wins

When two solutions exist:

Choose the simpler one.

Remove unnecessary UI whenever possible.

---

## 5. Consistency Above Creativity

Consistency is more valuable than unique-looking components.

Spacing, radius, typography and colors should stay predictable across the application.

---

# Color Rules

Use a neutral palette.

Preferred appearance:

* White backgrounds
* Neutral grays
* Black text
* Single accent color

Avoid:

* Rainbow gradients
* Neon colors
* Excessive saturation
* Multiple accent colors

Accent colors should only highlight:

* Primary buttons
* Active navigation
* Important actions
* Status indicators

---

# Typography

Use:

* Inter

Hierarchy example:

* Hero Title → 48-64px
* Section Title → 30-40px
* Card Title → 18-22px
* Body → 16px
* Small Text → 14px

Line height should always be comfortable.

Avoid huge paragraphs.

---

# Layout

Follow an 8px spacing system.

Preferred container width:

* max-w-7xl

Default section spacing:

* py-24 desktop
* py-16 tablet
* py-12 mobile

Cards should have enough internal padding.

Avoid cramped layouts.

---

# Borders

Prefer borders over shadows.

Good:

* border
* border-neutral-200

Avoid:

* heavy drop shadows
* glowing effects

If shadows are used, they must be subtle.

---

# Border Radius

Use consistent radius.

Recommended:

* rounded-xl
* rounded-2xl

Do not mix many radius sizes.

---

# Components

Components should be:

* reusable
* composable
* small
* focused

Large components should be split into smaller building blocks.

Avoid duplicate UI.

---

# Buttons

Primary:

* filled
* accent color

Secondary:

* outline

Ghost:

* transparent

Never create more than three button styles.

---

# Cards

Cards should:

* have breathing room
* use subtle borders
* avoid heavy shadows

Cards should never feel crowded.

---

# Forms

Forms should prioritize clarity.

Labels are preferred over placeholders.

Validation messages should be concise.

Buttons should clearly communicate actions.

---

# Tables

Tables should:

* prioritize readability
* use zebra rows only if necessary
* avoid excessive borders

Actions should always be aligned consistently.

---

# Icons

Use Lucide icons.

Icons should support text, not replace it.

Avoid mixing icon libraries.

---

# Animations

Animations should be subtle.

Preferred:

* fade
* slight slide
* scale (very small)

Animation duration:

150–300ms

Never animate large layout shifts.

Avoid:

* bouncing
* spinning
* flashy transitions

Animation should improve clarity, not attract attention.

---

# Accessibility

Always:

* use semantic HTML
* support keyboard navigation
* maintain sufficient contrast
* provide focus states
* include aria labels when needed

Accessibility is never optional.

---

# Responsive Design

Mobile-first.

Support:

* Mobile
* Tablet
* Desktop

Avoid horizontal scrolling.

Navigation should adapt naturally.

---

# Technical Stack

Use:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons
* Framer Motion (only when necessary)

Do not introduce additional UI libraries unless required.

---

# Code Style

Prefer composition over duplication.

Keep JSX clean.

Extract reusable components.

Avoid deeply nested layouts.

Use meaningful component names.

---

# AI Instructions

When generating UI:

* Think like a senior product designer.
* Improve hierarchy before adding decoration.
* Reduce visual noise.
* Remove unnecessary elements.
* Favor whitespace over additional content.
* Make interfaces feel calm and intentional.
* Components should look handcrafted, not AI-generated.

Before completing any UI task, review the result and ask:

1. Can anything be removed?
2. Is the hierarchy obvious?
3. Does spacing feel balanced?
4. Is this consistent with the rest of the application?
5. Would this feel at home in Linear or Vercel?

If the answer is "no", refine the implementation before considering it complete.
