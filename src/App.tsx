import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Check if hero is visible
      setIsHeroVisible(window.scrollY < 300)
      
      // Trigger bubble animation for hero title when scrolling
      if (heroRef.current && window.scrollY < 300) {
        const titleSpans = heroRef.current.querySelectorAll('h2 span')
        titleSpans.forEach((span: Element, index: number) => {
          const randomDelay = Math.random() * 0.5
          if (window.scrollY > 50 + index * 20) {
            (span as HTMLElement).classList.add('bubble-animate')
            setTimeout(() => {
              (span as HTMLElement).classList.remove('bubble-animate')
            }, 800 + randomDelay * 1000)
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      const newVisible = new Set(visibleSections)
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          newVisible.add(entry.target.id)
        }
      })
      setVisibleSections(newVisible)
    }, observerOptions)

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <nav className="navbar">
          <h1 className="logo">Jammana Praveen Kumar</h1>
          <button 
            className={`menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
            <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="hero" ref={heroRef}>
          <div 
            className="hero-bg-animation"
            style={{
              transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
            }}
          />
          <div className="hero-content">
            <div className="hero-title-wrapper">
              <h2 style={{ transform: `translateY(${scrollY * -0.3}px)` }} className="bubble-text">
                <span>🧪</span>
                <span>Software</span>
                <span>Test</span>
                <span>Engineer</span>
              </h2>
            </div>
            <p className="hero-main-text" style={{ transform: `translateY(${scrollY * -0.2}px)` }}>
              Professional QA Engineer with 15+ months of hands-on experience in Manual & Automation Testing
            </p>
            <p 
              className="hero-subtitle" 
              style={{ transform: `translateY(${scrollY * -0.15}px)` }}
            >
              🤖 Android • iOS • Web • Gaming Applications | 🛠️ Selenium • Postman • JIRA
            </p>
            <button 
              className="cta-button" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ transform: `scale(${1 + scrollY * 0.0001})` }}
            >
              <span className="button-text">💫 View My Work</span>
              <span className="button-icon">→</span>
            </button>
          </div>
          <div className="scroll-indicator" style={{ opacity: Math.max(0, 1 - scrollY / 300) }}>
            <span>↓ Scroll to explore ↓</span>
          </div>
        </section>

        <section id="about" className={`about ${visibleSections.has('about') ? 'visible' : ''}`}>
          <h2>👤 Professional Summary</h2>
          <p className="summary-text">
            Professional Software Test Engineer with 15 months of hands-on experience in manual and automation testing 
            across Android, iOS, web, and gaming applications. Skilled in Selenium (Java), API testing (Postman), 
            Basic SQL and JIRA for bug tracking and test management. Passionate about enhancing software quality through 
            effective testing strategies, detailed bug reporting, and seamless collaboration with development teams.
          </p>
          <div className="summary-details">
            <div className="detail-item detail-1">
              <strong>📍 Location:</strong> Bangalore
            </div>
            <div className="detail-item detail-2">
              <strong>📧 Email:</strong> jammanapraveenkumarreddy@gmail.com
            </div>
            <div className="detail-item detail-3">
              <strong>📞 Phone:</strong> +91 6303307544
            </div>
            <div className="detail-item detail-4">
              <strong>⚡ Availability:</strong> Immediate Joiner
            </div>
          </div>
        </section>

        <section id="experience" className={`experience ${visibleSections.has('experience') ? 'visible' : ''}`}>
          <h2>💼 Professional Experience</h2>
          <div className="experience-card exp-card-1">
            <div className="exp-header">
              <h3>Software Test Engineer</h3>
              <span className="exp-company">TECH4BILLION MEDIA PVT LTD (CHINGARI)</span>
            </div>
            <p className="exp-duration">Dec 2023 – Present</p>
            <ul className="exp-details">
              <li>Designed and executed test cases, automation scripts, and frameworks using Selenium & TestNG</li>
              <li>Performed manual and automation testing for Android, iOS, web applications, and gaming platforms</li>
              <li>Verified audio/video quality, latency, and user experience across different network conditions</li>
              <li>Identified and reported critical bugs with detailed step-by-step reproduction and screenshots</li>
              <li>Conducted API testing using Postman to validate REST API functionality and response accuracy</li>
              <li>Executed regression testing to identify defects and ensure software stability before releases</li>
              <li>Collaborated with developers and product teams, using JIRA for effective bug tracking</li>
              <li>Analyzed mobile network logs for debugging issues</li>
              <li>Performed security testing for blockchain applications</li>
              <li>Compared app designs with Figma prototypes to ensure UI/UX consistency</li>
              <li>Tested navigation flow, responsiveness, and usability for smooth user experience</li>
            </ul>
          </div>
        </section>

        <section id="skills" className={`skills ${visibleSections.has('skills') ? 'visible' : ''}`}>
          <h2>🎯 Skills & Tools</h2>
          
          <div className="skills-category">
            <h3>🧪 Testing Types</h3>
            <div className="skills-list">
              <div className="skill">Manual Testing</div>
              <div className="skill">Automation Testing</div>
              <div className="skill">Functional Testing</div>
              <div className="skill">Regression Testing</div>
              <div className="skill">API Testing</div>
              <div className="skill">Mobile Testing</div>
              <div className="skill">Security Testing</div>
              <div className="skill">Event Testing</div>
            </div>
          </div>

          <div className="skills-category">
            <h3>🛠️ Tools & Frameworks</h3>
            <div className="skills-list">
              <div className="skill">Selenium WebDriver</div>
              <div className="skill">TestNG</div>
              <div className="skill">Postman</div>
              <div className="skill">Rest Assured</div>
              <div className="skill">JMeter</div>
              <div className="skill">JIRA</div>
              <div className="skill">TestRail</div>
              <div className="skill">Bugzilla</div>
              <div className="skill">Eclipse</div>
              <div className="skill">Figma</div>
            </div>
          </div>

          <div className="skills-category">
            <h3>💻 Technical Skills</h3>
            <div className="skills-list">
              <div className="skill">Java</div>
              <div className="skill">SQL</div>
              <div className="skill">SDLC</div>
              <div className="skill">STLC</div>
              <div className="skill">Agile Testing</div>
            </div>
          </div>
        </section>

        <section className={`certifications ${visibleSections.has('certifications') ? 'visible' : ''}`} id="certifications">
          <h2>🏆 Certifications</h2>
          <div className="cert-grid">
            <div className="cert-card">
              <h3>QSpiders (Hebbal)</h3>
              <p className="cert-date">May 2023 – Dec 2023</p>
              <ul>
                <li>Certified in Software Testing (Manual & Automation)</li>
                <li>Certification in Selenium Automation Testing (TestNG, Java, WebDriver)</li>
                <li>Certified in API Testing using Postman and Rest Assured</li>
                <li>Hands-on certification in SDLC, STLC, and Agile Testing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`education ${visibleSections.has('education') ? 'visible' : ''}`} id="education">
          <h2>🎓 Education</h2>
          <div className="edu-card">
            <h3>Mekapati Rajamohan Reddy Institute of Technology & Science</h3>
            <p className="edu-degree">B.Tech - Civil Engineering</p>
            <p className="edu-duration">June 2019 – May 2023</p>
            <p className="edu-gpa">GPA: 7.0/10</p>
          </div>
        </section>

        <section id="contact" className={`contact ${visibleSections.has('contact') ? 'visible' : ''}`}>
          <h2>📞 Let's Connect</h2>
          <p>Feel free to reach out to me. I'm always interested in hearing about new opportunities and collaborations.</p>
          <div className="contact-links">
            <a href="mailto:jammanapraveenkumarreddy@gmail.com" className="contact-link">📧 Email Me</a>
            <a href="tel:+916303307544" className="contact-link">📞 Call Me</a>
            <a href="https://github.com" target="_blank" className="contact-link">🐙 GitHub</a>
            <a href="https://www.linkedin.com/in/jammana-praveen-kumar-reddy-7a6623276/" target="_blank" className="contact-link">💼 LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Jammana Praveen Kumar Reddy. All rights reserved.</p>
        <p className="footer-hobbies">🏏 Cricket • 🏸 Badminton • 🏓 Table Tennis • 🎬 Movies & Web Series</p>
      </footer>
    </div>
  )
}

export default App
