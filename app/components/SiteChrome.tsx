import type { ReactNode } from 'react';

const links = [
  { href: "/", label: "首頁" },
  { href: "/about", label: "認識佛堂" },
  { href: "/offerings", label: "結緣品" },
  { href: "/activities", label: "法會活動" },
  { href: "/visit", label: "交通聯絡" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="達拉 TARA 首頁">
        <img src="/images/tara-logo.png" alt="TARA 標誌" />
        <span>達拉 <strong>TARA</strong></span>
      </a>
      <nav className="main-nav" aria-label="主要導覽">
        {links.map((link) => (
          <a href={link.href} key={link.href}>{link.label}</a>
        ))}
      </nav>
      <a className="header-contact" href="https://lin.ee/mYrrZPB" target="_blank" rel="noreferrer">
        LINE 詢問
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/images/tara-logo.png" alt="" />
        <div><strong>達拉 TARA</strong><span>佛堂介紹與結緣資訊</span></div>
      </div>
      <div className="footer-socials" aria-label="官方社群">
        <a href="https://www.facebook.com/taiwan.tara/" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://lin.ee/mYrrZPB" target="_blank" rel="noreferrer">LINE</a>
        <a href="https://www.instagram.com/tara.office_/" target="_blank" rel="noreferrer">Instagram</a>
      </div>
      <span className="footer-note">網站內容由佛堂提供</span>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children ? <div className="intro-copy">{children}</div> : null}
    </section>
  );
}

export function SocialLinks() {
  return (
    <div className="social-links">
      <a href="https://lin.ee/mYrrZPB" target="_blank" rel="noreferrer"><span>LINE</span> 詢問請供與參訪方式 <b aria-hidden="true">↗</b></a>
      <a href="https://www.facebook.com/taiwan.tara/" target="_blank" rel="noreferrer"><span>FB</span> Facebook 官方粉專 <b aria-hidden="true">↗</b></a>
      <a href="https://www.instagram.com/tara.office_/" target="_blank" rel="noreferrer"><span>IG</span> Instagram 官方帳號 <b aria-hidden="true">↗</b></a>
    </div>
  );
}
