import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { menu, experiences, skills, projects, contact } from './data'

const base = import.meta.env.BASE_URL

function Certificates() {
  const [items, setItems] = useState([])
  useEffect(() => {
    if (!supabase) return
    supabase.from('certificates').select('*').order('created_at', { ascending: false }).then(({ data }) => setItems(data || []))
  }, [])
  const certificates = [
    { id: 'argawana', src: base + 'sertifikat-argawana.jpg', alt: 'Sertifikat Vertical Rescue Argawana' },
    { id: 'ipnu-poster', src: base + 'sertifikat-ipnu-poster.jpg', alt: 'Sertifikat Juara I Lomba Desain Poster IPNU Lenteng' },
  ]
  return (
    <div className="certs">
      {certificates.map(certificate => (
        <figure className="certificate reveal" key={certificate.id}>
          <img src={certificate.src} alt={certificate.alt} loading="lazy" />
        </figure>
      ))}
      {items.map(c => (
        <figure className="certificate reveal" key={c.id}>
          <img src={c.Img} alt={c.Title || 'Sertifikat'} loading="lazy" />
        </figure>
      ))}
    </div>
  )
}

function Comments() {
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [msg, setMsg] = useState('')
  const load = async () => {
    if (supabase) {
      const { data } = await supabase.from('portfolio_comments').select('*').order('created_at', { ascending: false })
      setList(data || [])
    } else setList(JSON.parse(localStorage.getItem('komentar') || '[]'))
  }
  useEffect(() => { load() }, [])
  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return setMsg('Nama dan komentar wajib diisi.')
    const row = { user_name: name.trim(), content: text.trim() }
    if (supabase) {
      const { error } = await supabase.from('portfolio_comments').insert(row)
      if (error) return setMsg('Komentar gagal dikirim, coba lagi.')
    } else {
      localStorage.setItem('komentar', JSON.stringify([{ ...row, id: Date.now(), created_at: new Date().toISOString() }, ...list]))
    }
    setName(''); setText(''); setMsg(''); load()
  }
  return (
    <>
      <form className="cform reveal" onSubmit={submit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama Anda" maxLength={40} />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Tulis komentar..." maxLength={500} />
        <button className="btn btn-solid">Kirim Komentar</button>
        {msg && <p className="note">{msg}</p>}
      </form>
      {list.length === 0 && <p className="note">Belum ada komentar. Jadilah yang pertama.</p>}
      {list.map(c => (
        <div className="comment" key={c.id}><b>{c.user_name}</b><small>{new Date(c.created_at).toLocaleDateString('id-ID')}</small><p>{c.content}</p></div>
      ))}
    </>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('beranda')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10)
        frame = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const sec = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    document.querySelectorAll('main section[id]').forEach(s => sec.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); if (frame) window.cancelAnimationFrame(frame); sec.disconnect() }
  }, [])

  // Animasi muncul saat scroll (juga untuk elemen yang baru dimuat)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.reveal:not(.show)').forEach(el => io.observe(el))
    return () => io.disconnect()
  })

  return (
    <>
      <header className={'nav' + (scrolled ? ' scrolled' : '')}>
        <a href="#beranda" className="logo">ANM</a>
        <button className={'burger' + (open ? ' open' : '')} aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <nav className={open ? 'open' : ''}>
          {menu.map(([id, label]) => <a key={id} href={'#' + id} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      </header>
      <main>
        <section className="hero" id="beranda">
          <div className="hero-text">
            <span className="eyebrow"><span />Mahasiswa Teknologi Informasi</span>
            <h1>Membangun solusi digital yang <span>bermanfaat.</span></h1>
            <p>Saya Ach. Nurul Mukhlishin, mahasiswa Universitas Annuqayah yang tertarik pada pengembangan website, sistem informasi, UI/UX, serta pemanfaatan teknologi untuk memecahkan masalah nyata.</p>
            <div className="actions"><a href="#tentang" className="btn btn-solid">Kenali Saya</a><a href="#proyek" className="btn btn-line">Lihat Proyek</a></div>
            <div className="hero-meta"><p><b>Lokasi</b><span>Sumenep, Jawa Timur</span></p><p><b>Status</b><span>Aktif belajar & berkembang</span></p></div>
          </div>
          <div className="hero-photo">
            <div className="photo-glow" />
            <div className="arch"><img src={base + 'profil.jpg'} alt="Foto Ach. Nurul Mukhlishin" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = base + 'profil-placeholder.svg' }} /></div>
            <div className="availability"><span /><div><small>Ketersediaan</small><strong>Open to collaborate</strong></div></div>
          </div>
        </section>

        <section className="section about" id="tentang">
          <h2 className="reveal">Mengenal Saya Lebih Dekat.</h2>
          <div className="reveal about-body">
            <p>Saya merupakan mahasiswa Teknologi Informasi yang tertarik mempelajari perkembangan teknologi dan pengembangan sistem berbasis digital. Selama menjalani perkuliahan, saya terus mengembangkan kemampuan melalui berbagai tugas, praktik, dan proyek. Saya percaya bahwa proses belajar, mencoba, dan berkreasi merupakan bagian penting dalam mengembangkan diri.</p>
            <dl className="facts">
              {[['Nama','Ach. Nurul Mukhlishin'],['NIM','241114005'],['Program Studi','Teknologi Informasi'],['Universitas','Universitas Annuqayah'],['Lokasi','Sumenep, Jawa Timur'],['Minat','Web Development, Sistem Informasi, Teknologi, UI/UX Design']].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="section" id="pengalaman">
          <h2 className="reveal">Pengalaman dan Perjalanan.</h2>
          <ol className="timeline">{experiences.map(([t, d]) => <li className="reveal" key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </section>

        <section className="section skills" id="keterampilan">
          <h2 className="reveal">Hal yang Sedang Saya Pelajari.</h2>
          <ul className="skill-list">{skills.map(([i, t, d]) => <li className="reveal" key={t}><span className="ico">{i}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
        </section>

        <section className="section" id="proyek">
          <h2 className="reveal">Proyek Saya.</h2>
          {projects.map(p => (
            <article className="project reveal" key={p.title}>
              <div className="project-preview">
                <div className="browser-bar"><span /><span /><span /></div>
                {p.preview
                  ? <img src={base + p.preview} alt={`Preview ${p.title}`} loading="lazy" />
                  : <div className="preview-fallback"><span>{p.tag}</span><b>{p.title}</b></div>}
              </div>
              <div><h3>{p.title}</h3><p>{p.desc}</p>
                {p.demo && <a href={p.demo} target="_blank" rel="noopener">Lihat demo →</a>}{' '}
                {p.github && <a href={p.github} target="_blank" rel="noopener">Source code →</a>}
              </div>
            </article>
          ))}
        </section>

        <section className="section" id="sertifikat"><h2 className="reveal">Sertifikat.</h2><Certificates /></section>
        <section className="section" id="komentar"><h2 className="reveal">Tinggalkan Pesan.</h2><Comments /></section>

        <section className="section contact" id="kontak">
          <h2 className="reveal">Terbuka untuk Belajar, Berkolaborasi, dan Berkarya.</h2>
          <div className="links reveal">
            <a href={contact.email}>Email</a><a href={contact.wa} target="_blank" rel="noopener">WhatsApp</a>
            <a href={contact.github} target="_blank" rel="noopener">GitHub</a><a href={contact.ig} target="_blank" rel="noopener">Instagram</a>
          </div>
        </section>
      </main>
      <footer>© 2026 Ach. Nurul Mukhlishin. Dibuat dengan semangat belajar dan berkarya.</footer>
    </>
  )
}
