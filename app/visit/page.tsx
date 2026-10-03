import { PageFrame } from '../components/PageFrame';
import { PageIntro, SocialLinks } from '../components/SiteChrome';

export const metadata = { title: '交通聯絡' };

const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16531.41711917665!2d121.5324078253886!3d25.050018181732355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc50d99581f%3A0xc67414b52fb981b4!2zVEFSQemBlOaLieW6puavjQ!5e1!3m2!1szh-TW!2stw!4v1791000398397!5m2!1szh-TW!2stw';

export default function VisitPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="VISIT & CONTACT" title="交通與聯絡">
        <p>參訪前可先透過官方 LINE 詢問安排。</p>
      </PageIntro>
      <section className="section-wrap visit-layout">
        <div className="visit-details">
          <span className="eyebrow">佛堂位置</span>
          <h2>歡迎蒞臨</h2>
          <address>臺北市大安區忠孝東路四段 177 號 8 樓之 2</address>
          <p>參訪安排與交通問題，歡迎先透過 LINE 詢問。</p>
          <a className="button button-blue" href="https://lin.ee/mYrrZPB" target="_blank" rel="noreferrer">LINE 詢問參訪方式 <span aria-hidden="true">↗</span></a>
          <a className="map-open-link" href="https://maps.app.goo.gl/2RxhpGGDo38GpTSc8" target="_blank" rel="noreferrer">在 Google 地圖開啟 <span aria-hidden="true">↗</span></a>
        </div>
        <div className="map-frame">
          <iframe
            src={mapEmbedUrl}
            title="達拉 TARA 位置地圖"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
      <section className="section-wrap contact-section">
        <div className="contact-heading"><span className="eyebrow">OFFICIAL ACCOUNTS</span><h2>官方聯絡與社群</h2></div>
        <SocialLinks />
      </section>
    </PageFrame>
  );
}
