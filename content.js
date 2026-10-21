/* =====================================================================
   CONTENT.JS: ALL THE WORDS, NUMBERS, PROJECTS AND LINKS ON YOUR SITE.
   Every page reads from this one file. Change text here, save, refresh.
   - To add a project: copy one { ... } block in `projects`, paste it, edit it.
     Give it a new `id` (lowercase, no spaces). Its page is made automatically.
   - Images live in the  images/  folder. Put a new picture there, then type
     its name here, e.g.  cover: "images/my-picture.jpg"
   - Lines marked TODO are things for you to confirm or fill in.
   ===================================================================== */

const SITE = {
  name: "Eniola Adegbiyan",
  firstName: "Eniola",

  // The hero line "I'm an ..." cycles through these.
  roles: ["Operations Team Lead", "Project Manager", "Executive Assistant", "Operations Manager"],
  intro:
    "I keep startups and growing teams organised and moving. I lead operations, run projects and partnerships, support founders, and build the trackers, dashboards and automations that make the work run smoothly.",
  status: "Open to remote operations, project management and executive assistant roles",
  location: "Ile-Ife, Nigeria · working remotely",

  email: "eniolaops@gmail.com",
  whatsapp: "2349159196850", // digits only, with country code. "" hides the button.
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/eniola-a-99726526a" },
    { label: "GitHub", url: "https://github.com/envy-boop" }
  ],
  photo: "images/photo.jpg",
  cv: "cv.pdf",

  // The big numbers on the home page.
  stats: [
    { value: "450+", label: "organisations in the partnership pipeline I led at AKD" },
    { value: "10+", label: "partnerships secured in a single quarter" },
    { value: "100", label: "first waitlist users for InfoPouch Africa" },
    { value: "3–4 hrs", label: "of manual work my systems save every day" },
    { value: "5", label: "startups and teams I've supported" }
  ],

  // "What I do" cards on the home page.
  services: [
    {
      title: "Operations leadership",
      text: "I lead operations for intern teams: onboarding, task assignment, reporting and SOPs, so people know what to do and leads can see what is happening."
    },
    {
      title: "Project & partnership management",
      text: "I run projects from plan to follow-up. At AKD I led partnership outreach across 450+ organisations and helped secure 10+ partnerships in one quarter."
    },
    {
      title: "Executive support",
      text: "As Executive Assistant to a startup CEO, I run the waitlist, research grants and produce branded company assets, so the founder can focus on the big things."
    },
    {
      title: "Systems & automation",
      text: "Google Apps Script, Make.com, Airtable, Notion and small web apps: I build the tools behind the work, so the same task doesn't have to be done by hand twice."
    }
  ],

  // Categories used by the filter buttons on the Work page.
  categories: ["Operations systems", "Automation", "Products & apps"],

  /* PROJECTS
     status: "Live" | "Testing" | "In progress" | "Paused" | "Demo"
     featured: true  shows it on the home page (keep it to 4).
     illustration: true  adds a small "Illustration" label, for projects where
       the real screens are confidential and the picture is a drawing.
     proofOnRequest: true  adds a "Request proof" button that opens an email to you.
     NEVER paste Apps Script /exec links here: they are live endpoints. */
  projects: [
    {
      id: "rwa-onboarding",
      title: "Intern Onboarding App, “Vera”",
      org: "RWA Inc.",
      year: "2026",
      status: "Testing", // change to "Live" once it launches
      category: "Operations systems",
      featured: true,
      cover: "images/rwa-onboarding.jpg",
      summary:
        "A friendly, step-by-step onboarding app with a voice guide called Vera, so every new intern joins the same clear way.",
      role: "Designed and built it end to end",
      tools: ["Google Apps Script", "Google Sheets", "HTML, CSS & JavaScript", "Netlify"],
      challenge:
        "New interns had several things to finish before they could start: confirm their contract, choose a department, follow the company's pages and join Slack. The old Apps Script link was also hard for some interns to open.",
      did: [
        "Designed a guided five-step flow: Hello, Essentials, About you, Connect and Kick-off.",
        "Added Vera, a voice guide who talks interns through each step, with sound on or off.",
        "Made steps unlock in order, so nothing important gets skipped.",
        "Saved every intern's answers to a Google Sheet through Apps Script.",
        "Set up the public page on Netlify, so every intern can open it easily, with light and dark mode and a phone-friendly layout."
      ],
      result:
        "Now in testing, ready to roll out next quarter. Once live, every new intern gets the same clear welcome, and the operations team gets their details in one sheet instead of chasing people one by one.",
      gallery: [
        { src: "images/rwa-onboarding-mobile.jpg", caption: "On a phone, in light mode" }
      ],
      links: []
    },
    {
      id: "akd-partnerships",
      title: "Partnership Pipeline & Live Dashboard",
      org: "AKD (Apex Knowledge Desk)",
      year: "2026",
      status: "Live",
      category: "Operations systems",
      featured: true,
      illustration: true,
      cover: "images/akd-pipeline.svg",
      summary:
        "I led partnership outreach across 450+ organisations, tracked in a pipeline and live dashboard I built. Result: 10+ partnerships in one quarter.",
      role: "Led partnership outreach; built the tracker and dashboard",
      tools: ["Google Sheets", "Google Apps Script", "Dashboards"],
      challenge:
        "AKD needed to grow its partner network for its internship programmes. That meant a long list of organisations to research, contact and follow up, and no single place to see where each conversation stood.",
      did: [
        "Led the partnership outreach as Project Management Associate.",
        "Built a tracker covering 450+ organisations, from first research to signed partner.",
        "Built a live dashboard on Google Apps Script so the team can see every conversation's stage at a glance.",
        "Kept follow-ups moving so promising conversations didn't go cold."
      ],
      result:
        "Around 100 prospective partners in the pipeline, and 10+ partnerships secured in a single quarter.",
      gallery: [],
      links: [],
      proofOnRequest: true,
      note: "Company-owned, so the real dashboard isn't public. The picture is an illustration with placeholder data. Screenshots and a live walkthrough are available on request."
    },
    {
      id: "client-work-planner",
      title: "Client Work Planner",
      org: "My own product, sold on Selar",
      year: "2026",
      status: "Live",
      category: "Products & apps",
      featured: true,
      cover: "images/planner-preview.jpg",
      coverPosition: "50% 66%", // which part of the picture to show on the card
      summary:
        "A planner for virtual assistants and freelancers: see what's due, what's waiting on the client and who needs a follow-up. Sold as a starter kit on Selar.",
      role: "Designed, built and launched it",
      tools: ["HTML, CSS & JavaScript", "Netlify", "Selar"],
      challenge:
        "When you work for several clients at once, it is easy to lose track of what is due, what is stuck waiting on the client, and who you need to chase.",
      did: [
        "Built a web planner that groups tasks by client, with statuses like In progress and Waiting on client.",
        "Added priorities, due dates and follow-up dates, with overdue items flagged.",
        "Added filters by client and status, light and dark mode, and a layout that works well on a phone.",
        "Packaged it as a starter kit with a user guide, three example workflows (client onboarding, weekly reporting, meeting follow-ups) and a video walkthrough."
      ],
      result: "Live on Selar and improved from early-access feedback.",
      gallery: [
        { src: "images/planner-kit.jpg", caption: "The starter kit" },
        { src: "images/planner-app-light.jpg", caption: "The planner on a phone, light mode" },
        { src: "images/planner-app-dark.jpg", caption: "And in dark mode" }
      ],
      links: [
        { label: "Get it on Selar", url: "https://selar.com/95h77h9212" },
        { label: "Watch demo", url: "https://drive.google.com/file/d/1nOhOkGq2JBHfFifUftCwB_RB_8bQ9DsK/view?usp=sharing" }
      ]
    },
    {
      id: "budget-panic",
      title: "Budget Panic!",
      org: "HNG task, extended on my own",
      year: "2026",
      status: "Live",
      category: "Products & apps",
      featured: true,
      cover: "images/budget-panic.jpg",
      summary:
        "A browser game set in a busy Nigerian market: shop for what you need to cook jollof. Haggle, dodge, and don't go broke.",
      role: "Built it for an HNG task, then added my own updates",
      tools: ["HTML, CSS & JavaScript", "GitHub", "Start.ng"],
      challenge:
        "It started as a task during my HNG internship. I didn't stop at the brief: I added my own updates and published it so anyone can play.",
      did: [
        "Set the game in a Nigerian market, with naira prices and market characters.",
        "Built the game to run in the browser, with no download needed.",
        "Added my own updates on top of the original task, then published it on Start.ng with the code on GitHub."
      ],
      result: "Live and playable by anyone with a browser.",
      gallery: [],
      links: [
        { label: "Play the game", url: "https://budget-panic.start.ng/" },
        { label: "Watch demo", url: "https://drive.google.com/file/d/1elidq6EJjTcWJ2PLExdQFeq86pO0FXpb/view?usp=sharing" },
        { label: "See the code", url: "https://github.com/envy-boop/budget-panic" }
      ]
    },
    {
      id: "hilvarr-automation",
      title: "Lead Pipeline & Report Reminders",
      org: "Hilvarr Digitals",
      year: "2026",
      status: "Live",
      category: "Automation",
      illustration: true,
      cover: "images/hilvarr-automation.svg",
      summary:
        "Make.com and Apps Script automations that move new leads into Notion and remind clients when reports are due, plus a full reorganisation of the agency's Notion boards.",
      role: "Built the automations as Operations Intern",
      tools: ["Make.com", "Google Apps Script", "Twilio", "Notion", "Google Sheets"],
      challenge:
        "Leads were being copied into Notion by hand, and getting clients to report on time took a lot of manual chasing.",
      did: [
        "Built a Sheets-to-Notion lead pipeline with Google Apps Script.",
        "Built an automated report reminder system with Make.com and Twilio.",
        "Reorganised the agency's Notion boards so the team could find things faster."
      ],
      result: "New leads land in Notion on their own, and clients are reminded automatically, saving hours of repetitive work.",
      gallery: [],
      links: [],
      proofOnRequest: true,
      note: "Client work, so the real screens aren't public. The picture is an illustration. Screenshots are available on request."
    },
    {
      id: "infopouch-waitlist",
      title: "Startup Waitlist System",
      org: "InfoPouch Africa",
      year: "2026",
      status: "Live",
      category: "Operations systems",
      illustration: true,
      cover: "images/waitlist.svg",
      summary: "The waitlist system for a pan-African data startup, which brought in its first 100 users.",
      role: "Built and run it as Executive Assistant to the CEO",
      tools: ["Airtable", "Fillout"],
      challenge: "A pre-launch startup needed a simple, reliable way to collect and organise early interest.",
      did: [
        "Built the sign-up form in Fillout, connected to an Airtable base.",
        "Sourced the first 100 waitlist users.",
        "Keep the list organised for the founder's follow-up."
      ],
      result: "The first 100 waitlist users, all in one organised place.",
      gallery: [],
      links: [],
      note: "The picture is an illustration with placeholder data."
    },
    {
      id: "rwa-task-tracker",
      title: "Intern Task Assignment Tracker",
      org: "RWA Inc.",
      year: "2026",
      status: "Live",
      category: "Operations systems",
      illustration: true,
      cover: "images/rwa-task-tracker.svg",
      summary:
        "One sheet that brings together new interns, returning interns and team leads' task assignments, with each team lead seeing only their own department.",
      role: "Built and run it",
      tools: ["Google Forms", "Google Sheets"],
      challenge: "Intern details and task assignments were coming from different places, which made it hard for team leads to see who was active and what they were working on.",
      did: [
        "Set up forms for new interns, returning interns and team-lead task assignments.",
        "Connected all three to one master sheet.",
        "Gave each team lead access to see their own department's active interns."
      ],
      result: "Interns, tasks and departments in one place, and each team lead can see their people at a glance.",
      gallery: [],
      links: [],
      note: "The picture is an illustration with placeholder data."
    },
    {
      id: "memo-ai",
      title: "MEMO.AI",
      org: "Personal project",
      year: "2026", // TODO: confirm
      status: "Paused",
      category: "Products & apps",
      illustration: true,
      cover: "images/memo-ai.svg",
      summary: "A full-stack AI meeting note-taker that records meetings and turns them into notes.",
      role: "Built it end to end",
      tools: ["Full-stack web app", "AI transcription", "Vercel"],
      challenge: "Meeting notes take time to write, and action items get lost.",
      did: [
        "Built a full-stack web app that records meetings and turns them into notes.",
        "Hosted it on Vercel."
      ],
      result: "Working end to end. Transcription is paused for now because it runs on paid AI credits, so the demo video is the best way to see it.",
      gallery: [],
      links: [
        { label: "Watch demo", url: "https://drive.google.com/file/d/1tIm1k6SyhVKwqZQ82xS64timPqlZnQE8/view?usp=sharing" },
        { label: "View app", url: "https://memo-ai-team.vercel.app/" }
      ],
      note: "The picture is an illustration."
    },
    {
      id: "stableflow-leave",
      title: "Staff Leave Management System",
      org: "Stableflow",
      year: "2026",
      status: "In progress", // change to "Live" once staff are using it
      category: "Operations systems",
      featured: false,
      cover: "images/leave-system.jpg",
      coverPosition: "50% 0%",
      summary:
        "A team project: a colleague wrote Stableflow's leave policy, and my supervisor assigned me to turn it into a working system, with live balances, a smart request form, a team calendar and approvals.",
      role: "Built the system, assigned by my supervisor, as volunteer Operations Manager",
      tools: ["Google Apps Script", "Google Sheets", "HTML, CSS & JavaScript", "Web hosting"],
      challenge:
        "Stableflow had a written leave policy, prepared by a colleague, but no system to run it. Staff needed an easy way to request leave and see what they had left, and the team needed one place to approve requests and see who is away. My supervisor assigned the build to me.",
      did: [
        "Turned the team's leave policy document into working rules: leave types, allowances and approvals.",
        "Built live balance cards for every leave type: annual, sick, maternity, paternity, compassionate and unpaid, showing what's left, pending and used.",
        "Built a request form that counts working days automatically, supports half days, and asks for a cover person, who is asked to confirm, plus contact details and handover notes.",
        "Added a team calendar that shows who is away, public holidays and your own pending leave, plus an 'Away in the next 7 days' list.",
        "Added 'My requests' with clear statuses, so staff can withdraw a pending request or cancel approved leave.",
        "Added a friendly assistant that explains each step in plain words, for example how many days a request uses and how many will be left.",
        "Designed a simple login: staff get a code by email, and only approved staff emails can get in. Light and dark mode, and it works on phones.",
        "Worked through a lot of bugs along the way, testing and fixing until the system matched the policy."
      ],
      result:
        "In progress. Once live, staff can see their balances and request leave in minutes, and the team sees who is away at a glance instead of chasing messages.",
      gallery: [
        { src: "images/leave-system-mobile.jpg", caption: "On a phone, in light mode (test data)" }
      ],
      links: [],
      note: "A team effort: the leave policy was written by a colleague, and the work was assigned by my supervisor. The system belongs to Stableflow. Screens show test data only."
    },
    {
      id: "grocery-demo",
      title: "Grocery Store Web App",
      org: "Self-initiated demo",
      year: "2026",
      status: "Demo",
      category: "Products & apps",
      illustration: true,
      cover: "images/grocery.svg",
      summary:
        "A demo online shop I built from scratch, modelled on Daris Ace, a grocery store in Ile-Ife. Browse by category, see prices, add to cart, and sign in with Google.",
      role: "Designed and built it on my own initiative",
      tools: ["Web app", "Google sign-in", "Vercel"],
      challenge: "A test build for Daris Ace, a grocery shop in Ile-Ife, to see what I could create for a real local business.",
      did: [
        "Built category browsing, prices and an add-to-cart flow.",
        "Added Google sign-in for delivery or pickup.",
        "Hosted it on Vercel."
      ],
      result: "A working demo you can try. The shop didn't commission it.",
      gallery: [],
      links: [
        { label: "View site", url: "https://daris-ace-grocery.vercel.app/" },
        { label: "Demo materials", url: "https://drive.google.com/drive/folders/1YbdppJoIhwaUjDvTqhDKeSNRqYPZfogh?usp=sharing" }
      ],
      note: "The picture is an illustration."
    },
    {
      id: "hng-tasks",
      title: "Task Manager & VA Work",
      org: "HNG Tech",
      year: "2026",
      status: "Live",
      category: "Products & apps",
      illustration: true,
      cover: "images/hng-tasks.svg",
      summary: "Work from my virtual assistant internship, including a task manager with categories, priorities, due dates and search.",
      role: "Built it during the HNG internship",
      tools: ["Task management", "Airtable", "Research"],
      challenge: "The internship's practical tasks covered task management, lead tracking and client work.",
      did: [
        "Built a task manager with categories, priorities, due dates and search.",
        "Built and maintained lead trackers in Airtable.",
        "Planned a full travel itinerary with logistics and cost breakdowns."
      ],
      result: "Completed the internship and earned the HNG Virtual Assistant certificate.",
      gallery: [],
      links: [
        { label: "View materials", url: "https://drive.google.com/drive/folders/1Z5lQ-0-AY51DCopR64ZO6nsONjNTggOU?usp=sharing" }
      ],
      note: "The picture is an illustration."
    }
  ],

  // ABOUT PAGE
  about: [
    "I'm Eniola Adegbiyan, an operations and project management professional based in Ile-Ife, Nigeria, working remotely with startups and growing teams.",
    "I lead operations at RWA Inc., manage projects and partnerships at AKD, and work as Executive Assistant to the CEO of InfoPouch Africa. In every role I do the same thing: find where work breaks down, then fix it with clear processes and the right tools.",
    "I came into tech from Fine and Applied Arts at Obafemi Awolowo University and taught myself the tools I use. My art background is why the systems I build are not only useful but clear and easy for people to use.",
    "I'm looking for remote operations, project management and executive support roles with teams that care about doing things well."
  ],

  process: [
    { title: "Understand the problem", text: "Before anything else, I find out what is really going wrong and why." },
    { title: "Look for possible solutions", text: "I explore a few ways to fix it before I settle on one." },
    { title: "Build it and make it work", text: "Then I build the fix, whether that is a tracker, an automation, a dashboard or a small app." }
  ],

  skills: [
    { group: "Operations", items: ["Team & intern operations", "Onboarding systems", "Reporting & SOPs", "Task assignment", "Stakeholder follow-ups"] },
    { group: "Project management", items: ["Project coordination", "Partnership outreach", "Pipelines & trackers", "Grant research"] },
    { group: "Automation & tools", items: ["Google Apps Script", "Make.com", "Zapier", "Twilio", "Airtable", "Fillout", "Notion", "Google Workspace", "Slack", "Asana", "Trello"] },
    { group: "Building", items: ["HTML, CSS & JavaScript", "Vercel & Netlify", "Git & GitHub"] },
    { group: "Design", items: ["Figma", "Canva", "Illustrator", "Photoshop", "Printmaking"] }
  ],

  // Newest first.
  experience: [
    {
      org: "RWA Inc.",
      role: "Operations Team Lead",
      period: "Jun 2026 to Present",
      points: [
        "Joined as an intern in June 2026 and was promoted to Operations Team Lead.",
        "Lead intern operations: onboarding, task assignment and department tracking.",
        "Built Vera, an intern onboarding app now in testing for next quarter.",
        "Run the intern task assignment tracker that shows each team lead their own department's interns."
      ]
    },
    {
      org: "InfoPouch Africa",
      role: "Executive Assistant to the CEO",
      period: "Aug 2026 to Present",
      points: [
        "Support the founder and CEO of a pre-revenue, pan-African data infrastructure startup.",
        "Built and run the waitlist system on Airtable and Fillout, sourcing the first 100 waitlist users.",
        "Research grants for the fundraising pipeline and produce branded company assets, such as letterheads and email templates."
      ]
    },
    {
      org: "AKD (Apex Knowledge Desk)",
      role: "Project Management Associate",
      period: "Aug 2026 to Present",
      points: [
        "Led partnership outreach across 450+ organisations, building a pipeline of around 100 prospective partners and securing 10+ partnerships in one quarter.",
        "Coordinate partnerships, internship pipelines, onboarding and reporting across teams.",
        "Built the partnership tracker and its live Apps Script dashboard."
      ]
    },
    {
      org: "Stableflow",
      role: "Operations Manager (volunteer)",
      period: "Sep 2026 to Present",
      points: [
        "Built the onboarding access system and wrote the Q3 operations report.",
        "Own the HR and operations SOP for the internship programme.",
        "Building the staff leave system from the team's leave policy, as assigned by my supervisor.",
        "Building a task-intake automation with Google Forms, Sheets and Apps Script."
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
      points: ["Designed UX screens and interface flows in Figma and presented them in design reviews."]
    }
  ],

  earlier:
    "Earlier: Cowrywise Campus Ambassador, TRYBE City Virtual Assistant Intern, Hope4aFuture Social Media Assistant, freelance graphic design at The Incubator Hub. The full list is in my CV.",

  certifications: [
    { name: "Virtual Assistant", from: "HNG Tech", year: "2026" },
    { name: "Graphic Design", from: "Digital Skill Up Africa", year: "2025" },
    { name: "Virtual Assistant Training", from: "Ladies in Tech Africa", year: "2024" },
    { name: "Virtual Assistant Internship", from: "TRYBE City", year: "2024" }
  ],

  education: {
    school: "Obafemi Awolowo University, Ile-Ife",
    detail: "Bachelor of Fine and Applied Arts (Graphics and Printmaking)"
  }
};
