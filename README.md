# swati✶ · portfolio

Single-page portfolio for **Swatisoumya Sahoo**, Social Media Manager & Content Creator (Bengaluru).
Plain HTML, CSS and vanilla JS. No frameworks, no build step.

```
.
├── index.html          # all content
├── styles.css          # colours/fonts as CSS variables at the top
├── script.js           # scroll reveal, cursor dot, footer year
├── .nojekyll           # tells GitHub Pages to serve files as-is
└── assets/
    ├── favicon.svg
    ├── og-image.png    # 1200×630 social preview
    └── Swatisoumya-Sahoo-Resume.pdf   # ← add this (see below)
```

## Before you deploy

1. **Add the résumé.** Put the PDF at `assets/Swatisoumya-Sahoo-Resume.pdf`. The hero's "Résumé ↓" button links there.
   The site deliberately shows no phone number, so export a version of the résumé without the phone number if you want to keep it private.
2. **Swap the reel placeholders** in the "Recent drops" section (`#work` in `index.html`). Each tile accepts an image. Put it first inside the `<li>`:

   ```html
   <li class="reel g1 reveal">
     <img src="assets/reels/brand-promo.webp" alt="Brand promo reel for <client>" width="540" height="960" loading="lazy" decoding="async">
     <span class="tag tag-dark">…</span>
     …
   </li>
   ```

   Use 9:16 WebP images of about 540×960 to keep Lighthouse scores high. To make a tile clickable, wrap its contents in `<a href="https://www.instagram.com/reel/…">`.
3. If your GitHub username isn't `swatisociohub`, update the `canonical`, `og:url`, `og:image` and `twitter:image` URLs in the `<head>` of `index.html`.

## Deploy to GitHub Pages

1. Create a **public** repository named exactly `<username>.github.io` (e.g. `swatisociohub.github.io`).
2. Push these files to the `main` branch, either through the GitHub website (**Add file → Upload files**, drag everything in, commit) or from a terminal:

   ```bash
   git init
   git add .
   git commit -m "Launch portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```

3. On GitHub, open **Settings → Pages**. Under **Build and deployment**, set *Source* to **Deploy from a branch**, then choose **main** and **/ (root)**, and save.
4. Wait a minute or two, then open `https://<username>.github.io`. Later pushes to `main` redeploy automatically.

**Custom domain (optional):** add the domain under **Settings → Pages → Custom domain**, create the DNS records GitHub shows you, and tick **Enforce HTTPS**.

## Preview locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Notes

- **Motion:** CSS keyframes (`float`, `spin`, `marquee`, `pop`, `rise`, `pulse`) and an IntersectionObserver for scroll reveals. All motion, including the cursor dot, turns off when the visitor has *reduce motion* enabled.
- **Cursor dot:** only appears on devices with a mouse. The normal cursor stays visible.
- **Fonts:** Syne (headings) and Inter (body), loaded from Google Fonts with `display=swap`.
- **Editing colours:** change the variables in `:root` at the top of `styles.css`.
