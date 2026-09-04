import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Link } from "wouter";

const navItems = [["index", "/"], ["work", "/work"], ["story", "/story"], ["recognition", "/recognition"], ["contact", "/contact"]];
const universes = [
  { number: "01", label: "PRODUCTS", title: "From idea to something people can use.", copy: "Product thinking, ecosystem design and technology brought into one frame.", tone: "blue" },
  { number: "02", label: "WEB / SOFTWARE", title: "Digital systems with a point of view.", copy: "Web experiences, applications and technical builds—shown as work, not a logo wall.", tone: "silver" },
  { number: "03", label: "CREATIVE", title: "Visual language that makes a message move.", copy: "Graphic design, video editing, content and experimental direction.", tone: "warm" },
  { number: "04", label: "BRAND & STRATEGY", title: "The thinking behind the thing.", copy: "Positioning, partnerships, growth initiatives and the bridge from concept to traction.", tone: "blue" },
];

function Scene() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.1, 5.6);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const group = new THREE.Group();
    scene.add(group);
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.15, 0.28, 170, 28, 2, 3),
      new THREE.MeshPhysicalMaterial({ color: 0x2b8cff, metalness: 0.72, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.14, emissive: 0x061a34, emissiveIntensity: 0.75 })
    );
    group.add(knot);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.012, 12, 180),
      new THREE.MeshBasicMaterial({ color: 0x8dbfff, transparent: true, opacity: 0.55 })
    );
    ring.rotation.x = Math.PI * 0.45;
    group.add(ring);

    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(420 * 3);
    for (let i = 0; i < dustPositions.length; i += 3) {
      const r = 2.2 + Math.random() * 2.8;
      const a = Math.random() * Math.PI * 2;
      dustPositions[i] = Math.cos(a) * r;
      dustPositions[i + 1] = (Math.random() - 0.5) * 3.8;
      dustPositions[i + 2] = Math.sin(a) * r - 1;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0x86b8ff, size: 0.018, transparent: true, opacity: 0.62 }));
    scene.add(dust);

    scene.add(new THREE.AmbientLight(0x8ebaff, 0.42));
    const key = new THREE.PointLight(0x2b8cff, 20, 8); key.position.set(2.6, 1.8, 3); scene.add(key);
    const warm = new THREE.PointLight(0xc99458, 9, 7); warm.position.set(-2.4, -1.2, 2); scene.add(warm);

    const onMove = (e: MouseEvent) => { pointer.current.x = (e.clientX / window.innerWidth - 0.5); pointer.current.y = (e.clientY / window.innerHeight - 0.5); };
    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener("mousemove", onMove); window.addEventListener("resize", onResize);
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = performance.now() * 0.00035;
      knot.rotation.x = t * 0.6;
      knot.rotation.y = t * 0.92;
      ring.rotation.z = -t * 0.5;
      group.position.x += (pointer.current.x * 0.32 - group.position.x) * 0.035;
      group.position.y += (-pointer.current.y * 0.24 - group.position.y) * 0.035;
      group.rotation.z += (pointer.current.x * 0.08 - group.rotation.z) * 0.02;
      dust.rotation.y = t * 0.18;
      renderer.render(scene, camera);
    };
    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", onResize); renderer.dispose(); knot.geometry.dispose(); (knot.material as THREE.Material).dispose(); ring.geometry.dispose(); (ring.material as THREE.Material).dispose(); dustGeometry.dispose(); (dust.material as THREE.Material).dispose(); };
  }, []);

  return <canvas ref={ref} className="scene-canvas" aria-label="Interactive abstract 3D form" />;
}

export default function Home() {
  const [active, setActive] = useState("index");
  const [menuOpen, setMenuOpen] = useState(false);
  const jump = (id: string) => { setActive(id); setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <main className="portfolio-shell">
      <Scene />
      <div className="grain" />
      <header className="topbar">
        <button className="wordmark" onClick={() => jump("index")} aria-label="Back to index"><span className="mark">A</span><span>ASHRAF<br /><small>SALISU MOHAMMED</small></span></button>
        <div className="topbar-meta">MULTIDISCIPLINARY / 2026</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "CLOSE" : "MENU"}</button>
        <nav className={menuOpen ? "nav open" : "nav"}>{navItems.map(([item, href], i) => <Link key={item} href={href} className={active === item ? "active" : ""} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{item}</Link>)}</nav>
      </header>

      <section id="index" className="hero section-pad">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span className="pulse" /> AVAILABLE FOR THE RIGHT BUILD</p>
          <h1>I build across<br /><em>the intersection.</em></h1>
          <p className="hero-lede">Developer. Creative. Product builder. Strategist.<br />Not another person in one box.</p>
          <div className="hero-actions"><Link className="button-primary" href="/work">ENTER THE WORK <span>↗</span></Link><Link className="text-link" href="/story">READ THE STORY <span>↓</span></Link></div>
        </div>
        <div className="hero-side"><div className="side-label">TECHNOLOGY<br />CREATIVITY<br />PRODUCT<br />BUSINESS</div><div className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></div></div>
        <div className="ide-window"><div className="ide-bar"><span className="ide-dots">● ● ●</span><span>ashraf / portfolio.tsx</span><span>⌘ K</span></div><div className="ide-body"><div className="line-nos">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08</div><pre><span className="code-key">const</span> <span className="code-name">ashraf</span> = {'{'}<br />  <span className="code-key">role</span>: <span className="code-string">“builder”</span>,<br />  <span className="code-key">range</span>: [<span className="code-string">“code”</span>, <span className="code-string">“create”</span>],<br />  <span className="code-key">focus</span>: <span className="code-string">“make it matter”</span>,<br />  <span className="code-key">status</span>: <span className="code-string">“shipping”</span>,<br />{'}'}<br /><span className="code-cursor">▌</span></pre></div><div className="ide-status"><span>● SYSTEM ONLINE</span><span>THREE / REACT / IDEAS</span></div></div>
      </section>

      <section id="work" className="section-pad work-section">
        <div className="section-intro"><p className="eyebrow">01 / THE WORK</p><h2>A portfolio with<br /><em>more than one language.</em></h2><p className="section-copy">The work lives across products, software, visual systems and the strategy that makes an idea matter.</p></div>
        <div className="universe-grid">{universes.map((u) => <article className={`universe-card ${u.tone}`} key={u.number}><div className="card-top"><span>{u.number}</span><span>OPEN ↗</span></div><div className="card-orb" /><p className="card-label">{u.label}</p><h3>{u.title}</h3><p>{u.copy}</p><div className="card-line" /></article>)}</div>
      </section>

      <section className="studio-section section-pad"><div className="studio-head"><div><p className="eyebrow">02 / THE STUDIO</p><h2>Where the<br /><em>work gets made.</em></h2></div><p className="section-copy">A working system for turning loose questions into visual, technical and commercial realities.</p></div><div className="studio-grid"><div className="terminal-panel"><div className="terminal-top"><span>ashraf@studio:~</span><span>LIVE</span></div><div className="terminal-body"><p><span className="terminal-prompt">➜</span> cat current-focus.txt</p><p className="terminal-muted">building products that feel obvious in hindsight.</p><p><span className="terminal-prompt">➜</span> ls /capabilities</p><div className="terminal-files"><span>01_strategy</span><span>02_products</span><span>03_visuals</span><span>04_content</span><span>05_systems</span><span>06_growth</span></div><p><span className="terminal-prompt">➜</span> <span className="terminal-cursor">_</span></p></div></div><div className="studio-note"><span className="note-number">03</span><div><p className="eyebrow">A DIFFERENT KIND OF PORTFOLIO</p><h3>Not a list of skills.<br />A record of <em>range.</em></h3><p>Some people ship code. Some shape brands. Some understand the business around the build. The interesting work happens when all three are in the room.</p></div></div></div></section>

      <section className="feature-section section-pad"><div className="feature-frame"><div className="feature-media"><div className="media-grid" /><span className="media-stamp">CASE STUDY / 001</span><span className="media-placeholder">MEDIA<br />ARCHIVE<br />LOADING</span></div><div className="feature-copy"><p className="eyebrow">FEATURED PRODUCT</p><h2>Carevo<br /><em>healthcare from home.</em></h2><p>A virtual hospital and healthcare ecosystem connecting patients, practitioners, pharmacy and laboratory services remotely.</p><div className="stat-row"><div><strong>700+</strong><span>practitioners</span></div><div><strong>3,000+</strong><span>patients</span></div><div><strong>01</strong><span>ecosystem</span></div></div><Link className="button-primary" href="/products">VIEW CASE STUDY <span>↗</span></Link></div></div></section>

      <section id="story" className="story-section section-pad"><div className="story-index">04<br /><span>HOW I GOT HERE</span></div><div className="story-copy"><p className="eyebrow">THE THROUGH-LINE</p><h2>Started by creating.<br />Learned to build.<br /><em>Now I build across all four.</em></h2><p>Graphic design led toward digital work. Digital work led toward development. Development led toward product building. Product building led toward startups and business.</p><p className="quote">“I’ve never been particularly interested in choosing between technology and creativity. I wanted to understand both.”</p></div></section>

      <section id="recognition" className="recognition-section section-pad"><div className="section-intro"><p className="eyebrow">05 / RECOGNITION</p><h2>Proof of motion.</h2></div><div className="recognition-list">{[["02", "2ND PLACE", "Africa’s Talking Real Estate Hackathon", "APRIL 2026"], ["RU", "RUNNER-UP", "Dabo Hackathon", "DECEMBER 2025"], ["08", "8TH PLACE", "Kasitda Hackathon", "SEPTEMBER 2025"], ["V", "VOLUNTEER OF THE YEAR", "Recovery Hub", "DOCUMENTED RECOGNITION"]].map(([a,b,c,d]) => <div className="recognition-row" key={c}><span className="recognition-no">{a}</span><span className="recognition-result">{b}</span><strong>{c}</strong><span>{d}</span></div>)}</div><div className="archive-note">NASA SPACE APPS / ALUMNI <span>↗</span></div></section>

      <section id="contact" className="contact-section section-pad"><p className="eyebrow">06 / CONTACT</p><h2>Let’s build<br /><em>something.</em></h2><p>For products, creative direction, strategy, software, content or the idea that does not fit neatly anywhere yet.</p><a className="contact-email" href="mailto:[EMAIL NEEDED]">[EMAIL NEEDED] <span>↗</span></a><div className="contact-bottom"><span>ASHRAF SALISU MOHAMMED</span><span>GITHUB / 791BOTLYKCODES</span><span>LINKEDIN / [URL NEEDED]</span></div></section>
      <footer className="footer"><span>© 2026 ASHRAF SALISU MOHAMMED</span><span>BUILT BETWEEN IDEAS</span><span>NO BOXES</span></footer>
    </main>
  );
}
