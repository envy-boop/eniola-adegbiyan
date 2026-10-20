/* =====================================================================
   CONTENT.JS: THE ONLY FILE YOU NEED TO EDIT TO CHANGE YOUR PORTFOLIO
   Everything on the site is rendered from this one object.
   To add a project: copy one block in `projects`, paste it, change the text.
   To add a job: copy one block in `experience`.
   Lines marked TODO are things to confirm or fill in. Fix or delete them.
   ===================================================================== */

const SITE = {
  name: "Eniola Olamide Adegbiyan",
  shortName: "Eniola",
  status: "Open to remote operations, project coordination and automation roles",
  email: "eniolaops@gmail.com",
  // WhatsApp number with country code, digits only (no +, no spaces). Set to "" to hide the button.
  whatsapp: "2349159196850",

  // The moving dots-and-lines background. Set to false to switch it off.
  interactiveBackground: true,

  photo: "photo.jpg",
  cv: "cv.pdf", // the "Download CV" button. Replace the file to update it.

  headline: "I build the systems, workflows, and practical tools that help teams work better.",
  // The words from the headline to show in gold italics. Must match the headline exactly. Set to "" for none.
  headlineAccent: "work better.",
  subline:
    "Operations and project coordination, workflow automation, and web builds, with a Fine Arts eye for how things look and feel.",

  // Quick facts under the hero buttons. Delete a line to remove it, or use  facts: []  to hide the strip.
  facts: [
    { label: "Based in", value: "Ile-Ife, Nigeria" },
    { label: "Focus", value: "Operations · Automation · Tools" },
    { label: "Languages", value: "English, Yoruba, Pidgin" }
  ],

  // Words in the scrolling ribbon under the hero. Use  ribbon: []  to hide it.
  ribbon: [
    "Operations", "Project coordination", "Workflow automation", "Apps Script", "Make.com",
    "Notion", "Airtable", "Dashboards", "SOPs", "Onboarding systems", "Web builds"
  ],

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/eniola-a-99726526a" },
    { label: "GitHub", url: "https://github.com/envy-boop" }
  ],

  about: [
    "I'm an operations and workflow automation specialist who likes finding where work breaks down: where information gets lost, why deadlines slip, and how a better system can make everyone's job easier.",
    "I work across operations, project coordination, reporting and onboarding, and I build the trackers, forms, automations and small apps that make that work visible. I came into tech through Fine and Applied Arts at Obafemi Awolowo University, and I'm self-taught in the tools I use, which shapes how I think about structure, communication and design.",
    "I'm growing towards operations lead and workflow automation roles, and towards building practical tools for founders and small teams."
  ],

  skills: [
    {
      group: "Operations",
      items: ["Project coordination", "Reporting & SOPs", "Onboarding systems", "Stakeholder follow-ups", "Notion", "Airtable", "Google Workspace", "Slack"]
    },
    {
      group: "Automation",
      items: ["Google Apps Script", "Make.com", "Zapier", "Twilio", "Fillout"]
    },
    {
      group: "Building",
      items: ["HTML & JavaScript", "Vercel & Netlify", "Git & GitHub"]
    },
    {
      group: "Design",
      items: ["Figma", "Canva", "Illustrator", "Photoshop", "Printmaking"]
    },
    {
      group: "Currently learning",
      items: ["n8n", "Backend basics", "Supabase"]
    }
  ],

  // Shown under "Selected work". Set to "" to hide.
  toolsNote:
    "I build a lot of internal tools, including CRMs, trackers and dashboards, for teams I work with. Many belong to the teams and clients I built them for, so I don't publish them. I'm happy to talk through how they work.",

  // Each project can have any number of buttons:
  //   links: [{ label: "Watch demo", url: "https://..." }, ...]
  // `note` is a small line under the project (used for "proof on request").
  // status: "Live" | "Paused" | "Demo" | "In progress"
  // NEVER paste Apps Script /exec links here: they are live endpoints.
  projects: [
    {
      title: "MEMO.AI",
      org: "Personal project",
      year: "2026", // TODO: confirm
      status: "Paused",
      summary:
        "A full-stack AI meeting note-taker, built end to end and hosted on Vercel. Transcription is paused because it runs on paid Whisper credits, so the demo video is the best way to see it.",
      tags: ["Full-stack", "AI", "Vercel"],
      links: [
        { label: "Watch demo", url: "https://drive.google.com/file/d/1tIm1k6SyhVKwqZQ82xS64timPqlZnQE8/view?usp=sharing" },
        { label: "View app", url: "https://memo-ai-team.vercel.app/" }
      ]
    },
    {
      title: "Lead Pipeline, Report Reminders & Notion Reorganisation",
      org: "Hilvarr Digitals",
      year: "2026",
      status: "Live",
      summary:
        "Automations built mainly in Make.com and Google Apps Script: a Sheets-to-Notion lead pipeline, an automated report reminder system with Twilio, and a reorganisation of the agency's Notion boards.",
      tags: ["Make.com", "Apps Script", "Twilio", "Notion"],
      links: [],
      note: "Client work, so proof is available on request."
    },
    {
      title: "Budget Panic",
      org: "Personal project",
      year: "2026", // TODO: confirm
      status: "Live",
      summary:
        "A browser game I built and published on Start.ng.", // TODO: add one line on how it plays
      tags: ["Game", "Front-end", "GitHub"],
      links: [
        { label: "Play", url: "https://budget-panic.start.ng/" },
        { label: "Watch demo", url: "https://drive.google.com/file/d/1elidq6EJjTcWJ2PLExdQFeq86pO0FXpb/view?usp=sharing" },
        { label: "Code", url: "https://github.com/envy-boop/budget-panic" }
      ]
    },
    {
      title: "Client Work Planner",
      org: "Selar",
      year: "2026",
      status: "Live",
      summary:
        "A planning tool for organising client work, available on Selar and improved from early-access feedback.",
      tags: ["Digital product", "Planning"],
      links: [
        { label: "Get it on Selar", url: "https://selar.com/95h77h9212" },
        { label: "Watch demo", url: "https://drive.google.com/file/d/1nOhOkGq2JBHfFifUftCwB_RB_8bQ9DsK/view?usp=sharing" }
      ]
    },
    {
      title: "Partnership Tracker & Live Dashboard",
      org: "AKD",
      year: "2026",
      status: "Live",
      summary:
        "A tracker covering 30+ partner organisations, with a live dashboard built on Google Apps Script, so the team can see where each conversation stands.",
      tags: ["Apps Script", "Dashboards", "Partnerships"],
      links: [],
      note: "Company-owned, so it isn't public. I can describe how it works, and sanitised proof is available on request."
    },
    {
      title: "Grocery Store Web App",
      org: "Self-initiated demo",
      year: "2026", // TODO: confirm
      status: "Demo",
      summary:
        "A demo online shop I built from scratch on my own initiative, modelled on Daris Ace, a grocery store in Ile-Ife. Shoppers can browse by category, see prices, add to cart, and sign in with Google for delivery or pickup. Hosted on Vercel.",
      tags: ["Web app", "Google sign-in", "Vercel"],
      links: [
        { label: "View site", url: "https://daris-ace-grocery.vercel.app/" },
        { label: "Demo materials", url: "https://drive.google.com/drive/folders/1YbdppJoIhwaUjDvTqhDKeSNRqYPZfogh?usp=sharing" }
      ]
    },
    {
      title: "HNG Tasks",
      org: "HNG Tech",
      year: "2026",
      status: "Live",
      summary:
        "Work from my first virtual assistant internship, including a task manager app with categories, priorities, due dates and search. Materials are linked below.",
      tags: ["Task management", "Virtual assistance"],
      links: [
        { label: "View materials", url: "https://drive.google.com/drive/folders/1Z5lQ-0-AY51DCopR64ZO6nsONjNTggOU?usp=sharing" }
      ]
    }
  ],

  // Newest first.
  experience: [
    {
      org: "InfoPouch Africa",
      role: "Executive Assistant to the CEO",
      period: "Aug 2026 to Present",
      points: [
        "Support the founder and CEO of a pre-revenue, pan-African data infrastructure startup.",
        "Built and run the waitlist system on Airtable and Fillout, sourcing the first 100 waitlist users.",
        "Conduct grant research for the fundraising pipeline and produce branded company assets."
      ]
    },
    {
      org: "AKD (Apex Knowledge Desk)",
      role: "Project Management Associate",
      period: "Aug 2026 to Present",
      points: [
        "Coordinate partnerships, internship pipelines, onboarding and reporting across teams.",
        "Built the partnership tracker and its live Apps Script dashboard."
      ]
    },
    {
      org: "Stableflow",
      role: "Operations Manager (volunteer)",
      period: "Sep 2026 to Present",
      points: [
        "Built the onboarding access system and the Q3 operations report.",
        "Building a task-intake automation with Google Forms, Sheets and Apps Script.",
        "Drafted the HR and operations SOP for the internship programme as SOP owner."
      ]
    },
    {
      org: "Hilvarr Digitals",
      role: "Operations Intern",
      period: "Apr 2026 to Jun 2026",
      points: [
        "Built a Sheets-to-Notion lead pipeline and an automated report reminder system.",
        "Maintained Notion workspaces and supported expense tracking, invoicing and budgeting."
      ]
    },
    {
      org: "HNG Tech",
      role: "Virtual Assistant Intern",
      period: "Apr 2026 to May 2026",
      points: [
        "Completed a structured virtual assistance internship covering workflow automation, task management and client communication.",
        "Built and maintained lead trackers in Airtable."
      ]
    },
    {
      org: "DSHUB",
      role: "Product Design Intern (UI/UX)",
      period: "Mar 2026 to May 2026",
      points: ["Designed UX screens and interface flows in Figma and took part in design reviews."]
    }
  ],

  // "How I work" steps. Use  process: []  to hide the section.
  process: [
    { title: "Understand the problem", text: "Before anything else, I find out what is really going wrong and why." },
    { title: "Look for possible solutions", text: "I explore a few ways to fix it before I settle on one." },
    { title: "Build it and make it work", text: "Then I build the fix, whether that is a tracker, an automation, a dashboard or a small app." }
  ],

  earlier:
    "Earlier: Cowrywise Campus Ambassador (from Nov 2024), TRYBE City Virtual Assistant Intern, Hope4aFuture Social Media Assistant, freelance graphic design at The Incubator Hub. Full history is in my CV.",

  education: {
    school: "Obafemi Awolowo University, Ile-Ife",
    detail: "Fine and Applied Arts: Graphics and Printmaking (final year)"
  }
};
