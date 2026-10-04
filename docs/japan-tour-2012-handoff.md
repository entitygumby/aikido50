# Handoff: Japan Tour 2012 page (photos still to add)

## Where things are

- **Repo / branch:** `entitygumby/aikido50`, branch `claude/optimistic-hawking-bl0unl`
- **Page:** `japan-tour-2012.html`. It's one self-contained file. The coastline map is an inline SVG path, and all content lives in the `<script>` data blocks (`TRIP`, `PLACES`, `SEGS`, `V`, `DAYS`, `CHAPTERS`).
- **Photo folder:** `images/japan-2012/`. It has a README and no photos yet.
- **Preview artifact (cloud session):** https://claude.ai/artifact/2ZHyUGiCHY8JEY45nmdKGi. To update it from another session, pass this URL as `url`. Otherwise publishing creates a new artifact.
- **Source photos:** OneDrive folder https://1drv.ms/f/c/0B16E466BEA2BAD8/Ati6or5m5BYggAuySAEAAAA?e=0ofjRV. The cloud session's network policy blocked it, which is why this work is moving to a local session.

## Status

- The trip commentary (Tue 10 to Sun 22 April 2012) is fully entered. Day text is the author's words, unedited. The summary at the top is new copy.
- Two layouts are shortlisted. You can switch between them at the top of the page:
  - **A. Story map:** a sticky map that zooms to each day as you scroll.
  - **B. Map + gallery:** a route map with chapter pins and a Kumano close-up, then photos in six chapters.
- Layouts C (timeline) and D (magazine) were removed at the user's request.
- Every photo is currently a labelled placeholder. There are 27 slots, IDs `d01-1` … `d12-1`, each captioned with the shot the commentary describes.

## How photos plug in

- Save a file as `images/japan-2012/<slot-id>.jpg`. The page loads it and hides the placeholder. If the file is missing, the placeholder stays.
- To add or change slots, edit `photos` in the matching `DAYS` entry. Captions are plain strings, and the IDs are generated from their order.
- Layout B builds each chapter's gallery from the photos of that chapter's days, so nothing extra is needed there.

## Next steps (local session)

1. Download the OneDrive folder to a working directory **outside the repo**.
2. Inventory the photos and sort them by EXIF capture time into days 10 to 22 April 2012. Watch for cameras still set to Sydney time: Sydney is UTC+10 in April 2012 and Japan is UTC+9, so a Sydney-set camera reads 1 hour ahead of local Japan time. Then look at each photo and match it to the slot captions.
3. Pick the best 2 to 4 per day. Add slots where a day has more good shots than captions.
4. Export each one at 1600 px on the long edge, JPEG quality around 80, sRGB, **with EXIF/GPS stripped**. Name it by slot ID and save it to `images/japan-2012/`. One way to do this with Python's Pillow library:

   ```python
   from PIL import Image, ImageOps
   im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
   im.thumbnail((1600, 1600))
   im.save(f"images/japan-2012/{slot}.jpg", quality=80, optimize=True)  # no exif= → metadata dropped
   ```

5. List any photos you can't place against the commentary for the user to confirm. Don't guess.
6. Check both layouts in a browser at desktop and phone width, then commit and push to the branch.

## Open questions for the user

- Final layout: **A, B, or keep both** behind the switcher?
- **Walk start point:** the commentary doesn't name the trailhead. The map assumes Takijiri-oji, because the group reached Chikatsuyu after about 6 hours.
- Once the layout is settled: link the page from `index.html`, and remove the "Layout options" review bar and review notes.

## Notes

- Map positions are approximate, for showing the journey only. Gomita Dojo is placed in central Tanabe because there's no address.
- The original build tooling (Natural Earth 10m coastline projected with d3-geo) isn't in the repo. It isn't needed unless the map extent changes, because the projection constants are inlined as `PROJ` and marker positions are calculated from lon/lat at runtime.
- Style: Australian English. Fonts are Shippori Mincho for display, Noto Sans JP for body, IBM Plex Mono for labels. Indigo comes from the seminar site, and vermilion is used only for the walked route.
