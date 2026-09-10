import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Download,
  Github,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react'

const navItems = ['About', 'Projects', 'Experience', 'Contact']

const projects = [
  {
    number: '01',
    title: 'MovieApp',
    type: 'Featured personal project · Four-part ecosystem',
    description:
      'A complete movie discovery and premium membership platform built as four connected applications, from the customer experience and REST API to administration and real-time support.',
    details: [
      'TMDB-powered movie and TV discovery',
      'JWT cookie sessions with queued token refresh',
      'Premium purchase review and activation workflow',
    ],
    parts: [
      {
        number: '01',
        name: 'Customer website',
        stack: 'React · TypeScript · Zustand',
        text: 'Discovery, search, detail pages, favorites, bookmarks, recent views, account management, and premium purchases.',
      },
      {
        number: '02',
        name: 'Backend API',
        stack: 'Node.js · Express · MongoDB',
        text: 'TMDB proxy, email verification, session authentication, user data, media uploads, plans, payments, and purchases.',
      },
      {
        number: '03',
        name: 'Admin dashboard',
        stack: 'React · Redux Toolkit · Radix UI',
        text: 'User and role management, premium plans, payment configuration, purchase approvals, and the support queue.',
      },
      {
        number: '04',
        name: 'Pusher service',
        stack: 'Express · Pusher · MongoDB',
        text: 'Dedicated support conversations with agent assignment, optimistic message reconciliation, and live status events.',
      },
    ],
    caseStudy: [
      {
        label: 'Product flow',
        title: 'Discovery through membership',
        text: 'The customer app uses the backend as a TMDB proxy for trending titles, search, genres, cast, trailers, and recommendations. Signed-in users can maintain favorites, bookmarks, and recently viewed titles, then submit a premium request in the same product experience.',
      },
      {
        label: 'Authentication',
        title: 'Sessions built for continuity',
        text: 'Registration includes email activation, while access and refresh tokens are delivered through HTTP-only cookies. An Axios refresh queue holds concurrent failed requests behind one token renewal and then retries them together.',
      },
      {
        label: 'Operations',
        title: 'A complete approval loop',
        text: 'Customers upload payment proof to Cloudinary and track the request status. Administrators review each submission, approve or reject it, and the backend updates premium access before Pusher tells the customer interface to refresh.',
      },
      {
        label: 'Real-time support',
        title: 'A service of its own',
        text: 'Support is isolated in a separate Express and MongoDB service. Messages are written through REST and broadcast through Pusher, with agent assignment, optimistic client IDs, saved-message reconciliation, and seen-status updates.',
      },
    ],
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Pusher'],
    links: [
      { label: 'Customer website', url: 'https://movie-app-website-pi.vercel.app/' },
      { label: 'Admin dashboard', url: 'https://movie-dashboard-gray.vercel.app/' },
    ],
    images: [
      '/projects/movie-website.png',
      '/projects/movie-website1.png',
      '/projects/movie-dashboard.png',
      '/projects/movie-dashboard1.png',
      '/projects/movie-dashboard2.png',
      '/projects/movie-dashboard3.png',
      '/projects/movie-dashboard4.png',
    ],
    theme: 'lime',
    featured: true,
  },
  {
    number: '02',
    title: 'DevCommunity',
    type: 'Personal project · Full-stack social platform',
    description:
      'A developer community for publishing, discovery, and conversation, built with optimistic interactions, relational social features, and real-time notification refresh.',
    details: [
      'Google OAuth and verified email accounts',
      'Threaded comments, reactions, and social graph',
      'SSE notification refresh and cursor pagination',
    ],
    caseStudy: [
      {
        label: 'Social model',
        title: 'More than a post feed',
        text: 'The PostgreSQL schema connects profiles, follows, posts, hashtags, typed reactions, recursive comments, and notifications. These relationships power public profiles, following feeds, tag discovery, threaded replies, and network views.',
      },
      {
        label: 'Interaction design',
        title: 'Immediate by default',
        text: 'Post publishing, reactions, comments, follows, and notification state use optimistic updates so frequent interactions feel immediate. Cursor-based loading keeps feeds and notifications incremental.',
      },
      {
        label: 'Server architecture',
        title: 'Mutations that stay consistent',
        text: 'Next.js Server Actions pair social mutations with transactional notification records, then invalidate focused cache tags for affected posts, profiles, and users. Authenticated server-sent events prompt clients to refresh durable notification data.',
      },
      {
        label: 'Identity & media',
        title: 'Integrated platform services',
        text: 'Better Auth provides password accounts, email verification, Google OAuth, and password-reset OTP. Vercel Blob handles post and avatar media cleanup, while Prisma and Neon provide the relational data layer.',
      },
    ],
    stack: ['Next.js 16', 'React 19', 'Prisma', 'PostgreSQL', 'Better Auth'],
    links: [
      { label: 'Live project', url: 'https://dev-community-eight.vercel.app/' },
    ],
    images: [
      '/projects/dev-community.png',
      '/projects/dev-community1.png',
      '/projects/dev-community2.png',
      '/projects/dev-community3.png',
    ],
    theme: 'violet',
  },
]

const experience = [
  {
    period: 'Jun 2024 — Present',
    role: 'Frontend Developer',
    company: 'Future Innovation IT',
    focus: 'Interactive Media & Fintech Platforms',
    summary:
      'Building responsive AI media dashboards, real-time financial modules, and admin analytics across complex operational products.',
  },
  {
    period: 'Jul 2023 — Apr 2024',
    role: 'Frontend Developer',
    company: 'K Win Technologies',
    focus: 'Healthcare POS & Finance Modules',
    summary:
      'Developed healthcare POS systems, clinical printing workflows, multi-tier vouchers, and reusable type-safe UI foundations.',
  },
]

const skills = {
  Frontend: ['React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
  'Backend & Data': ['Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'MongoDB', 'Redis'],
  'State & Realtime': ['Zustand', 'Redux Toolkit', 'Pinia', 'Pusher', 'Socket.io', 'REST APIs'],
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [gallery, setGallery] = useState(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    document.body.style.overflow = gallery ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [gallery])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!gallery) return
      if (event.key === 'Escape') setGallery(null)
      if (event.key === 'ArrowRight') setSlide((value) => (value + 1) % gallery.images.length)
      if (event.key === 'ArrowLeft') setSlide((value) => (value - 1 + gallery.images.length) % gallery.images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [gallery])

  const openGallery = (project) => {
    setSlide(0)
    setGallery(project)
  }

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Taing Linn Maung home">
          <span>TL</span>M
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <a className="header-cta" href="mailto:slprogramming.dev@gmail.com">
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span className="status-dot" /> Available for new opportunities
          </div>
          <h1 id="hero-title">
            I build digital products<br />
            that <span>move fast</span> and<br />
            feel <em>effortless.</em>
          </h1>
          <div className="hero-bottom">
            <div className="hero-intro">
              <p>
                Frontend & full-stack developer focused on high-performance interfaces,
                secure fintech systems, and real-time products.
              </p>
              <a className="cv-button" href="/cvResume/TaingLinnMaung.pdf" download="Taing-Linn-Maung-CV.pdf">
                <Download size={16} /> Download CV
              </a>
            </div>
            <a href="#projects" className="circle-link" aria-label="View personal projects">
              <ArrowDownRight />
            </a>
          </div>
          <div className="hero-meta">
            <span><MapPin size={15} /> Yangon, Myanmar</span>
            <span>2+ years of experience</span>
          </div>
        </section>

        <section className="intro section-shell" id="about">
          <div className="section-label"><span>01</span> About</div>
          <div className="intro-copy">
            <p className="eyebrow">Performance in every pixel.</p>
            <h2>I turn complex product requirements into clear, responsive experiences.</h2>
            <div className="intro-detail">
              <p>
                My work sits where thoughtful interface design meets robust engineering. From live financial operations
                to community platforms, I build systems that stay fast, predictable, and maintainable as they scale.
              </p>
              <div className="signature">Taing Linn Maung</div>
            </div>
          </div>
        </section>

        <section className="work section-shell" id="projects">
          <div className="section-heading">
            <div className="section-label"><span>02</span> Personal projects</div>
            <p>Self-initiated builds created to explore product architecture, real-time systems, and full-stack engineering.</p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <article className={`project project-${project.theme}${project.featured ? ' featured-project' : ''}`} key={project.title}>
                <div className="project-topline">
                  <div>
                    <p className="eyebrow">{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-intro">
                    <p className="project-description">{project.description}</p>
                    <div className="project-links">
                      {project.links.map((link) => (
                        <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                          {link.label} <ArrowUpRight size={15} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="project-visual" onClick={() => openGallery(project)} aria-label={`Open ${project.title} gallery`}>
                  <img src={project.images[0]} alt={`${project.title} interface`} />
                  <span className="view-project">View gallery <ArrowUpRight size={17} /></span>
                  <span className="project-index">{project.number}</span>
                </button>
                {project.parts && (
                  <div className="project-parts" aria-label="MovieApp architecture">
                    {project.parts.map((part) => (
                      <div className="project-part" key={part.name}>
                        <span>{part.number}</span>
                        <h4>{part.name}</h4>
                        <p className="part-stack">{part.stack}</p>
                        <p>{part.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="case-study">
                  <div className="case-study-heading">
                    <span>Inside the build</span>
                    <h4>How {project.title} works</h4>
                  </div>
                  <div className="case-study-grid">
                    {project.caseStudy.map((section, index) => (
                      <div className="case-study-item" key={section.title}>
                        <span className="case-number">{String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <p className="case-label">{section.label}</p>
                          <h5>{section.title}</h5>
                        </div>
                        <p className="case-copy">{section.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="project-footer">
                  <ul className="project-details">
                    {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                  <div className="stack-list">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell" id="experience">
          <div className="section-label"><span>03</span> Experience</div>
          <div className="experience-content">
            <h2>Building products<br />that do real work.</h2>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={item.company}>
                  <div className="timeline-period">{item.period}</div>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="company">{item.company}</p>
                    <p className="focus">{item.focus}</p>
                    <p className="timeline-summary">{item.summary}</p>
                  </div>
                </article>
              ))}
              <article className="timeline-item education-item">
                <div className="timeline-period">Jan — Jun 2026</div>
                <div>
                  <h3>Diploma in Web Development</h3>
                  <p className="company">Y-Max University College</p>
                  <p className="focus">CFE Customised Qualification · Expected June 2026</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="skills section-shell" aria-labelledby="skills-title">
          <div className="section-label"><span>04</span> Toolkit</div>
          <div className="skills-content">
            <h2 id="skills-title">Technologies I use to ship.</h2>
            <div className="skill-groups">
              {Object.entries(skills).map(([group, items]) => (
                <div className="skill-group" key={group}>
                  <h3>{group}</h3>
                  <div>{items.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-orbit"><Code2 /></div>
          <p className="eyebrow">Have a project or opportunity?</p>
          <h2>Let’s make something<br /><em>worth using.</em></h2>
          <a className="email-link" href="mailto:slprogramming.dev@gmail.com">
            slprogramming.dev@gmail.com <ArrowUpRight />
          </a>
          <div className="contact-links">
            <a href="https://github.com/SLprogramming" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
            <a href="tel:+95959421909"><Phone size={18} /> 09-959421909</a>
            <a href="mailto:slprogramming.dev@gmail.com"><Mail size={18} /> Email</a>
          </div>
        </section>
      </main>

      <footer>
        <a className="logo" href="#top"><span>TL</span>M</a>
        <p>Frontend & Full-Stack Developer</p>
        <p>© {new Date().getFullYear()} Taing Linn Maung</p>
      </footer>

      {gallery && (
        <div className="gallery" role="dialog" aria-modal="true" aria-label={`${gallery.title} project gallery`}>
          <div className="gallery-bar">
            <div><span>{gallery.number}</span> {gallery.title}</div>
            <div>{String(slide + 1).padStart(2, '0')} / {String(gallery.images.length).padStart(2, '0')}</div>
            <button onClick={() => setGallery(null)} aria-label="Close gallery"><X /></button>
          </div>
          <div className="gallery-stage">
            <button onClick={() => setSlide((slide - 1 + gallery.images.length) % gallery.images.length)} aria-label="Previous image"><ArrowLeft /></button>
            <img src={gallery.images[slide]} alt={`${gallery.title} screen ${slide + 1}`} />
            <button onClick={() => setSlide((slide + 1) % gallery.images.length)} aria-label="Next image"><ArrowRight /></button>
          </div>
          <div className="gallery-dots">
            {gallery.images.map((image, index) => (
              <button key={image} className={slide === index ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`View image ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default App
