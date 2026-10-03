import { PageFrame } from './components/PageFrame';

const facebook = 'https://www.facebook.com/taiwan.tara/';
const line = 'https://lin.ee/mYrrZPB';

export default function Home() {
  return (
    <PageFrame>
      <section className="hero">
        <img className="hero-image" src="/images/guanyin-detail.jpg" alt="佛堂主尊觀世音菩薩" />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light-eyebrow">達拉 TARA</span>
          <h1>歡迎來到<br />達拉 TARA</h1>
          <p>認識佛堂、瀏覽結緣品，或查詢近期法會活動與參訪方式。</p>
          <div className="hero-actions">
            <a className="button button-gold" href="/about">認識佛堂 <span aria-hidden="true">↗</span></a>
            <a className="button button-ghost" href={facebook} target="_blank" rel="noreferrer">查看 Facebook 活動</a>
          </div>
        </div>
        <div className="hero-caption"><span>主尊觀世音菩薩</span><span>達拉 TARA</span></div>
      </section>

      <section className="welcome section-wrap">
        <div className="welcome-mark">T</div>
        <div className="welcome-copy">
          <span className="eyebrow">認識我們</span>
          <h2>一處可以慢慢認識的佛堂</h2>
          <p>佛堂沿革、理念與參訪資訊，將依佛堂提供的資料整理刊載。</p>
          <a className="text-link" href="/about">閱讀佛堂介紹 <span aria-hidden="true">→</span></a>
        </div>
        <figure className="welcome-photo">
          <img src="/images/guanyin-shrine.jpg" alt="佛堂供奉的主尊觀世音菩薩" />
          <figcaption>佛堂主尊觀世音菩薩</figcaption>
        </figure>
      </section>

      <section className="offerings-band">
        <div className="section-wrap offerings-band-inner">
          <div>
            <span className="eyebrow">結緣品</span>
            <h2>與佛堂結一份善緣</h2>
            <p>結緣品項目與介紹將依佛堂提供的資料整理刊載。</p>
            <a className="button button-blue" href="/offerings">瀏覽結緣品 <span aria-hidden="true">→</span></a>
          </div>
          <div className="lotus-ornament" aria-hidden="true">✺</div>
        </div>
      </section>

      <section className="activity-preview section-wrap">
        <div className="activity-copy">
          <span className="eyebrow">每週日下午</span>
          <h2>法會活動</h2>
          <p>每週日下午有不同的法會活動，請至 Facebook 官方粉專查看近期公告。</p>
          <a className="button button-blue" href={facebook} target="_blank" rel="noreferrer">前往 Facebook 查看活動 <span aria-hidden="true">↗</span></a>
        </div>
        <div className="activity-art" aria-hidden="true">
          <span className="activity-sun" />
          <span className="activity-orbit orbit-one" />
          <span className="activity-orbit orbit-two" />
          <span className="activity-letter">TARA</span>
        </div>
      </section>

      <section className="home-visit">
        <div className="section-wrap visit-strip">
          <div>
            <span className="eyebrow">交通與聯絡</span>
            <h2>歡迎先透過 LINE 詢問</h2>
            <p>臺北市大安區忠孝東路四段 177 號 8 樓之 2</p>
          </div>
          <div className="visit-actions">
            <a className="button button-blue" href="/visit">查看交通資訊</a>
            <a className="text-link" href={line} target="_blank" rel="noreferrer">LINE 詢問參訪方式 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
