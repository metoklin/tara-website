import { PageFrame } from '../components/PageFrame';
import { PageIntro } from '../components/SiteChrome';

export const metadata = { title: '認識佛堂' };

export default function AboutPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="ABOUT TARA" title="認識達拉 TARA">
        <p>佛堂沿革、理念與主尊介紹，將依佛堂提供的資料整理刊載。</p>
      </PageIntro>
      <section className="about-feature section-wrap">
        <figure className="about-image">
          <img src="/images/guanyin-shrine.jpg" alt="佛堂主尊觀世音菩薩" />
          <figcaption>佛堂主尊觀世音菩薩</figcaption>
        </figure>
        <div className="about-note">
          <span className="eyebrow">佛堂介紹</span>
          <h2>故事與願心，待你補上</h2>
          <p>這裡會介紹佛堂的成立背景、平日活動與想傳達給訪客的內容。你提供資料後，我會協助整理成清楚、易讀的文字。</p>
          <div className="content-note"><span aria-hidden="true">✦</span> 介紹內容待佛堂資料確認</div>
        </div>
      </section>
      <section className="about-banner">
        <div className="section-wrap about-banner-inner">
          <div>
            <span className="eyebrow">主尊</span>
            <h2>觀世音菩薩</h2>
            <p>主尊相關介紹將依佛堂提供的說明補充。</p>
          </div>
          <img src="/images/guanyin-detail.jpg" alt="觀世音菩薩聖像細節" />
        </div>
      </section>
    </PageFrame>
  );
}
