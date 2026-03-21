# Design System Specification: Midnight Luminous



## 1. Overview & Creative North Star



**Creative North Star: The Celestial Editor**

This design system moves beyond functional utility to create a high-end, editorial experience that feels both expansive and precisely engineered. It rejects the "boxy" nature of traditional SaaS interfaces in favor of **Tonal Depth** and **Atmospheric Perspective**.



By utilizing deep slate foundations and vibrant purple accents, we create a sense of "digital midnight"—a focused, premium space where content is illuminated by logic and high-contrast typography. The system breaks the template look through intentional asymmetry, massive typography scales for headings, and a layering logic that mimics physical sheets of dark, polished glass.



---



## 2. Colors & Surface Logic



The palette is a sophisticated interplay between "The Void" (deep slates) and "The Spark" (professional purples).



### Core Palette

- **Background (The Void):** `#051424` – The absolute base of the canvas.

- **Primary (The Spark):** `#9333EA` to `#A855F7` – Used for moments of intent and primary interaction.

- **Surface Tiers:**

- `surface-container-low`: `#0E1C2D`

- `surface-container-highest`: `#283647`



### The "No-Line" Rule

Traditional 1px solid borders are strictly prohibited for structural sectioning. Information architecture must be defined through:

1. **Background Shifts:** Placing a `surface-container-high` card on a `surface` background.

2. **Vignettes:** Subtle radial gradients that darken towards the edges of a container to draw focus inward.

3. **Negative Space:** Using the 4rem (`16`) and 5rem (`20`) spacing tokens to create logical groups.



### The Glass & Gradient Rule

To achieve the "Premium Tech" aesthetic seen in the landing page, utilize:

- **Signature Glows:** Use a `primary-container` (#9333EA) with 15% opacity and a 64px blur behind key typography or floating cards to create a "nebula" effect.

- **Bespoke CTAs:** Primary buttons should use a linear gradient from `primary` (#DDB8FF) to `primary-container` (#9333EA) at a 135-degree angle.



---



## 3. Typography: Plus Jakarta Sans



We treat typography as a structural element rather than just a medium for text.



* **Display (Editorial Impact):** Use `display-lg` (3.5rem) with `-0.04em` letter spacing for hero sections. This conveys authority and modernism.

* **Headline (Section Nav):** `headline-md` (1.75rem) should be used for major module headers, keeping the hierarchy clear but sophisticated.

* **Body (Readability):** `body-lg` (1rem) is the workhorse. Always use `on-surface-variant` (#CFC2D7) for secondary body text to reduce visual vibration against the dark background.

* **Labels (The Technical Detail):** `label-md` (0.75rem) in uppercase with `0.1em` letter spacing for small metadata or chip labels to provide a "dashboard-instrument" feel.



---



## 4. Elevation & Depth



Hierarchy is achieved through **Tonal Layering** and **Ambient Light**, not structural shadows.



### The Layering Principle

Think of the UI as layers of dark glass.

- **Base:** `surface` (#051424)

- **Mid-Ground (Cards/Modules):** `surface-container-low` (#0E1C2D)

- **Fore-Ground (Interactive/Floating):** `surface-container-highest` (#283647)



### Ambient Shadows

Shadows must be barely perceptible.

- **Token:** `shadow-ambient`

- **Spec:** `0px 24px 48px rgba(0, 0, 0, 0.4)`

- **Color:** Use a tinted shadow (Primary-dark at 10% opacity) for floating elements to make them feel part of the "Midnight" atmosphere.



### The "Ghost Border" Fallback

Where containment is functionally required (e.g., input fields), use a **Ghost Border**:

- **Stroke:** 1px

- **Color:** `outline-variant` (#4D4354) at **20% opacity**.

- **Effect:** This creates a glint of light on the edge of the "glass" without creating a heavy box.



---



## 5. Components



### Buttons

- **Primary:** Gradient fill (Primary to Primary-Container), 12px (`md`) roundness. White text for maximum contrast.

- **Secondary (Ghost):** Ghost border (Outline-variant @ 30%) with `on-surface` text.

- **Interaction:** On hover, increase the background glow (box-shadow: 0 0 20px primary-container @ 40%).



### Cards & Modules

- **Rule:** No divider lines. Separate content using `spacing-6` (1.5rem) or internal background shifts (e.g., a header in `surface-container-high` sitting atop a body in `surface-container`).

- **Corner Radius:** 12px (`md`) for main containers; 8px (`DEFAULT`) for internal elements like chips or nested inputs.



### Input Fields

- **Surface:** `surface-container-lowest` (#010F1F).

- **Border:** Ghost Border (10% opacity).

- **State:** On focus, the border opacity increases to 100% `primary` with a 4px soft outer glow.



---



## 6. Do's and Don'ts



### Do

- **Do** use large, sweeping gradients (Primary to Transparent) to highlight specific zones of the screen.

- **Do** use `plus-jakarta-sans` with tight tracking for headlines to create a "luxury tech" look.

- **Do** prioritize `surface-container` shifts over borders for card definitions.



### Don't

- **Don't** use pure black (#000000) or pure white (#FFFFFF). Use the slate neutrals provided to maintain tonal richness.

- **Don't** use standard 1px solid borders at 100% opacity. This breaks the "glass-like" aesthetic.

- **Don't** use sharp 90-degree corners. Everything must feel approachable with the 8px-12px roundness scale.

- **Don't** clutter the UI. If in doubt, increase the spacing token by one level (e.g., move from `12` to `16`).



---



## 7. Technical Specs (Tokens)



| Category | Token | Value |

| :--- | :--- | :--- |

| **Spacing** | `gutter-lg` | 4rem (16) |

| **Spacing** | `stack-md` | 1.5rem (6) |

| **Radius** | `radius-main` | 0.75rem (12px) |

| **Radius** | `radius-sm` | 0.5rem (8px) |

| **Color** | `action-primary` | #9333EA |

| **Color** | `text-main` | #D5E4FA |

| **Color** | `text-muted` | #988CA0 |

| **Border** | `ghost-stroke` | 1px solid rgba(77, 67, 84, 0.2) |