import { PageFrame } from '../components/PageFrame';
import { PageIntro } from '../components/SiteChrome';

export const metadata = { title: '法會活動' };

export default function ActivitiesPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="WEEKLY ACTIVITIES" title="法會活動">
        <p>每週日下午有不同的法會活動。最新場次與活動內容，請以 Facebook 官方粉專公告為準。</p>
      </PageIntro>
      <section className="section-wrap activity-card">
        <div className="activity-card-art" aria-hidden="true"><span>週日</span><b>∞</b></div>
        <div className="activity-card-copy">
          <span className="eyebrow">每週日下午</span>
          <h2>近期法會活動</h2>
          <p>活動內容每週不同，請前往 Facebook 官方粉專查看公告。</p>
          <a className="button button-blue" href="https://www.facebook.com/taiwan.tara/" target="_blank" rel="noreferrer">前往 Facebook 官方粉專 <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <p className="section-wrap activity-note">前往 Facebook 查看最新活動資訊；網站不會自動同步 Facebook 活動。</p>
    </PageFrame>
  );
}
