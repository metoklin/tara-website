import { PageFrame } from '../components/PageFrame';
import { PageIntro } from '../components/SiteChrome';

export const metadata = { title: '結緣品' };

export default function OfferingsPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="OFFERINGS" title="結緣品">
        <p>結緣品名稱、照片與請供方式，會依佛堂提供的資料整理刊載。</p>
      </PageIntro>
      <section className="section-wrap offerings-empty">
        <div className="empty-symbol" aria-hidden="true">✺</div>
        <span className="eyebrow">敬請期待</span>
        <h2>結緣品資料整理中</h2>
        <p>想先詢問結緣品，歡迎透過官方 LINE 聯絡佛堂。</p>
        <a className="button button-blue" href="https://lin.ee/mYrrZPB" target="_blank" rel="noreferrer">前往 LINE 詢問 <span aria-hidden="true">↗</span></a>
      </section>
      <section className="offering-footnote section-wrap">
        <p>網站不提供線上付款或表單；實際請供方式請洽官方 LINE。</p>
      </section>
    </PageFrame>
  );
}
