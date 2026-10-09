(function () {
  'use strict';

  const { createApp } = Vue;
  const { createRouter, createWebHashHistory, RouterLink, RouterView } = VueRouter;
  const config = window.TARA_CONFIG;

  const navItems = [
    { to: '/', label: '首頁' },
    { to: '/about', label: '認識佛堂' },
    { to: '/offerings', label: '結緣品' },
    { to: '/activities', label: '法會活動' },
    { to: '/visit', label: '交通聯絡' },
  ];

  const SiteHeader = {
    components: { RouterLink },
    data: () => ({ config, navItems }),
    template: `
      <header class="site-header">
        <RouterLink class="brand" to="/" aria-label="達拉 TARA 首頁">
          <img src="./images/tara-logo.png" alt="TARA 標誌">
          <span>達拉 <strong>TARA</strong></span>
        </RouterLink>
        <nav class="main-nav" aria-label="主要導覽">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" exact-active-class="is-active">{{ item.label }}</RouterLink>
        </nav>
        <a class="header-contact" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問 <span aria-hidden="true">↗</span></a>
      </header>
    `,
  };

  const SiteFooter = {
    data: () => ({ config }),
    template: `
      <footer class="site-footer">
        <div class="footer-brand">
          <img src="./images/tara-logo.png" alt="">
          <div><strong>{{ config.siteName }}</strong><span>佛堂介紹與結緣資訊</span></div>
        </div>
        <nav class="footer-socials" aria-label="官方社群">
          <a :href="config.links.facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE</a>
          <a :href="config.links.instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
        <span class="footer-note">網站內容由佛堂提供</span>
      </footer>
    `,
  };

  const HomePage = {
    data: () => ({ config }),
    template: `
      <div>
        <section class="hero">
          <img class="hero-image" src="./images/guanyin-detail.jpg" alt="佛堂主尊觀世音菩薩">
          <div class="hero-shade"></div>
          <div class="hero-content">
            <span class="eyebrow light-eyebrow">達拉 TARA</span>
            <h1>歡迎來到<br>達拉 TARA</h1>
            <p>認識佛堂、瀏覽結緣品，或查詢近期法會活動與參訪方式。</p>
            <div class="hero-actions">
              <RouterLink class="button button-gold" to="/about">認識佛堂 <span aria-hidden="true">↗</span></RouterLink>
              <a class="button button-ghost" :href="config.links.facebook" target="_blank" rel="noopener noreferrer">查看 Facebook 活動</a>
            </div>
          </div>
          <div class="hero-caption"><span>主尊觀世音菩薩</span><span>達拉 TARA</span></div>
        </section>

        <section class="welcome section-wrap">
          <div class="welcome-mark" aria-hidden="true">T</div>
          <div class="welcome-copy">
            <span class="eyebrow">認識我們</span>
            <h2>一處可以慢慢認識的佛堂</h2>
            <p>佛堂沿革、理念與參訪資訊，將依佛堂提供的資料整理刊載。</p>
            <RouterLink class="text-link" to="/about">閱讀佛堂介紹 <span aria-hidden="true">→</span></RouterLink>
          </div>
          <figure class="welcome-photo">
            <img src="./images/guanyin-shrine.jpg" alt="佛堂供奉的主尊觀世音菩薩">
            <figcaption>佛堂主尊觀世音菩薩</figcaption>
          </figure>
        </section>

        <section class="offerings-band">
          <div class="section-wrap offerings-band-inner">
            <div>
              <span class="eyebrow">結緣品</span>
              <h2>與佛堂結一份善緣</h2>
              <p>結緣品項目與介紹將依佛堂提供的資料整理刊載。</p>
              <RouterLink class="button button-blue" to="/offerings">瀏覽結緣品 <span aria-hidden="true">→</span></RouterLink>
            </div>
            <div class="lotus-ornament" aria-hidden="true">✺</div>
          </div>
        </section>

        <section class="activity-preview section-wrap">
          <div class="activity-copy">
            <span class="eyebrow">每週日下午</span>
            <h2>法會活動</h2>
            <p>每週日下午有不同的法會活動，請至 Facebook 官方粉專查看近期公告。</p>
            <a class="button button-blue" :href="config.links.facebook" target="_blank" rel="noopener noreferrer">前往 Facebook 查看活動 <span aria-hidden="true">↗</span></a>
          </div>
          <div class="activity-art" aria-hidden="true"><span class="activity-sun"></span><span class="activity-orbit orbit-one"></span><span class="activity-orbit orbit-two"></span><span class="activity-letter">TARA</span></div>
        </section>

        <section class="home-visit">
          <div class="section-wrap visit-strip">
            <div>
              <span class="eyebrow">交通與聯絡</span>
              <h2>歡迎先透過 LINE 詢問</h2>
              <p>{{ config.address }}</p>
            </div>
            <div class="visit-actions">
              <RouterLink class="button button-blue" to="/visit">查看交通資訊</RouterLink>
              <a class="text-link" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問參訪方式 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </div>
    `,
  };

  const AboutPage = {
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">ABOUT TARA</span><h1>認識達拉 TARA</h1><p>佛堂沿革、理念與主尊介紹，將依佛堂提供的資料整理刊載。</p></section>
        <section class="about-feature section-wrap">
          <figure class="about-image"><img src="./images/guanyin-shrine.jpg" alt="佛堂主尊觀世音菩薩"><figcaption>佛堂主尊觀世音菩薩</figcaption></figure>
          <div class="about-note"><span class="eyebrow">佛堂介紹</span><h2>關於達拉 TARA</h2><p>佛堂沿革、理念與平日活動，將依佛堂提供的資料整理刊載。</p><div class="content-note"><span aria-hidden="true">✦</span> 沿革與理念資料待補</div></div>
        </section>
        <section class="about-banner">
          <div class="section-wrap about-banner-inner"><div><span class="eyebrow">壇城主尊</span><h2>觀音度母三尊</h2><p>主尊為觀世音菩薩，左右兩側分別為綠度母與白度母。</p></div><img src="./images/guanyin-detail.jpg" alt="觀世音菩薩聖像細節"></div>
        </section>
      </div>
    `,
  };

  const OfferingsPage = {
    data: () => ({ config }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">OFFERINGS</span><h1>結緣品</h1><p>結緣品名稱、照片與請供方式，會依佛堂提供的資料整理刊載。</p></section>
        <section class="section-wrap offerings-empty"><div class="empty-symbol" aria-hidden="true">✺</div><span class="eyebrow">敬請期待</span><h2>結緣品資料整理中</h2><p>想先詢問結緣品，歡迎透過官方 LINE 聯絡佛堂。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">前往 LINE 詢問 <span aria-hidden="true">↗</span></a></section>
        <section class="offering-footnote section-wrap"><p>網站不提供線上付款或表單；實際請供方式請洽官方 LINE。</p></section>
      </div>
    `,
  };

  const ActivitiesPage = {
    data: () => ({ config }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">WEEKLY ACTIVITIES</span><h1>法會活動</h1><p>每週日下午有不同的法會活動。最新場次與活動內容，請以 Facebook 官方粉專公告為準。</p></section>
        <section class="section-wrap activity-card"><div class="activity-card-art" aria-hidden="true"><span>週日</span><b>∞</b></div><div class="activity-card-copy"><span class="eyebrow">每週日下午</span><h2>近期法會活動</h2><p>活動內容每週不同，請前往 Facebook 官方粉專查看公告。</p><a class="button button-blue" :href="config.links.facebook" target="_blank" rel="noopener noreferrer">前往 Facebook 官方粉專 <span aria-hidden="true">↗</span></a></div></section>
        <p class="section-wrap activity-note">前往 Facebook 查看最新活動資訊；網站不會自動同步 Facebook 活動。</p>
      </div>
    `,
  };

  const VisitPage = {
    data: () => ({ config }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">VISIT &amp; CONTACT</span><h1>交通與聯絡</h1><p>參訪前可先透過官方 LINE 詢問安排。</p></section>
        <section class="section-wrap visit-layout">
          <div class="visit-details"><span class="eyebrow">佛堂位置</span><h2>歡迎蒞臨</h2><address>{{ config.address }}</address><p>參訪安排與交通問題，歡迎先透過 LINE 詢問。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問參訪方式 <span aria-hidden="true">↗</span></a><a class="map-open-link" :href="config.links.map" target="_blank" rel="noopener noreferrer">在 Google 地圖開啟 <span aria-hidden="true">↗</span></a></div>
          <div class="map-frame"><iframe :src="config.mapEmbedUrl" title="達拉 TARA 位置地圖" width="600" height="450" style="border:0" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
        </section>
        <section class="section-wrap contact-section"><div class="contact-heading"><span class="eyebrow">OFFICIAL ACCOUNTS</span><h2>官方聯絡與社群</h2></div><nav class="social-links" aria-label="官方聯絡與社群"><a :href="config.links.line" target="_blank" rel="noopener noreferrer"><span>LINE</span> 詢問請供與參訪方式 <b aria-hidden="true">↗</b></a><a :href="config.links.facebook" target="_blank" rel="noopener noreferrer"><span>FB</span> Facebook 官方粉專 <b aria-hidden="true">↗</b></a><a :href="config.links.instagram" target="_blank" rel="noopener noreferrer"><span>IG</span> Instagram 官方帳號 <b aria-hidden="true">↗</b></a></nav></section>
      </div>
    `,
  };

  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: '/', component: HomePage },
      { path: '/about', component: AboutPage },
      { path: '/offerings', component: OfferingsPage },
      { path: '/activities', component: ActivitiesPage },
      { path: '/visit', component: VisitPage },
    ],
    scrollBehavior: () => ({ top: 0 }),
  });

  createApp({ components: { SiteHeader, SiteFooter, RouterView }, template: '<SiteHeader /><main><RouterView /></main><SiteFooter />' })
    .use(router)
    .mount('#app');
})();
