# Design System Strategy: The Kinetic Command Center

## 1. Overview & Creative North Star: "The Kinetic Command Center"
This design system moves beyond the static "admin template" to create an authoritative, high-density environment for civic action. The Creative North Star, **The Kinetic Command Center**, treats the dashboard not as a collection of boxes, but as a living map of city infrastructure.

We achieve a premium, custom feel by rejecting the standard "grid of white-bordered boxes." Instead, we utilize **Intentional Asymmetry** and **Tonal Depth**. While the data is dense, the interface feels light through the use of layered surfaces and "air" (generous negative space between logical groupings). We favor high-contrast typography scales to ensure that critical metrics—like "Active Repairs"—are felt, not just read.

---

## 2. Colors: Tonal Architecture
The palette is rooted in deep navies to provide a "void-like" canvas where data can glow.

- **Primary (`primary` #49f4c8):** Our "Teal Signal." Reserved for active data points, successful resolutions, and primary CTAs. It should feel like a light source.
- **Surface Hierarchy & The "No-Line" Rule:** 
    - **Prohibit 1px solid borders** for sectioning. Structural boundaries must be defined by shifts in background tokens (e.g., a `surface-container-low` section sitting on a `surface` background).
    - Use `surface-container-lowest` (#000000) for the deepest background areas to create a "bottomless" feel under the main navigation.
    - Use `surface-container-highest` (#192540) to make high-priority data widgets "pop" toward the user.
- **The "Glass & Gradient" Rule:** Floating modals or sidebar overlays must use `surface-variant` at 80% opacity with a `20px` backdrop-blur. 
- **Signature Textures:** For high-level status cards (e.g., "Total Potholes Filled"), use a subtle linear gradient from `primary` (#49f4c8) to `primary_container` (#00d4aa) at a 135-degree angle to provide a "machined" metallic finish.

---

## 3. Typography: Authoritative Clarity
We utilize **Inter** across all scales, focusing on variable weights to establish hierarchy without adding more colors.

- **Display Scale (`display-lg` 3.5rem):** Used exclusively for "Hero Metrics" (e.g., a large "98%" city health score). These should be `ExtraBold` with `-0.02em` letter spacing.
- **Headline Scale (`headline-sm` 1.5rem):** Used for primary section titles. Use `Medium` weight to maintain a professional, editorial tone.
- **Body vs. Label:** Use `body-md` (0.875rem) for descriptive text and `label-sm` (0.6875rem) in `All Caps` with `+0.05em` tracking for metadata like timestamps or sensor IDs. This creates a "military-spec" aesthetic that reinforces the Command Center theme.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows and borders are replaced by light and density.

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-low` widget on top of a `surface` background. To emphasize a "Critical" alert card, use `surface-container-highest` to physically lift it closer to the eye.
- **Ambient Shadows:** For "floating" elements like hover-state tooltips, use a shadow with a 32px blur, 0% spread, and 8% opacity using the `on_surface` color. This mimics the soft glow of a monitor rather than a physical shadow.
- **The "Ghost Border" Fallback:** If a divider is required for accessibility in data tables, use the `outline_variant` token at **15% opacity**. It should be felt as a change in texture, not seen as a line.
- **Glassmorphism:** Navigation rails should use a semi-transparent `surface_container_low` with a `blur(12px)` to allow the "map" or "data stream" behind it to bleed through, creating a sense of environmental continuity.

---

## 5. Components: Precision Primitives

- **Buttons:**
    - **Primary:** Gradient fill (`primary` to `primary_container`) with `on_primary` text. No border.
    - **Secondary:** Transparent fill with a "Ghost Border" of `primary` at 30% opacity.
- **Status Chips:**
    - Use "Glow States." A `Critical` (#EF4444) chip should have a 4px outer glow of the same color at 20% opacity to signify urgency.
- **Input Fields:**
    - Use `surface_container_low` as the field background. No bottom line. On focus, the background shifts to `surface_container_high` with a 1px `primary` ghost border.
- **Cards & Lists:**
    - **Strict Rule:** Forbid divider lines. Separate list items using `0.6rem` (Spacing 3) of vertical white space or by alternating background tones between `surface_container` and `surface_container_low`.
- **Command Tiles (New Component):**
    - High-density squares for sensor data. They use `headline-sm` for the value and `label-sm` for the unit, positioned in the bottom-right corner for an asymmetrical, technical look.

---

## 6. Do’s and Don’ts

### Do:
- **Use "Active Air":** Use the `16` (3.5rem) spacing token between major dashboard modules to prevent the high data density from becoming overwhelming.
- **Embrace Asymmetry:** Align high-level stats to the left, but keep secondary metadata right-aligned within the same card to create a dynamic visual path.
- **Color with Purpose:** Use `tertiary` (Amber) only for actionable warnings. If the user can't fix it, it shouldn't be amber.

### Don’t:
- **Don't use 100% Opaque Borders:** This creates a "grid-lock" feel that makes the dashboard look dated and "boxy."
- **Don't use Pure Grey:** Every neutral must be tinted with the `Dark Navy` base to maintain the atmospheric depth of the system.
- **Don't Center-Align Data:** In a command center, speed of scanning is key. Always left-align text and right-align numerical values for rapid vertical scanning.