from pathlib import Path
p = Path('/home/ubuntu/interactive-3d-portfolio/client/src/pages/Home.tsx')
s = p.read_text()
s = s.replace('<button className="button-primary" onClick={() => jump("contact")}>VIEW CASE STUDY <span>↗</span></button>', '<Link className="button-primary" href="/products">VIEW CASE STUDY <span>↗</span></Link>')
p.write_text(s)
print('patched', s.count('href="/products"'))
