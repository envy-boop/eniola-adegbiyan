# Eniola Adegbiyan · Portfolio

Live site: https://envy-boop.github.io/eniola-adegbiyan/

This is my guide to updating the site myself.

---

## The one rule

**Almost everything I'll ever change is in `content.js`.**
Words, numbers, projects, links, jobs, skills and certificates all live there. The other files build the page from it.

| File | What it does | How often I touch it |
|---|---|---|
| `content.js` | All words, numbers, projects and links | Often |
| `images/` | Photo, project pictures | When adding a project |
| `cv.pdf` | The "Download CV" file | When my CV changes |
| `style.css` | Colours and fonts (top of the file) | Rarely |
| `glow.js` | The moving background (`SETTINGS` at the top) | Rarely |
| `main.js`, the 4 `.html` files | Build the pages | Almost never |

---

## Everyday edits

### Change a sentence, number or link
1. Open `content.js` in VS Code.
2. Press **Ctrl + F** and search for the words I want to change.
3. Change only the text **inside the quotes** `"like this"`.
4. Save (**Ctrl + S**) and check the page in the browser.

### Update my CV
Replace `cv.pdf` with the new one. **Keep the same name: `cv.pdf`.**

### Change my photo
Replace `images/photo.jpg` with a new photo. **Keep the same name.**

### Add a new project
1. Put its picture in the `images` folder, for example `images/my-new-project.jpg`.
   (A wide picture works best, around 1600 × 1000.)
2. In `content.js`, find `projects: [`.
3. Copy a whole project block, from its `{` down to its `},`, and paste it where I want it to appear. The order in the file is the order on the site.
4. Change:
   - `id`: a short name with no spaces, e.g. `"my-new-project"` (must be different from the others)
   - `title`, `org`, `year`, `status` (`"Live"`, `"Testing"`, `"In progress"`, `"Paused"` or `"Demo"`)
   - `category`: one of `"Operations systems"`, `"Automation"`, `"Products & apps"`
   - `cover`: `"images/my-new-project.jpg"`
   - `summary`, `role`, `tools`, `challenge`, `did`, `result`
   - `links`: the **first** link becomes the main gold button on the card
5. Optional:
   - `featured: true` shows it on the Home page (keep it to 4)
   - `proofOnRequest: true` adds a "Request proof" button
   - `illustration: true` adds an "Illustration" label to the picture

### Add a new job
In `content.js`, find `experience: [`, copy a job block, paste it **at the top** (newest first) and edit it.
If the period has "Present" in it, it also shows under "Right now" on the Home page.

### Change the big numbers on the Home page
In `content.js`, find `stats: [` and edit `value` and `label`.

### Change the colour
In `style.css`, at the top, change `--accent: #e8b86a;` to another colour code.

### Make the background calmer or busier
In `glow.js`, at the top, change the numbers in `SETTINGS`
(e.g. `maxSignals: 9` → `5` for calmer).

---

## Before I publish: check it

1. Double-click `index.html` (or right-click → **Open with Live Server** in VS Code).
2. Click through Home, Work, a project, and About.
3. **If a red "Site problem" box appears**, it tells me what's wrong. The most common causes:
   - a missing **comma** at the end of a line in `content.js`
   - a missing **quote** `"`
   - a missing **bracket** `}` or `]`

   Undo my last change (**Ctrl + Z**) and try again.

### Writing tips for content.js
- Every piece of text needs quotes: `"like this"`.
- Lines in a list end with a comma: `"first",` `"second",`
- To use an apostrophe, it's fine inside double quotes: `"I'm"`.
- To use a double quote inside text, use curly ones: `“Vera”`.
- Never paste a Google Apps Script `/exec` link. Anyone with it can use the live tool.

---

## Publishing changes

### Easy way: GitHub Desktop (recommended)
**One-time setup**
1. Install **GitHub Desktop** (desktop.github.com) and sign in as `envy-boop`.
2. **File → Clone repository** → choose `eniola-adegbiyan` → pick a folder on my laptop.
3. That folder is now my site. Open it in VS Code and always edit there.

**Every time I change something**
1. Edit and save in VS Code, then check it in the browser.
2. Open GitHub Desktop. My changes appear on the left.
3. Type a short summary at the bottom left, e.g. `Added new project`.
4. Click **Commit to main**, then **Push origin**.
5. Wait 1–2 minutes, then open the live site and press **Ctrl + Shift + R**.

### Backup way: upload on github.com
Repo → **Add file → Upload files** → drag in only the files I changed → **Commit changes**.
For a new picture, drag in the `images` folder or upload it inside `images`.

---

## If the live site looks old

Browsers keep saved copies of files. Press **Ctrl + Shift + R** on the site.

After a big change, I can also make every visitor load fresh files:
in all 4 `.html` files, change `?v=10` to `?v=11` (VS Code: **Ctrl + Shift + H** replaces it in all files at once).
