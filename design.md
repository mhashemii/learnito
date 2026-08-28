# Learnito design system

**Source**: image, `design/learnito-designsystem.png`

## Character

Learnito is calm, precise, and quietly editorial. A warm near white canvas gives the page room to breathe, while compact white panels, fine borders, and slate text keep the interface focused. Teal is the confident action color. Playfair Display style serif text gives the brand and section titles a thoughtful learning character. Inter style sans text keeps controls, labels, and supporting copy clear and efficient.

## Build mandate

Build interfaces as a compact, coherent system of specimens. Use numbered uppercase section labels, a 4 pixel rhythm, restrained shadows, soft rounded corners, and a narrow neutral border. Keep examples dense enough to scan, but preserve generous hierarchy between the brand, tokens, and component groups. Prefer semantic controls and concise labels. Use color with text or shape so status never depends on color alone.

The design system is light only in the supplied reference. Keep the canvas warm and quiet, let teal carry interaction and progress, and reserve violet and pale teal for the badge examples. Do not add gradients, decorative illustrations, or extra product chrome when the reference does not call for them.

## Token source

The token values live in `app/globals.css`. Components must reference those custom properties rather than repeating visual values. The CSS file is the source of truth for color, type, spacing, radius, shadow, motion, control, and layout tokens.

## Responsive behavior

The desktop specimen keeps the reference's compact split panels near 1024 pixels. At tablet widths, paired panels stack as needed. At phone widths, cards and principle examples use one column, icon and navigation examples wrap, and the type scale remains available through an internally scrollable table region without making the page overflow.

## Do's and don'ts

Do use the teal accent for primary actions, active navigation, focus, and progress. Do use the display serif only for titles and type specimens. Do keep interface text in the sans role. Do give each section a clear semantic heading and each control a persistent label.

Do not use raw colors or duplicate token values in component markup. Do not introduce external imagery, remote font requests, or a second styling system. Do not use a generic container as a button or link. Do not communicate status through color alone.
