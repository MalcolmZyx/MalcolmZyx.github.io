/*
  Project data: one entry per project, in display order.
  Keep it newest first, by when the project ended (most recent month at the top).

  Images (no code changes needed beyond this file):
    Cover / grid thumbnail   assets/images/projects/<slug>.jpg        (or .png / .webp) name must match the slug
    Hover preview (optional) assets/images/projects/<slug>-preview.mp4 silent, under 10 s, under 5 MB
    Extra carousel images    only shown if listed in `images` below, e.g.
                             images: [{ src: "<slug>-2.jpg", alt: "What the image shows" }]
  Videos: add YouTube video IDs to `videos` (the part after watch?v=).
  If there is no cover image, the YouTube thumbnail is used, then a colored title tile.

  Fields
    slug       file-name key (lowercase, hyphens)
    cat        filter chip: ml | data | software | games
    badge      short, real result shown on the thumbnail (optional)
    links      [{ label, href }]
*/
window.PROJECTS = [
  {
    slug: "ross",
    title: "ROSS",
    coverAlt: "Malcolm holding the first-place check for ROSS",
    cat: "software",
    kind: "AI hackathon",
    dates: "Oct 2026",
    team: "Team of 2, Swans Applied AI Hackathon, San Diego",
    badge: "1st place",
    summary: "First-place hackathon app that turns a personal-injury case file into a cited, 90-second brief for the attorney.",
    description: "Won first place at the Swans Applied AI Hackathon. ROSS (demoed as CaseLight) reads a law firm's case from Clio Manage without ever writing to it, digests every note, email, call, task and document, and produces two views: a 90-second brief for the attorney and a curated, view-tracked portal for the medical providers treating the client.",
    highlights: [
      "Read Clio Manage through a client that can only send GET requests, so the app can never change a firm's data.",
      "OCR'd 522 scanned pages once and linked every injury, number and date back to the exact note, email or page it came from.",
      "Used Claude Haiku 4.5 to triage entries and Claude Opus 5.5 to write the cited brief, caching every call so a case is never processed twice (about $0.40 for a first full digest).",
      "Built the provider portal server-side from an allow-list, so case value and strategy notes never reach providers, and logged every time a share link is opened."
    ],
    impact: [
      "1st place at the Swans Applied AI Hackathon 2026."
    ],
    stack: ["Node.js", "Claude API", "SQLite", "Tesseract OCR", "Clio API", "Docker"],
    videos: [],
    images: [
      { src: "ross-2.jpg", alt: "The ROSS team in front of the Law-Di-Gras backdrop" },
      { src: "ross-3.jpg", alt: "The team building ROSS during the hackathon" },
      { src: "ross-4.jpg", alt: "The team receiving the first-place check on stage" }
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/ROSS" }]
  },
  {
    slug: "synthetic-data-research",
    title: "Synthetic Data in AV Research",
    cat: "ml",
    kind: "Computer vision research",
    dates: "Jan – Jul 2026",
    team: "Co-authored with Evan Petersen and Dr. Muhammad Lutfor Rahman, CSUSM",
    badge: "Up to 80% fewer labels",
    coverAlt: "Malcolm at demo day next to the Critical Realism Threshold presentation",
    summary: "Showed synthetic pre-training saturates at 20–40% real data, training detectors on 22K+ images across a Slurm GPU cluster.",
    description: "A computer vision study measuring the informational return on synthetic driving data: how much simulator realism actually transfers to real-world perception, and when adding more stops helping.",
    highlights: [
      "Standardized 22,000+ synthetic images across three simulators, converted to Parquet and WebDataset shards on Hugging Face Hub for high-throughput streaming to HPC nodes.",
      "Supervised the Faster R-CNN detection baseline, running multi-architecture training on an NVIDIA RTX A5500 cluster with Slurm and PyTorch DDP.",
      "Applied Bridged Transfer Learning (BTL++) with classifier-head resets and checkpointing to isolate the simulation signal before real-world adaptation."
    ],
    impact: [
      "Synthetic pre-training saturates at 20–40% real data, which can cut labeling costs by up to 80%.",
      "Established architecture- and dataset-dependent saturation benchmarks for safety-critical perception."
    ],
    stack: ["Python", "PyTorch", "Faster R-CNN", "Slurm", "DDP", "WebDataset", "OpenCV", "pycocotools"],
    videos: [],
    images: [
      { src: "synthetic-data-research-2.jpg", alt: "Study design: data standardization, synthetic pre-training on YOLOv8, YOLOv10 and Faster R-CNN, then fine-tuning on 10 to 100 percent real data" },
      { src: "synthetic-data-research-3.jpg", alt: "Sample frames from the three synthetic datasets: Synscapes, UrbanSyn and RealDriveSim" }
    ],
    links: []
  },
  {
    slug: "ai-engineering-challenge",
    title: "AI Engineering Challenge",
    cat: "software",
    kind: "Voice AI",
    dates: "Jul 2026",
    summary: "A voice-agent QA harness that calls conversational AI agents with scripted patient scenarios and flags transcripts for review.",
    description: "Built for an AI engineering challenge: a scenario-driven voice caller that exercises conversational AI agents, plus a transcript QA tool that tracks what happened in each test run.",
    highlights: [
      "Built a real-time voice pipeline with Pipecat, Groq speech recognition and LLM responses, and local Kokoro speech synthesis.",
      "Defined multi-step patient scenarios in JSON, with follow-up states that advance when the caller says a trigger phrase.",
      "Wrote a transcript analyzer that builds a human-review queue, flagging empty or one-sided conversations and runs outside the 1–3 minute target."
    ],
    impact: [],
    stack: ["Python", "Pipecat", "Groq", "Kokoro TTS", "JSON"],
    videos: [],
    images: [],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/AI-Voice-Bot-Engineering-Challenge" }]
  },
  {
    slug: "project-souls",
    title: "Project Souls",
    coverAlt: "A red rock canyon under a giant ribcage in Project Souls",
    cat: "games",
    kind: "Game AI",
    dates: "Mar – May 2026",
    team: "Team of 6, CS 485, CSUSM",
    badge: "3 of 4 awards",
    summary: "Souls-style RPG with NPCs you can actually talk to: a RAG pipeline in Unity with a Groq Llama 3.1 fallback.",
    description: "A Souls-inspired RPG where I led the AI and security architecture: a state-driven combat loop paired with NPCs that hold real, in-character conversations.",
    highlights: [
      "Designed a hybrid retrieval-augmented generation pipeline inside Unity: low-latency local JSON keyword search with an asynchronous fallback to the Groq API (llama-3.1-8b-instant).",
      "Built system prompts at runtime from live game state, character personality profiles and persistent player stats.",
      "Added a bring-your-own-key system that obfuscates and validates user-provided API keys in persistent storage."
    ],
    impact: [
      "Won 3 of 4 course awards at demo day: technical excellence, best art and best overall game."
    ],
    stack: ["Unity", "C#", "Llama 3.1", "RAG", "Groq API", "Finite state machines"],
    videos: [],
    images: [
      { src: "project-souls-2.jpg", alt: "The den of the final Boss in Project Souls" }
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/Souls-Game" }]
  },
  {
    slug: "constructive-criticism-classifier",
    title: "Constructive Criticism Classifier",
    cat: "ml",
    kind: "Natural language processing",
    dates: "Oct – Dec 2025",
    team: "Team of 3, CS 471, CSUSM",
    badge: "83% F1",
    summary: "Finds actionable feedback in game reviews with a DistilBERT model adapted to gamer slang.",
    description: "An NLP pipeline that pulls actionable criticism out of informal video game reviews, so development teams can prioritize fixes from community feedback instead of reading thousands of emotional reactions.",
    highlights: [
      "Fine-tuned DistilBERT to an 83% F1 score, beating CNN, SVM and Naive Bayes baselines.",
      "Adapted the model to gamer slang with masked language modeling on 50,000 unlabeled reviews.",
      "Built a hybrid TensorFlow/Keras model that combines text embeddings with VADER sentiment scores to reduce length bias.",
      "Used stratified k-fold cross-validation and tuned decision thresholds for consistent results across review lengths."
    ],
    impact: [
      "Separates useful developer feedback from purely emotional responses, at the scale of thousands of reviews."
    ],
    stack: ["Python", "TensorFlow", "Keras", "Hugging Face", "DistilBERT", "VADER", "Pandas"],
    videos: [],
    images: [],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/Constructive-Criticism-Classifier" }]
  },
  {
    slug: "wildfire-predictor",
    title: "Wildfire Predictor",
    cat: "ml",
    kind: "Geospatial machine learning",
    dates: "Aug – Dec 2025",
    team: "Industry-sponsored senior design project, team of 4",
    badge: "80% recall",
    summary: "Geospatial ML sub-model for early wildfire warnings, fed by a pipeline over 160K+ spatial and time-series records.",
    description: "An industry-sponsored proof of concept for predicting wildfire risk, built as part of a larger AI fusion architecture to help emergency responders allocate resources.",
    highlights: [
      "Designed a geospatial ingestion pipeline that automates preprocessing for 160,000+ spatial and time-series records (HDF, GeoTIFF) with CRS alignment.",
      "Fed an interactive UI used to validate model outputs as a corporate platform proof of concept.",
      "Engineered a specialized sub-model within the predictive fusion architecture."
    ],
    impact: [
      "Reached 80% recall on early-warning risk classifications."
    ],
    stack: ["Python", "Geospatial ML", "HDF", "GeoTIFF", "Time series"],
    videos: [],
    images: [],
    links: []
  },
  {
    slug: "youtube-performance-analyzer",
    title: "YouTube Performance Analyzer",
    cat: "data",
    kind: "Analytics and ETL",
    dates: "May – Aug 2025",
    team: "Creator consulting project",
    badge: "Client hit 1K subs",
    summary: "ETL pipeline and dashboard that audits channel performance and surfaces low-competition video topics.",
    description: "An analytics dashboard and ETL pipeline for auditing YouTube channels, which I used to consult for creators on content strategy.",
    highlights: [
      "Built an ETL pipeline on the YouTube Data API v3 to pull, clean and format video statistics, descriptions and tags.",
      "Grouped content into topic clusters with TF-IDF, Sentence Transformers and agglomerative clustering to find what drives clicks and impressions.",
      "Generated video ideas from the YouTube search autocomplete API to surface high-traffic, low-competition keywords.",
      "Found the best video lengths and upload times with duration buckets and calendar heatmaps."
    ],
    impact: [
      "Consulting based on the analysis helped a client pass 1,000 subscribers.",
      "Drove book sales for a health channel and freelance contracts for an accounting firm."
    ],
    stack: ["Python", "YouTube Data API", "scikit-learn", "Sentence Transformers", "Pandas", "Matplotlib"],
    videos: [],
    images: [],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/YouTube-Tool" }]
  },
  {
    slug: "financial-data-automation",
    title: "Financial Data Automation Tool",
    cat: "data",
    kind: "Data engineering",
    dates: "Jun – Jul 2025",
    badge: "1 hr → 10 s",
    summary: "Fills DCF and dividend valuation models in Google Sheets straight from yfinance.",
    description: "A Python ETL pipeline that pulls public financial data into personal valuation models, so a non-technical investor can run institutional-style analysis.",
    highlights: [
      "Extracted balance sheet, cash flow and dividend history indicators automatically with yfinance.",
      "Populated custom dividend discount and discounted cash flow models through the Google Sheets API (gspread).",
      "Connected securely with OAuth 2.0 service accounts and handled API rate limits and dropped connections."
    ],
    impact: [
      "Turned a one-hour manual process into a 10-second automated run, with no manual data entry errors."
    ],
    stack: ["Python", "yfinance", "Google Sheets API", "gspread", "Pandas", "OAuth 2.0"],
    videos: [],
    images: [],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/stocks-util-project" }]
  },
  {
    slug: "codez-ide",
    title: "CodEZ IDE",
    cat: "software",
    kind: "Software engineering",
    dates: "Feb – May 2025",
    team: "Team of 4, CS 370, CSUSM. Demo narrated by a teammate.",
    badge: "Demo",
    summary: "A one-click desktop IDE for intro CS students that compiles C++ and Java locally.",
    description: "A lightweight, privacy-first IDE for novice programmers that replaces crash-prone remote UNIX environments with a one-click desktop app.",
    highlights: [
      "Built the compilation engine on Java ProcessBuilder, running g++ and javac natively.",
      "Streamed live output and errors into the Java Swing interface from background worker threads, so the UI never freezes.",
      "Used the Facade pattern to keep the execution subsystem separate from the interface.",
      "Worked across the full development cycle in an Agile team, from UML design to JUnit tests."
    ],
    impact: [
      "Gave intro students a stable local environment, so they could focus on programming instead of setup."
    ],
    stack: ["Java", "Java Swing", "C++", "JUnit", "UML"],
    videos: ["kgtj6e4F5oo"],
    images: [],
    links: [
      { label: "Code on GitHub", href: "https://github.com/MalcolmZyx/CodEZIDE" },
      { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=kgtj6e4F5oo" }
    ]
  },
  {
    slug: "google-ads-sales-analysis",
    title: "Google Ads Sales Analysis",
    cat: "data",
    kind: "Analytics",
    dates: "Dec 2024 – Jan 2025",
    badge: "+$345K projected",
    summary: "EDA and Welch's t-tests on campaign data to find what actually drives revenue.",
    description: "A cleaning and analysis project on simulated Google Ads campaign data, using statistical tests to separate real revenue drivers from vanity metrics.",
    highlights: [
      "Built an ETL process in Python and Excel to clean and structure raw marketing data.",
      "Explored relationships between CTR, conversion rate and CPA with Seaborn and Matplotlib.",
      "Validated keyword-group hypotheses with Welch's t-tests and modeled budget reallocations for return on ad spend."
    ],
    impact: [
      "Identified reallocations projecting a $345K+ revenue increase.",
      "Showed statistically that a high CTR doesn't guarantee profitability."
    ],
    stack: ["Python", "Pandas", "SciPy", "Seaborn", "Matplotlib", "Excel"],
    videos: [],
    images: [],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/Google-Ads-Sales-Analysis" }]
  },
  {
    slug: "tcp-chat-system",
    title: "Multi-User TCP Chat",
    cat: "software",
    kind: "Networking",
    dates: "Oct – Dec 2024",
    team: "Course project, CS 436, CSUSM",
    summary: "Multi-threaded chat server with a custom protocol, history sync and file sharing.",
    description: "A real-time chat server and client over TCP that handles concurrent users, session state and file sharing.",
    highlights: [
      "Handled up to 10 simultaneous clients with Python sockets and daemon threads.",
      "Managed joins and leaves, unique usernames and capacity limits automatically.",
      "Sent the full chat history to new users on join, using a custom protocol with JOIN, QUIT and REPORT flags."
    ],
    impact: [],
    stack: ["Python", "Sockets", "Threading", "TCP/IP"],
    videos: [],
    images: [],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/Network-Programming" }]
  },
  {
    slug: "zombie-trail",
    title: "Zombie Trail",
    cat: "games",
    kind: "Game jam",
    dates: "Winter 2024",
    team: "2024 Winter Game Jam",
    summary: "Unity game jam entry that alternates night-time wave defense with daytime resource management across a map of the US.",
    description: "A zombie-apocalypse game built in Unity for the 2024 Winter Game Jam, alternating between a night stage and a day stage.",
    highlights: [
      "Night: a bullet-hell wave defense where you keep your party and bus alive against six zombie types, from walkers to tanks.",
      "Day: choose a destination on a map of the United States, where each location favors different resources such as food, weapons, ammo and gas.",
      "Surviving a night earns currency and a choice of loot to spend during the next day."
    ],
    impact: [],
    stack: ["Unity", "C#"],
    videos: [],
    images: [],
    links: [{ label: "Code on GitHub", href: "https://github.com/MalcolmZyx/Zombie-Trail" }]
  },
  {
    slug: "trench-runner",
    title: "Trench Runner",
    cat: "games",
    kind: "Game",
    dates: "Jan – Mar 2023",
    summary: "A Star Wars trench-run infinite runner in Unity.",
    description: "An infinite runner recreating the Star Wars trench run, with smooth 3D ship physics.",
    highlights: [
      "Drove a deterministic obstacle system with a custom queue data structure."
    ],
    impact: [],
    stack: ["Unity", "C#"],
    videos: [],
    images: [],
    links: []
  }
];
