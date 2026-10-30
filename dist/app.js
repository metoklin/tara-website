(function () {
  'use strict';

  const { createApp } = Vue;
  const { createRouter, createWebHashHistory, RouterLink, RouterView } = VueRouter;
  const config = window.TARA_CONFIG;

  const navItems = [
    { to: '/', label: '首頁', en: 'Home' },
    { to: '/about', label: '認識佛堂', en: 'About' },
    { to: '/offerings', label: '結緣品', en: 'Offerings' },
    { to: '/activities', label: '法會活動', en: 'Events' },
    { to: '/visit', label: '交通聯絡', en: 'Visit' },
  ];

  const offeringCoverSlides = [
    { image: './images/ghau-banner.png', title: '心想事成嘎屋' },
    { image: './images/protective-banner.png', title: '護身法寶' },
    { image: './images/offering-mug-home-cover.jpg', title: '達拉 TARA 杯' },
  ];

  const SiteHeader = {
    components: { RouterLink },
    data: () => ({ config, navItems, mobileNavOpen: false }),
    template: `
      <header class="site-header">
        <button class="mobile-nav-toggle" type="button" :aria-expanded="mobileNavOpen" aria-controls="site-main-nav" :aria-label="mobileNavOpen ? '關閉導覽選單' : '開啟導覽選單'" @click="mobileNavOpen = !mobileNavOpen">
          <span></span><span></span><span></span>
        </button>
        <RouterLink class="brand" to="/" aria-label="TARA達拉 首頁">
          <img src="./images/tara-logo.png" alt="TARA 標誌">
          <span><strong>TARA</strong>達拉</span>
        </RouterLink>
        <nav id="site-main-nav" class="main-nav" :class="{ 'is-open': mobileNavOpen }" aria-label="主要導覽">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" exact-active-class="is-active" @click="mobileNavOpen = false"><span class="main-nav-zh">{{ item.label }}</span><span class="main-nav-en">{{ item.en }}</span></RouterLink>
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
          <div><strong>{{ config.siteName }}</strong><span>{{ config.address }}</span></div>
        </div>
        <nav class="footer-socials" aria-label="官方社群">
          <a :href="config.links.facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4z"/></svg></a>
          <a :href="config.links.line" target="_blank" rel="noopener noreferrer" aria-label="LINE"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.7 3 2.5 6.4 2.5 10.6c0 3.7 3.3 6.7 7.8 7.4.3.1.7.2.8.5.1.2 0 .6 0 .8l-.1.8c0 .2-.2.8.7.4s5.1-3 7-5.2c1.3-1.4 2.3-3.1 2.3-4.7C21 6.4 17.1 3 12 3z"/><path class="social-icon-cutout" d="M7.2 9h1v3.4h-1zm2.1 0h1l1.5 2v-2h1v3.4h-.9l-1.6-2.1v2.1h-1zm4.4 0h2.8v.9h-1.8v.4h1.6v.8h-1.6v.5h1.8v.8h-2.8z"/></svg></a>
          <a :href="config.links.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.7" cy="6.7" r="1.2"/></svg></a>
          <a :href="config.links.youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path class="social-icon-cutout" d="m10 9 5 3-5 3z"/></svg></a>
        </nav>
        <span class="footer-note">© 2026 達拉 TARA. All rights reserved.</span>
      </footer>
    `,
  };

  const HomePage = {
    data: () => ({ config, offeringCoverSlides, activeOfferingCover: 0, offeringCoverTimer: null, showConsultationNotice: false }),
    mounted() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.offeringCoverTimer = window.setInterval(() => this.moveOfferingCover(1), 4800);
    },
    beforeUnmount() {
      window.clearInterval(this.offeringCoverTimer);
    },
    methods: {
      moveOfferingCover(amount) {
        const count = this.offeringCoverSlides.length;
        this.activeOfferingCover = (this.activeOfferingCover + amount + count) % count;
      },
    },
    template: `
      <div>
        <section class="hero">
          <img class="hero-image" src="./images/guanyin-detail.jpg" alt="佛堂主尊觀世音菩薩">
          <div class="hero-shade"></div>
          <div class="hero-content">
            <span class="eyebrow light-eyebrow">達拉 TARA</span>
            <h1><span>WELCOME</span><span>TO</span><span>TARA</span></h1>
          </div>
          <div class="hero-caption"><span>主尊觀世音菩薩</span><span>達拉 TARA</span></div>
        </section>

        <section class="welcome section-wrap">
          <div class="welcome-copy">
            <span class="eyebrow">認識佛堂</span>
            <h2>一處可以慢慢認識的佛堂</h2>
            <p>佛堂沿革、理念與參訪資訊，將依佛堂提供的資料整理刊載。</p>
            <RouterLink class="button button-outline" to="/about">閱讀佛堂介紹 <span aria-hidden="true">→</span></RouterLink>
          </div>
          <figure class="welcome-photo">
            <img src="./images/guanyin-shrine.jpg" alt="佛堂供奉的主尊觀世音菩薩">
            <figcaption>佛堂主尊觀世音菩薩</figcaption>
          </figure>
        </section>

        <section class="home-teacher section-wrap">
          <div class="home-teacher-photo"><img src="./images/jiacha-rinpoche.jpg" alt="白玉祖古嘉察仁波切"></div>
          <div class="home-teacher-copy"><span class="eyebrow">VAJRAYANA MASTER</span><h2>尊貴上師</h2><p>白玉祖古嘉察徹滇多傑仁波切，白玉傳承第二任法座持有者貝瑪倫珠嘉措之轉世。</p><RouterLink class="button button-outline" to="/teachers/jiacha-rinpoche">認識上師 <span aria-hidden="true">→</span></RouterLink></div>
        </section>

        <section class="home-teacher home-teacher-reverse section-wrap">
          <div class="home-teacher-photo"><img src="./images/chen-min-teacher.jpg" alt="神諭度母陳敏老師"></div>
          <div class="home-teacher-copy"><span class="eyebrow">ORACLE TARA</span><h2>神諭度母</h2><p>陳敏老師成立達拉度母佛堂，帶領法會共修並定期安排心靈成長課程。</p><RouterLink class="button button-outline" to="/teachers/oracle-tara">認識神諭度母 <span aria-hidden="true">→</span></RouterLink></div>
        </section>

        <section class="offerings-band home-center-promo home-center-promo-with-photo home-center-promo-reverse">
          <div class="section-wrap offerings-band-inner">
            <div class="offerings-band-copy">
              <span class="eyebrow">DHARMA</span>
              <h2>法會活動</h2>
              <p>歡迎到達拉佛堂參與盛會</p>
              <RouterLink class="button button-blue" to="/activities">功德利益 <span aria-hidden="true">→</span></RouterLink>
            </div>
            <div class="offerings-band-gallery"><img class="home-center-promo-photo" src="./images/center-monks-2026.jpg" alt="上師與僧眾合影"></div>
          </div>
        </section>

        <svg class="center-logo-filter-defs" aria-hidden="true" focusable="false"><filter id="center-logo-blue" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.356863 0 0 0 0 0.568627 -1 -1 -1 0 2.9" /></filter></svg>
        <section class="home-centers">
          <div class="section-wrap"><div class="home-section-heading"><span class="eyebrow">TAIWAN CENTER</span><h2>北中南中心</h2></div>
            <div class="center-grid">
              <article class="center-card"><div class="center-logo-frame"><img class="center-logo" src="./images/center-taipei.jpg" alt="Taipei Center 標誌" loading="lazy" decoding="async"></div><h3><span>Taipei Center</span><span class="center-name-zh">台北中心</span></h3></article>
              <article class="center-card"><div class="center-logo-frame"><img class="center-logo" src="./images/center-taichung.jpg" alt="Taichung Center 標誌" loading="lazy" decoding="async"></div><h3><span>Taichung Center</span><span class="center-name-zh">台中中心</span></h3></article>
              <article class="center-card"><div class="center-logo-frame"><img class="center-logo" src="./images/center-kaohsiung.jpg" alt="Kaohsiung Center 標誌" loading="lazy" decoding="async"></div><h3><span>Kaohsiung Center</span><span class="center-name-zh">高雄中心</span></h3></article>
            </div>
          </div>
        </section>

        <section class="offerings-band home-center-promo home-center-promo-reverse">
          <div class="section-wrap offerings-band-inner">
            <div class="offerings-band-copy">
              <span class="eyebrow">DEAR TARA</span>
              <h2>神諭度母 滿願眾生</h2>
              <p>親身的經驗，乃是一切理由最終所歸依之處，因此也足以成為眾人信任之依據。</p>
              <RouterLink class="button button-blue" to="/testimonials">見證分享 <span aria-hidden="true">→</span></RouterLink>
            </div>
            <div class="offerings-band-gallery"><img class="home-center-promo-photo" src="./images/oracle-tara-blessing.jpg" alt="神諭度母與尼泊爾僧侶合影"></div>
          </div>
        </section>

        <section class="activity-preview section-wrap">
          <div class="activity-copy">
            <span class="eyebrow">心靈講座</span>
            <h2>佛化人生 <span class="activity-title-secondary">系列講座</span></h2>
            <p>佛堂每月一次安排佛化人生講座，參加請至官方 LINE 預先報名。</p>
            <a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">官方 LINE 預先報名 <span aria-hidden="true">↗</span></a>
          </div>
          <div class="activity-photo"><img src="./images/buddhist-life-lecture.jpg" alt="佛堂佛化人生系列講座共修情形"></div>
        </section>

        <section class="home-advertising section-wrap" aria-label="供養布施、朝聖、瑜伽頌缽與發心護持">
          <div class="home-ad-placeholder"><img src="./images/offering-donation.jpg" alt=""><span>供養布施</span></div>
          <div class="home-ad-placeholder"><img src="./images/pilgrimage.jpg" alt=""><span>朝聖</span></div>
          <div class="home-ad-placeholder"><img src="./images/yoga-singing-bowl.jpg" alt=""><span>瑜伽、頌缽、呼吸法</span></div>
          <div class="home-ad-placeholder"><img src="./images/home-support.jpg" alt="達拉度母佛堂發心護持"><span>發心護持</span></div>
        </section>

        <section class="offerings-band home-offerings">
          <div class="section-wrap offerings-band-inner">
            <div class="offerings-band-copy">
              <span class="eyebrow">結緣品</span>
              <h2>加持結緣品</h2>
              <p>達拉佛堂殊勝法寶與結緣品</p>
              <RouterLink class="button button-blue" to="/offerings">瀏覽結緣品 <span aria-hidden="true">→</span></RouterLink>
            </div>
            <div class="offerings-band-gallery" aria-label="結緣品總覽封面輪播">
              <RouterLink class="offerings-band-cover" :class="{ 'offerings-band-cover--mug': offeringCoverSlides[activeOfferingCover].image === './images/offering-mug-home-cover.jpg' }" to="/offerings" :aria-label="'瀏覽結緣品：' + offeringCoverSlides[activeOfferingCover].title">
                <img :key="offeringCoverSlides[activeOfferingCover].image" :src="offeringCoverSlides[activeOfferingCover].image" :alt="offeringCoverSlides[activeOfferingCover].title" loading="lazy">
              </RouterLink>
            </div>
          </div>
        </section>

        <section class="home-visit">
          <div class="section-wrap visit-strip">
            <div>
              <h2>神諭度母諮詢問事</h2>
            </div>
            <div class="visit-actions">
              <button class="button button-blue" type="button" @click="showConsultationNotice = true">諮詢者須知注意事項</button>
            </div>
          </div>
        </section>

        <div v-if="showConsultationNotice" class="consultation-modal-backdrop" @click.self="showConsultationNotice = false">
          <section class="consultation-modal" role="dialog" aria-modal="true" aria-labelledby="consultation-modal-title">
            <div class="consultation-modal-content">
              <span class="eyebrow">CONSULTATION NOTICE</span>
              <h2 id="consultation-modal-title">🌺 神諭度母諮詢問事 🌺</h2>
              <h3>諮詢者須知注意事項</h3>
              <ol class="consultation-notice-list">
                <li>請先加入官方 LINE。諮詢者需透過官方報名，並由介紹人引薦或中心弟子協助安排；後續將透過此窗口聯絡，確認諮詢時段。</li>
                <li>請事先提供個人基本資料：姓名、出生年月日。</li>
                <li>如曾更改姓名，請事先註明，並以「出生本名」為主。</li>
                <li>每年流年諮詢時間為 30 分鐘。</li>
                <li>問事諮詢以一次詢問一個問題為主，時間 20 分鐘。</li>
                <li>如詢問感情，已有對象者請先提供對方資料與相片。</li>
                <li>如無法依預約時間前來，請務必於三天前聯絡改約，以免影響諮詢安排。</li>
              </ol>
              <h3>現場報到注意事項</h3>
              <ol class="consultation-notice-list">
                <li>請準時到現場報到，請勿遲到。</li>
                <li>請至櫃台報到、填寫基本資料，並掃描官方 QR Code。</li>
                <li>諮詢供養金請放入紅包袋，寫上姓名、日期及問事項目後交給櫃台。</li>
                <li>請等候志工助理帶領。</li>
              </ol>
              <div class="consultation-modal-actions">
                <button class="button button-quiet" type="button" @click="showConsultationNotice = false">關閉視窗</button>
                <a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">我已詳閱注意事項，欲前往報名 <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </section>
        </div>
      </div>
    `,
  };

  const AboutPage = {
    data: () => ({ expandedTara: null }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">ABOUT TARA</span><h1>認識達拉 TARA</h1><p>走進達拉度母佛堂，認識佛堂理念、圖騰、壇城與諸尊。</p></section>

        <section class="about-origin section-wrap">
          <div class="about-section-heading"><span class="eyebrow">ABOUT TARA</span><h2>關於達拉 TARA</h2></div>
          <div class="about-origin-copy">
            <p>達拉為梵語 Tara 的譯音，意為「度母」。達拉是觀世音菩薩悲心的化現；取度母能滿足眾生一切願求之意，祈願眾生「心想事成、所求滿願」。</p>
            <p>達拉度母佛堂是充滿殊勝法寶與聖物、諸佛菩薩加持的聖地。佛堂內各項安置皆依上師指示而設計，依照五行木、火、土、金、水相生的原理，並按東、南、西、北、中不同方位規劃；四周以白、黃、紅、藍、綠五種鮮明色彩區隔，各代表不同意義。</p>
          </div>
          <div class="temple-symbol-grid">
            <figure class="temple-photo-reserved"><img src="./images/eight-auspicious-totems.png" alt="佛堂門上的八吉祥圖騰與護輪"><figcaption>門口及佛堂內皆以「八吉祥圖騰」佈置</figcaption></figure>
            <article class="temple-symbol-note"><span class="eyebrow">八吉祥圖騰</span><p>八吉祥象徵宇宙所有奇珍異寶之總聚，以此供養三寶、累積自身資糧；也代表佛身所擁有的吉祥徵兆，以及佛的一切功德事業。</p></article>
            <article class="temple-symbol-note"><span class="eyebrow">密咒護輪</span><p>門前印有代表平安、健康、人緣等不同意義的密咒護輪，使進入者得到防護及回遮，祈願運氣不斷增長。</p></article>
            <article class="temple-symbol-note temple-symbol-note-human"><span class="eyebrow">人形圖</span><p>門上的人形圖安座於蓮花，並有多種五妙欲摩尼寶等供養，代表可得如同天人般的福報。四周環繞金剛結圖騰，祈願有緣進入者去除障礙、得到一切保護力。</p></article>
          </div>
        </section>

        <section class="tara-symbol-section">
          <div class="section-wrap tara-symbol-inner">
            <div class="tara-symbol-heading"><span class="eyebrow">TARA MANDALA</span><h2>達拉 TARA 圖騰</h2><p>代表諸佛菩薩的息、增、懷、誅、圓滿壇城。</p></div>
            <div class="tara-logo-feature"><img src="./images/tara-logo.png" alt="達拉 TARA 五色圖騰標誌"><p>這呈現出佛國淨土（無量宮殿）。佛菩薩的滿願壇城具足一切佛的加持力，賜予眾生祝福的吉祥能量。只要進入佛堂，就能輕易累積福德資糧、福運不斷增長。</p></div>
            <div class="tara-elements-grid">
              <article class="tara-element-card"><img src="./images/tara-logo-element-white.png" alt="白色息災圖騰"><h3>息災・白</h3><p>平息業障、消除災厄</p><p>平安健康</p></article>
              <article class="tara-element-card"><img src="./images/tara-logo-element-yellow.png" alt="黃色增益圖騰"><h3>增益・黃</h3><p>增長智慧、福報、財富</p><p>財運事業</p></article>
              <article class="tara-element-card"><img src="./images/tara-logo-element-red.png" alt="紅色懷愛圖騰"><h3>懷愛・紅</h3><p>善緣具足、人緣桃花</p><p>桃花姻緣</p></article>
              <article class="tara-element-card"><img src="./images/tara-logo-element-blue.png" alt="藍色誅除圖騰"><h3>誅除・藍</h3><p>斷除種種違緣障礙</p><p>除障淨化</p></article>
              <article class="tara-element-card"><img src="./images/tara-logo-element-green.png" alt="綠色圓滿圖騰"><h3>圓滿・綠</h3><p>心想事成、所求滿願</p><p>智慧圓滿</p></article>
            </div>
          </div>
        </section>

        <section class="altar-deities section-wrap">
          <div class="about-section-heading"><span class="eyebrow">SACRED DEITIES</span><h2>壇城主尊</h2><p>主壇城供奉「觀音度母三尊」：主尊為觀世音菩薩，左右兩側分別是綠度母與白度母。</p></div>
          <figure class="altar-shrine-photo"><img src="./images/guanyin-shrine.jpg" alt="佛堂主壇城供奉的觀世音菩薩"><figcaption>佛堂主尊觀世音菩薩</figcaption></figure>
          <div class="deity-copy-grid deity-overview-grid">
            <article class="deity-copy-card deity-overview-card">
              <section><h3>觀世音菩薩</h3><p>眾生悲母觀世音菩薩以其大慈悲之願力，千處祈求千處應，化現為各式各樣之化身，於六道中救護一切眾生，感應道交，利樂眾生之行，不勝枚舉，與娑婆世界的眾生特別有緣，經常示現不同相貌，顯現神蹟救度眾生，因此廣為受人禮敬供奉。</p><p>六字箴言「嗡嘛呢唄美吽」能度六道眾生，能淨化滅除惡業障礙，脫離輪迴之苦，能成大菩提，能救苦救難，能利益一切有情。</p><p>只要誠心祈請觀音菩薩賜予加持，能化解地、水、火、風、空等種種災難，凡事逢凶化吉、遇難呈祥，令所求事事如意，一切圓滿具足。</p></section>
              <section><h3>度母</h3><p>度母是觀世音菩薩因悲憫眾生而流下眼淚的化現：左眼淚珠變化成白度母，右眼淚珠化現為綠度母。以女性菩薩像度化眾生，是「除障」與「滿願」最有力的本尊。共化現二十一尊度母，各代表不同功德利益，以輔助觀世音菩薩慈悲救渡一切苦難的眾生。</p><p>「度」表示救拔、度脫、度化眾生，迅速威猛有力，加持力廣大不可思議。虔心祈請度母加持，有如滿願寶，諸事順遂、求子得子、得福報子息增長。</p>
                <div class="tara-circle-accordion" aria-label="綠度母與白度母介紹"><div class="tara-circle-choices"><button class="tara-circle-choice" type="button" :aria-expanded="expandedTara === 'green'" aria-controls="green-tara-panel" @click="expandedTara = expandedTara === 'green' ? null : 'green'"><span class="tara-circle-image"><img src="./images/green-tara-circle.jpg" alt="綠度母唐卡"></span><span class="tara-circle-label">綠度母</span><span class="tara-circle-indicator" aria-hidden="true">{{ expandedTara === 'green' ? '−' : '+' }}</span></button><button class="tara-circle-choice" type="button" :aria-expanded="expandedTara === 'white'" aria-controls="white-tara-panel" @click="expandedTara = expandedTara === 'white' ? null : 'white'"><span class="tara-circle-image"><img src="./images/white-tara-circle.jpg" alt="白度母唐卡"></span><span class="tara-circle-label">白度母</span><span class="tara-circle-indicator" aria-hidden="true">{{ expandedTara === 'white' ? '−' : '+' }}</span></button></div><Transition name="tara-expand"><article v-if="expandedTara === 'green'" id="green-tara-panel" class="tara-info-panel"><h3>綠度母</h3><p>綠度母是集諸佛菩薩一切事業之功德本尊，亦為二十一度母之首。虔心祈請度母加持有如滿願寶，能滿足一切事業的圓滿，感情婚姻如意，求子嗣得子嗣、得財富權勢，凡有所求皆得如願成就。</p></article></Transition><Transition name="tara-expand"><article v-if="expandedTara === 'white'" id="white-tara-panel" class="tara-info-panel"><h3>白度母</h3><p>白度母身潔白，面有三眼，雙手雙腳心各有一眼，也稱為「七眼度母」。主要能消除病苦災劫，增長壽命及福慧，免除一切魔障、瘟疫病厄，得一切平安、善緣具足、所求滿願。</p></article></Transition></div>
              </section>
            </article>
          </div>
        </section>

        <section class="prayer-mandala-section">
          <div class="section-wrap prayer-mandala-inner">
            <div class="about-section-heading"><span class="eyebrow">PRAYER &amp; BLESSING</span><h2>祈福滿願壇城</h2><p class="prayer-mandala-motto">吉祥・福運・滿願</p></div>
            <div class="prayer-mandala-gallery"><figure class="prayer-mandala-main-photo"><img src="./images/prayer-fulfillment-mandala.jpg" alt="祈福滿願壇城主壇城"></figure><figure class="prayer-mandala-supporting-photo"><img src="./images/prayer-altar-setup.jpg" alt="主壇城佈置照片"></figure></div>
            <div class="prayer-mandala-info">
              <section><h3>主壇城</h3><p>壇城內供奉度母、蓮花生大士及所有本尊、空行、護法、總集朵瑪、十二生肖神獸守護菩薩與九宮八卦咒牌，以祈願化解因風水而起的沖煞、歲煞，轉為吉祥能量，並得諸佛菩薩守護。</p><p>壇城內安置由尊貴上師親自裝臟、修法加持圓滿的殊勝珍貴「吉祥福運滿願寶瓶」，與十方大德結緣，藉由寶瓶加持為大眾祈福，祈願消除眾生一切障礙。</p></section>
              <section><h3>內密壇城</h3><p>主要供奉黃財神本尊，秘壇城內安置可增長財運福報的「財神寶瓶」與許多殊勝加持物。</p><p>特別恭請嘉察仁波切裝臟、修法、開光加持圓滿。恭敬禮拜財神，祈願諸眾財神護佑，具足世間與出世間一切資糧，令財富滿盈、受用自在、不虞匱乏。</p></section>
            </div>
            <section class="prayer-offerings"><div class="prayer-offering-heading"><span class="eyebrow">DEDICATION OFFERINGS</span><h3>祈福滿願壇城開放認供</h3><p>歡迎以祈願、供燈與護持壇城等方式，將善願迴向自身及一切有情。</p></div>
              <div class="prayer-offering-grid">
                <details class="prayer-offering-card"><summary><span class="prayer-offering-summary-copy"><h4>度母許願卡</h4><span class="prayer-offering-preview">可在祈願卡寫上所祈求願望（每張寫一個主要願望），並在壇城前誠心祈請，祈願諸佛菩薩眾、護法神尊加持庇佑，所求皆能如願，心想事成、諸事順遂。</span></span><span class="prayer-offering-details-toggle"><span>展開介紹</span><span class="prayer-offering-details-icon" aria-hidden="true">⌄</span></span></summary><div class="prayer-offering-detail"><p>可在祈願卡寫上所祈求願望（每張寫一個主要願望），並在壇城前誠心祈請，必得諸佛菩薩眾、護法神尊加持庇佑，所求皆能如願，心想事成、諸事順遂。</p></div></details>
                <details class="prayer-offering-card"><summary><span class="prayer-offering-summary-copy"><h4>各式佛菩薩點燈</h4><span class="prayer-offering-preview">點燈兼具出世間與世間利益：可得真智慧、遠離修行障礙、去除五毒惡業牽引；亦祈願身體健康、相貌莊嚴、眼睛明亮、眾人喜愛、心想如願、財富具足。另有十二生肖守護菩薩點燈。</span></span><span class="prayer-offering-details-toggle"><span>展開介紹</span><span class="prayer-offering-details-icon" aria-hidden="true">⌄</span></span></summary><div class="prayer-offering-detail"><p>點燈的利益有兩種：</p><h5>出世間利益</h5><p>可得真智慧，遠離修行上的障礙，去除五毒惡業的牽引，斷除輪迴。</p><h5>世間福報</h5><p>身體健康、相貌莊嚴、眼睛明亮、眾人喜愛、不受人欺、心想如願、財富具足。如阿那律尊者「天眼第一」，乃因供燈植福而獲得。</p><div class="prayer-offering-subsection"><h5>十二生肖守護菩薩點燈｜菩薩由來</h5><p>很久以前，世間有這樣一個傳說：一個人出生時，西方極樂世界就有一位佛、菩薩迎送，並看著這孩子慢慢長大。此後孩子要獨自面對人間的誘惑和選擇，身上的佛性也越變越淡。只有極少數孩子因累積了幾世輪迴的善果、佛緣較深，才能繼續得到佛菩薩庇佑。後來經菩薩點化，人們把自己出生那一年的本尊佛菩薩雕刻在飾物上隨身佩戴，以增進自身修為，得到本尊菩薩保佑、庇護，實現發財、保健康等願望。</p></div></div></details>
                <details class="prayer-offering-card"><summary><span class="prayer-offering-summary-copy"><h4>各式吉祥滿願寶瓶</h4><span class="prayer-offering-preview">壇城開放認供度母寶瓶（事業滿願）、財神寶瓶（福報財富）、咕嚕咕咧寶瓶（人緣桃花）及吉祥福運寶瓶（平安運氣，適合本年沖太歲者）。吉祥福運滿願寶瓶由尊貴的穆松古千法王親自裝臟、開光。</span></span><span class="prayer-offering-details-toggle"><span>展開介紹</span><span class="prayer-offering-details-icon" aria-hidden="true">⌄</span></span></summary><div class="prayer-offering-detail"><ul><li>度母寶瓶：事業滿願</li><li>財神寶瓶：福報財富</li><li>咕嚕咕咧寶瓶：人緣桃花</li><li>吉祥福運寶瓶：平安運氣，適合本年沖太歲者</li></ul><h5>吉祥福運滿願寶瓶</h5><p>特別恭請尊貴的穆松古千法王親自裝臟、開光。裝臟物主要為法王親自從印度攜帶來臺之印度白玉南卓林寺總集甘露，以及南卻天法傳承祖師——持明珠多傑金剛法座所在聖地西康穆松寺吉祥總集甘露，精心製作，與十方大德結緣。</p><p>藉由寶瓶無上的加持，為大家祈福、消除眾生一切障礙；並願以修持寶瓶的成就與得此殊勝寶瓶的功德，幫助眾生除逆緣、脫貧苦、財富豐盈、權力威望增長、得眾人仰慕及敬愛。行者若能虔心供養，即能集聚天、人、眾生，享受其惠施衣財富，運勢轉佳、善緣早熟。因此，吉祥福運滿願寶瓶亦是平安與財富最強之殊勝不共護法。</p></div></details>
                <details class="prayer-offering-card"><summary><span class="prayer-offering-summary-copy"><h4>年度認供</h4><span class="prayer-offering-preview">年度認供依當年度壇城與法會規劃開放，邀請大眾隨喜護持、祈福迴向。認供項目與參與方式將依年度公告更新。</span></span><span class="prayer-offering-details-toggle"><span>展開介紹</span><span class="prayer-offering-details-icon" aria-hidden="true">⌄</span></span></summary><div class="prayer-offering-detail"><p>年度認供依當年度壇城與法會規劃開放，邀請大眾隨喜護持、祈福迴向。認供項目與參與方式將依年度公告更新。</p></div></details>
              </div>
            </section>
            <div class="about-closing-notes"><p>只要具虔誠信心、衷心祈請，必得諸佛菩薩眾、護法神尊加持庇佑。不論祈求事業、財運、感情、桃花、人緣等，皆能所求如意、滿願順遂。達拉並有多種殊勝法寶結緣品，每樣結緣品皆經由尊貴上師如理如法裝臟、開光、灑淨加持圓滿，且定期恭請上師不斷修法加持，其殊勝力不可思議。</p></div>
          </div>
        </section>
      </div>
    `,
  };

  const TeacherDetailPage = {
    props: ['slug'],
    data: () => ({
      activeBioTab: 'zh',
      profiles: {
        'jiacha-rinpoche': {
          eyebrow: 'VAJRAYANA MASTER', title: '尊貴上師', name: '白玉祖古嘉察仁波切', names: { zh: '白玉祖古嘉察仁波切', en: 'Palyul Tulku Gyaltsab Rinpoche', bo: 'དཔལ་ཡུལ་སྤྲུལ་སྐུ་རྒྱལ་ཚབ་རིན་པོ་ཆེ' }, lineage: '白玉傳承', image: './images/jiacha-rinpoche.jpg', alt: '白玉祖古嘉察仁波切照片',
          translations: {
            zh: [
              { heading: '', paragraphs: [
                '尊貴的祖古嘉察徹滇多傑仁波切，誕生於源自光明天界、清淨無垢之昆氏血脈，承襲瓦述土司世系之巴納阿涅家族。',
                '前譯寧瑪派教傳、伏藏教法、白玉傳承——尊貴的依怙主圖松法王，認定嘉察仁波切乃蓮花生大士二十五位親傳弟子之「索波拉巴」之殊勝化身，亦即白玉傳承第二任法座持有者貝瑪倫珠嘉措之轉世，並無誤認定仁波切為白玉尊貴的嘉察袞松法王之心意化現。圖松法王予以正式認證，同時祈願仁波切弘法利生的一切廣大事業，皆能任運、無礙而圓滿成就。',
                '白玉嘉察袞松法王為白玉寺的代表、攝政國師和白玉縣長，無論是世間或出世間都擔任要職。曾依止成就自在巴千都巴與堪布阿給旺波等大德為師，諸位上師皆極為重視，並傳授龍欽寧體教法，為弘揚龍欽寧體教法成辦眾多殊勝事業。',
                '南卓林寺住持尊貴的穆桑古千法王，亦賜予三線班智達帽、手鼓、金剛鈴杵，以及身、語、意三所依等聖物，為嘉察仁波切作吉祥祝福。',
                '前譯寧瑪派第七任掌教——尊貴的噶陀格澤法王，亦向仁波切敬獻吉祥哈達，並親自撰寫長壽祈請文，祈願仁波切長久住世、佛行事業廣大增盛。',
              ] },
              { heading: '殊勝家世與傳承', paragraphs: [
                '嘉察仁波切所屬之昆氏家族，根據史籍的記載，昆氏意為「天人的種姓」，是從光明天界（色界的極光淨天）而來。世代相傳，自古迄今不斷出現國王、大臣，以及眾多聲名遠播之大德、學者與成就者，法脈傳承從未間斷，因此被視為猶如西藏吉祥福澤之所在一般的尊貴血脈。',
                '瓦述土司，是西藏康區歷史悠久的藏族地方領袖家族，世代承襲地方領導地位，並與當地藏傳佛教及寺院發展有密切關係。',
                '而阿涅家族是一個擁有悠久歷史的重要家族，自古以來一直擔任西藏貢覺地區巴納部落的領袖與寺院之長老，同時也擔任白玉寺之攝政，對於白玉寺及藏傳佛教的發展與弘揚都具有重要地位。巴納阿涅家族的許多世代不僅是白玉寺的施主，與歷代的白玉結下了殊勝的師徒法緣，更是歷代貝諾法王以意攝持的施主與弟子。對於弘揚龍欽寧體教法有相當大的貢獻。',
              ] },
              { heading: '入佛門與依止上師', paragraphs: [
                '嘉察仁波切從小接受佛法啟蒙，之後前往印度南卓林寺，研習佛法，並依止尊貴的貝諾法王為根本上師。',
                '仁波切於尊貴的貝諾法王及諸多具德上師座前，廣泛聽聞並領受寧瑪派教傳與伏藏法門的「灌頂、口傳、教授」三者，以及以大圓滿口訣為主的無量甚深教法。',
                '尊貴的貝諾法王長期對嘉察仁波切格外關愛、重視並親自攝受、悉心栽培。為了弘揚珍貴的佛陀教法，利益廣大眾生，貝諾法王更特別派遣嘉察仁波切前往臺灣弘揚佛法。',
              ] },
              { heading: '精進實修', paragraphs: [
                '依照閉關修持及相關儀軌典籍，嘉察仁波切前後多次進行閉關修持，以寧瑪派「三根本」為核心，對無量本尊與殊勝尊眾持續完成「數量閉關」與「時間閉關」，長期精進不懈。其念修與實修如河流相續綿延不斷，一心專注於殊勝正法精髓的實踐。',
                '此外，嘉察仁波切亦隨順不同弟子的根器、能力與意樂，善巧開展各類佛法事業；同時亦積極從事社會服務及慈善利生事業，致力於成辦能為有情眾生帶來利益之工作。',
                '其心心念念皆繫於眾生的利益，而這也是他行利他佛行事業時的唯一動力。',
                '願尊貴的嘉察仁波切法體安康、長久住世，弘法事業遍滿十方；願其一切利樂有情之宏願，無礙任運、悉皆圓滿。',
                '扎西德咧',
              ] },
            ],
            en: [
              { heading: '', paragraphs: [
                'Choktul Gyaltsab Tseten Dorjee Rinpoche was born into the Anye Pontsang family—a lineage originating from the pure Luminous Gods, the faultless Khon clan, and the Wal-shul chieftain lineage. He was recognized and enthroned as the unmistakable mind-emanation of the Palyul Gyaltsab, Kyabje Gonsung Rinpoche, who is renowned as the reincarnation of Pema Lhundrub Gyatso (the second throne-holder of the Eastern Palyul tradition) and an emanation of Sogpo Lhapal, one of Guru Rinpoche’s twenty-five primary disciples. This recognition was formally conferred by Kyabje Thubten Palzang Rinpoche—the great illuminator of the teachings of the Eastern Palyul tradition and the holder of the treasury of the Early Translation Kama and Terma teachings—along with prayers that his vast activities for the doctrine and sentient beings may be effortlessly and spontaneously fulfilled.',
                'The previous Palyul Gyaltsab Gonsung Rinpoche was a direct disciple of Drubwang Palchen Dupa and Khenchen Ngagi Wangpo, and performed numerous deeds beneficial to the teachings of the Heart Essence (Nyingthig). Auspicious enthronement blessings were bestowed upon the present Rinpoche by Kyabje Mugsang Kuchen Rinpoche, the head of Namling, who presented him with a Pandita hat featuring the three-fold binding (pan-zhwa thig-gsum), a ritual drum and bell (da-dril), and representations of body, speech, and mind. Furthermore, Kyabje Kathok Getse Rinpoche, the seventh supreme head of the Early Translation Nyingma tradition, offered auspicious scarves and prayers for his long life.',
                'From ancient times to the present day, the noble Khon lineage—to which Gyaltsab Rinpoche belongs—has continuously produced kings, ministers, and renowned scholars and Siddhas, and is widely recognized as a lineage that serves as a treasure-blessing for Tibet. In particular, regarding his paternal household and heritage: Since the nomadic Black-Tent (Sbra-nag) community has historically been a primary site and key assembly of disciples for propagating the Longchen Nyingthig teachings of Drubwang Palchen Dupa, Rinpoche himself personally served as leader and founded the dra-nag Monastery, Thegchen Samten Odsal Ling, as a sanctuary for practicing the Longchen Nyingthig tradition. Moreover, the Amyen family has continuously served as leaders of both the Dra-Nag community and monastery, as regents or representatives of Palyul Monastery, and as district administrators (Dzongpon), thus shouldering immense responsibilities in both spiritual and secular domains.',
                'Rinpoche joined the monastic at the age of nine. He studied the sacred Dharma at Namdroling Monastery, the great Early Translation Nyingma seat in South India, and relied upon Kyabje Drubwang Pema Norbu Rinpoche as his root guru. From Kyabje Drubwang Pema Norbu Rinpoche and numerous other sublime masters, he received countless profound teachings, including the empowerments, scriptural transmissions, and oral instructions of the Nyingma Kama and Terma traditions, as well as the cycle of teachings pertaining to the Dzogchen Instruction Class (Men-ngag-de). Kyabje Drubwang Pema Norbu Rinpoche always held him in exceptionally high regard and personally dispatched him to Taiwan with specific charges to spread and flourish the precious teachings of the Buddha.',
                'Following precisely the instructions laid down in the practice manuals for retreat and accomplishment (nyen-drub), he has repeatedly completed countless numerical and temporal retreats on the vast assemblies of yidams and supreme deities—primarily focusing on the Three Roots of the Nyingma tradition—flowing continuously like a river, and has dedicated himself single-mindedly to the practice of the heart-essence of the holy Dharma. Furthermore, Rinpoche has continuously performed—and continues to perform—numerous profoundly beneficial activities, including religious events tailored to the mental inclinations and capacities of his disciples, as well as essential social services and humanitarian efforts to benefit all living beings.',
              ] },
            ],
            bo: [
              { heading: '', paragraphs: [
  "མཆོག་སྤྲུལ་རྒྱལ་ཚབ་ཚེ་བརྟན་རྡོ་རྗེ་རིན་པོ་ཆེ་མཆོག་ནི་འོད་གསལ་ལྷ་ལས་བྱུང་བ་དྲི་མེད་འཁོན་གྱི་གདུང་བརྒྱུད་དབལ་ཤུལ་དཔོན་གྱི་རུས་བརྒྱུད་ཨ་མྱེས་དཔོན་ཚང་གི་ཁྱིམ་དུ་སྐུ་འཁྲུངས། སྔ་འགྱུར་བཀའ་གཏེར་བསྟན་པའི་མཛོད་འཛིན་ཤར་རྒྱལ་བ་དཔལ་ཡུལ་བའི་བསྟན་པའི་གསལ་བྱེད་ཆེན་མོ་༧སྐྱབས་རྗེ་ཐུབ་བསྟན་དཔལ་བཟང་རིན་པོ་ཆེ་མཆོག་ནས་གུ་རུ་རིན་པོ་ཆེའི་དངོས་སློབ་རྗེས་འབངས་ཉེར་ལྔའི་ནང་ཚན་སོག་པོ་ལྷ་དཔལ་གྱི་རྣམ་སྤྲུལ་ཤར་རྒྱལ་བ་དཔལ་ཡུལ་བའི་གདན་རབས་གཉིས་པ་པདྨ་ལྷུན་གྲུབ་རྒྱ་མཚོའི་སྐྱེ་རྒྱུད་དུ་གྲགས་པའི་དཔལ་ཡུལ་རྒྱལ་ཚབ་༧སྐྱབས་རྗེ་མགོན་སྲུང་གི་ཐུགས་ཀྱི་རྣམ་རོལ་འཁྲུལ་མེད་དུ་ངོས་འཛིན་མངའ་གསོལ་གནང་སྟེ་བསྟན་འགྲོའི་དོན་ཆེན་འབད་མེད་ལྷུན་འགྲུབ་ཡོང་བའི་སྨོན་འདུན་བསྩལ།",
  "དཔལ་ཡུལ་༧རྒྱལ་ཚབ་མགོན་སྲུང་ནི་གྲུབ་དབང་དཔལ་ཆེན་འདུས་པ་དང་མཁན་ཆེན་ངག་གི་དབང་པོའི་ཞལ་སློབ་ཏུ་གྱུར་ཅིང་སྙིང་ཐིག་བསྟན་པར་སྨན་པའི་མཛད་པ་དུ་མ་བསྐྱངས། རྣམ་གླིང་དབུ་འཛིན་༧སྐྱབས་རྗེ་རྨུགས་སངས་སྐུ་ཆེན་རིན་པོ་ཆེ་མཆོག་ནས་པཎ་ཞྭ་ཐིག་གསུམ་ཅན་དང་། ཌ་དྲིལ། སྐུ་གསུང་ཐུགས་རྟེན་བཅས་བསྩལ་བའི་སྒོ་ནས་རྟེན་འབྲེལ་མངའ་གསོལ་གནང་། སྔ་འགྱུར་རྙིང་མའི་དབུ་འཛིན་ཁྲི་རབས་བདུན་པ་༧སྐྱབས་རྗེ་ཀཿཐོག་དགེ་རྩེ་རིན་པོ་ཆེ་མཆོག་ནས་རྟེན་འབྲེལ་མཇལ་དར་དང་ཞབས་བརྟན་གསོལ་འདེབས་ཕུལ། རྒྱལ་ཚབ་རིན་པོ་ཆེ་ཁོང་གི་མི་རྒྱུད་འཁོན་གྱི་རིགས་དེ་ལས་གནའ་ནས་ད་བར་རྒྱལ་པོ། བློན་པོ། དེ་བཞིན་མཁས་གྲུབ་གྲགས་པ་ཅན་རྒྱུན་མ་ཆད་པར་བྱུང་བས་བོད་ཀྱི་གཡང་ལྟ་བུའི་མི་རྒྱུད་དུ་ངོས་འཛིན་གྱི་ཡོད། ལྷག་པར་དུ་རིན་པོ་ཆེ་ཁོང་གི་ཡབ་གཞིས་ཁྱིམ་བརྒྱུད་ལ་མཚོན་ན། སྤྱིར་སྦྲ་ནག་འབྲོག་སྡེ་ནི་གྲུབ་དབང་དཔལ་ཆེན་འདུས་པའི་ཀློང་ཆེན་སྙིང་ཐིག་གི་བསྟན་པ་སྤེལ་སའི་གནས་དང་གདུལ་བྱ་གལ་ཆེ་ཤོས་ཡིན་པས་རྗེ་རང་ཉིད་སྐུ་ངོ་མས་ལས་དཔོན་མཛད་དེ་ཀློང་ཆེན་སྙིང་ཐིག་གི་ཕྱག་བཞེས་ཉམས་སུ་ལེན་སའི་སྦྲ་ནག་དགོན་ཐེག་ཆེན་བསམ་གཏན་འོད་གསལ་གླིང་ཕྱག་བཏབ་པ་དང་། ཨ་མྱེས་ཚང་ནི་གནའ་ནས་ད་བར་སྦྲ་ནག་སྡེ་དགོན་གཉིས་ཀྱི་འགོ་འཛིན་དང་། དཔལ་ཡུལ་དགོན་གྱི་རྒྱལ་ཚབ་བམ་སྐུ་ཚབ། རྫོང་དཔོན་སོགས་མཛད་ནས་ཆོས་དང་འཇིག་རྟེན་གཉིས་ཀྱི་ཐད་ནས་རླབས་ཆེ་བའི་ཕྱག་ལས་དུ་མའི་འགན་འཁུར་མཛད། རྒྱལ་ཚབ་རིན་པོ་ཆེ་ཁོང་ཉིད་དགུང་གྲངས་དགུ་ནས་ཆོས་སྒོར་བཞུགས། རྒྱ་གར་ལྷོ་ཕྱོགས་སྔ་འགྱར་རྙིང་མའི་གདན་ས་ཆེན་མོ་ཐེག་མཆོག་རྣམ་གྲོལ་གླིང་དུ་ནང་ཆོས་ལ་སློབ་གཉེར་མཛད་ཅིང་༧སྐྱབས་རྗེ་གྲུབ་དབང་པདྨ་ནོར་བུ་རིན་པོ་ཆེ་རྩ་བའི་བླ་མར་བསྟེན། ༧སྐྱབས་རྗེ་གྲུབ་དབང་པདྨ་ནོར་བུ་རིན་པོ་ཆེ་གཙོས་པའི་སྐྱེས་ཆེན་དམ་པ་དུ་མའི་སྐུ་མདུན་ནས་སྔ་འགྱུར་རྙིང་མའི་བཀའ་གཏེར་གྱི་དབང་ལུང་ཁྲིད་གསུམ་དང་། རྫོགས་ཆེན་མན་ངག་སྡེའི་ཆོས་སྐོར་གྱིས་གཙོས་པའི་ཟབ་ཆོས་གྲངས་ལས་འདས་པ་གསན། ༧སྐྱབས་རྗེ་གྲུབ་དབང་པདྨ་ནོར་བུ་རིན་པོ་ཆེ་མཆོག་ནས་རྒྱུན་དུ་ཐུགས་གཙིགས་ཆེན་པོས་བདག་གཉེར་གནང་ཞིང་རྒྱལ་བསྟན་རིན་པོ་ཆེ་དར་སྤེལ་ཆེད་ཐའི་ཝེན་དུ་དམིགས་སུ་བཀར་ནས་གཏོང་གནང་མཛད། བསྙེན་སྒྲུབ་ལས་གཞུང་ནས་བཤད་པ་བཞིན་སྔ་རྗེས་ཐེངས་དུ་མར་སྔ་འགྱར་རྙིང་མའི་རྩ་གསུམ་གཙོ་བོར་འགྱུར་པའི་ཡི་དམ་ལྷག་པའི་ལྷ་རབ་འབྱམས་ཀྱི་གྲངས་བསྙེན་དང་དུས་བསྙེན་ཆུ་བོའི་རྒྱུན་བཞིན་བསྐྱལ་ཏེ་དམ་ཆོས་སྙིང་པོའི་ཉམས་ལེན་ལ་རྩེ་གཅིག་ཏུ་གཞོལ། གཞན་ཡང་རིན་པོ་ཆེ་མཆོག་ནས་གདུལ་བྱའི་ཁམས་དབང་བསམ་པ་དང་མཐུན་པའི་ཆོས་ཀྱི་བྱེད་སྒོ་ཁག་དང་། སྤྱི་ཚོགས་ཞབས་ཞུ་དང་འགྲོ་བ་སེམས་ཅན་ལ་ཕན་ཐོགས་པའི་གནད་སྨིན་ཕྱག་ལས་དུ་མ་མཛད་དང་མཛད་བཞིན་པ་བཅས་སོ།།"
] },
            ],
          },
        },
        'oracle-tara': {
          eyebrow: 'ORACLE TARA', title: '神諭度母', name: '陳敏老師簡介', lineage: '達拉度母佛堂', image: './images/chen-min-teacher.jpg', alt: '神諭度母陳敏老師照片',
          lead: '陳敏老師是一位長期倡導結合「身、心、靈」的全方位老師，是許多人心目中的「心靈導師」。',
          paragraphs: [
            '因為自幼接觸佛法，所以凡事皆以慈悲利他的心關懷眾生。在某個因緣下認識了尊貴的嘉察仁波切，了解仁波切的佛行事業、長期關懷弱勢，行慈善志業的發願，心裡很是感動。',
            '感念於嘉察仁波切慈悲與願力，老師在仁波切的帶領下，全心投入志工服務與慈善的工作，追隨仁波切的弘法事業。',
            '老師在2012年成立「達拉度母佛堂」，主尊禮拜「觀音度母三尊」，希望以「達拉度母、滿願眾生」的理念與精神，發心發願希望能夠幫助引導有緣大眾，與更多和度母有緣的弟子們相遇。祈願這個專修度母的清淨聖地，能夠幫助大家心想事成、所求滿願。',
            '陳敏老師目前除了每周法會帶領弟子們一起共修外、也定期安排「佛化人生講座」與大家充電。',
            '老師開放諮詢問事，以佛法與命理的角度、結合靈氣方式來幫助、教導大家要如何改變突破自我，開啟邁向人生成功的密碼。',
            '透過老師的指引，多年來幫助了許多人，使有所求者獲得心靈成長，老師就像一盞明燈為大家解惑，找到人生正確的前進方向。',
          ],
        },
      },
    }),
    computed: { teacher() { return this.profiles[this.slug] || this.profiles['jiacha-rinpoche']; } },
    watch: { slug() { this.activeBioTab = 'zh'; } },
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">{{ teacher.eyebrow }}</span><h1>{{ teacher.title }}</h1></section>
        <section class="section-wrap teacher-detail" :class="{ 'teacher-detail-translated': teacher.translations }"><div class="teacher-detail-photo"><img :src="teacher.image" :alt="teacher.alt"></div><article class="teacher-detail-copy"><span class="eyebrow">{{ teacher.lineage }}</span><h2 :lang="activeBioTab === 'zh' ? 'zh-Hant' : activeBioTab">{{ teacher.translations ? teacher.names[activeBioTab] : teacher.name }}</h2><template v-if="teacher.translations"><div class="teacher-bio-tabs" role="tablist" aria-label="傳記語言"><button v-for="tab in [{id:'zh',label:'中文'},{id:'en',label:'English'},{id:'bo',label:'藏文'}]" :key="tab.id" class="teacher-bio-tab" :class="{ 'is-active': activeBioTab === tab.id }" role="tab" :id="'bio-tab-' + tab.id" :aria-selected="activeBioTab === tab.id" :aria-controls="'bio-panel-' + tab.id" :tabindex="activeBioTab === tab.id ? 0 : -1" @click="activeBioTab = tab.id">{{ tab.label }}</button></div><div class="teacher-bio-panel" role="tabpanel" :id="'bio-panel-' + activeBioTab" :aria-labelledby="'bio-tab-' + activeBioTab" :lang="activeBioTab === 'zh' ? 'zh-Hant' : activeBioTab === 'en' ? 'en' : 'bo'"><section v-for="(section,index) in teacher.translations[activeBioTab]" :key="index" class="teacher-bio-section"><h3 v-if="section.heading">{{ section.heading }}</h3><p v-for="(paragraph,pIndex) in section.paragraphs" :key="pIndex">{{ paragraph }}</p></section></div></template><p v-if="teacher.lead" class="teacher-intro-lead"><strong>{{ teacher.lead }}</strong></p><p v-if="!teacher.translations" v-for="(paragraph, index) in teacher.paragraphs" :key="index">{{ paragraph }}</p></article></section>
        <nav class="section-wrap teacher-page-nav"><RouterLink class="button button-blue" to="/about">← 認識佛堂</RouterLink><RouterLink class="button button-blue" :to="slug === 'jiacha-rinpoche' ? '/teachers/oracle-tara' : '/teachers/jiacha-rinpoche'">{{ slug === 'jiacha-rinpoche' ? '神諭度母 →' : '尊貴上師 →' }}</RouterLink></nav>
      </div>
    `,
  };

  const OfferingsPage = {
    data: () => ({
      config,
      categories: [
        { name: '嘎屋', description: '嘎屋（Ghau）是藏式隨身佛龕，可裝藏本尊相關咒輪、佛像或聖物；以下依本尊款式列出。', items: [
          { name: '藥師佛嘎屋', image: './images/ghau-medicine-buddha.jpg', description: '藥師琉璃光如來簡稱藥師佛，乃為大醫王佛。', more: [
            '在多劫前發十二誓願救度一切眾生除去貧苦及無明所造之惡因及身心一切惡疾病源，特別對因果業障纏身所引發之病痛、無明痼疾，都有很大的助益。眾生若逢病苦危難或遭逢橫禍或夜被魔魑所壓健康受損、精神錯亂等，無懷疑誠心的向本尊祈請、持誦心咒或名號、禮敬供養讚誦本尊，並常行利生善行，只要不是業力之元壽竭盡，定能滅除所有突發的惡緣，以及疾病的障礙，得佛悲願力救助。',
          ] },
          { name: '蓮師嘎屋', image: './images/ghau-guru-rinpoche.jpg', description: '在多劫前，蓮花生大士是藏傳佛教的開基祖師。', more: [
            '蓮花生大士是阿彌陀佛之化身、觀世音的法語、諸佛之心意，是諸佛菩薩身口意之化身，具有無量無邊不可思議的功德，能了知世出世間一切諸法，顯密圓通。',
            '蓮師為方便度眾生示現不可思議神通，以慈悲大威德降伏魔眾外道，具足熄滅一切地、水、火、風、空所生諸難，及難調伏的障礙逆境，所求如意、心想事成。',
          ] },
          { name: '綠度母嘎屋', image: './images/ghau-green-tara.jpg', description: '綠度母是觀音菩薩慈悲示現，集諸佛菩薩事業功德。', more: [
            '綠度母是觀音菩薩因慈悲天下眾生流下眼淚的變化身，是集諸佛菩薩事業、功德之本尊，總攝其餘二十尊化身之所有功德。',
            '【度母】為救度無量眾生急切有力之意，特別是對事業、權勢及運勢的增廣，能息眾生種種苦惱，滿足一切眾生願求，並賜予眾生所盼的成就，滿足眾生祈願而令其心想事成，修持度母法門，能獲得世間種種力量、權勢、財富、增長現世富貴、消除病苦等惡業，如滿願寶、諸事順遂、得福報子息增長，求子得子，所求如意自在。',
          ] },
          { name: '四臂觀音嘎屋', image: './images/ghau-avalokiteshvara-4arm.jpg', description: '四臂觀音是諸佛大悲心的化現。', more: [
            '為救度不同眾生而示現不同相，於六道中救度一切眾生，世人稱為大慈大悲觀世音菩薩，與娑婆世界眾生有甚深因緣，聞聲救苦，諸多行者皆以其為依怙主。',
            '修誦六字大明咒～能除滅身中百千萬億劫生死重罪，身口意業皆得清淨，速得息災、增益、懷愛、降伏四法成就，抵達解脫的道路，能度六道眾生，能成大菩提，能救苦救難，利益一切有情，功德無量無邊。',
          ] },
          { name: '金剛薩埵嘎屋', image: './images/ghau-vajrasattva.jpg', description: '金剛薩埵為五方佛、寂忿百尊的總集身。', more: [
            '其具有斷、證的一切功德，同時也是除去障礙之大力尊。可令疾病、魑魅魍魎、障礙、罪過等等一切惡事得以止息，如能發大懺悔心能懺除一切罪障，令眾生自無始以來所累積的墮罪、習氣悉得消除，令得清淨。',
          ] },
          { name: '黃財神嘎屋', image: './images/ghau-yellow-jambhala.jpg', description: '黃財神是寶身佛所化現的大菩薩，主司財富。', more: [
            '掌管無盡的財庫，是諸財神的領袖。若如法誠心恭奉、一心持誦財神心咒，能得財神聖眾護法隨身庇祐、開啟財運，令財源廣進、免除窮困，更能增長福德、壽命、智慧，具足世間、出世間一切資糧，法財圓滿，求財富得財富，食祿衣物無缺、所求滿願、受用自在富饒。',
            '若能更發無上菩提心，救度一切貧苦眾生、廣結善緣、勤行佈施，所獲福德滿盈，不可限量。',
          ] },
          { name: '咕嚕咕咧嘎屋', image: './images/ghau-kurukulle.jpg', description: '咕嚕咕咧佛母能增長福慧、權勢與財富。', more: [
            '咕嚕咕咧佛母專為有情眾生增長福、慧、權勢、財富廣大增長，能掃除人與非人等諸障礙，並將眾生衰損的運氣重新恢復並增強起來，迅速圓滿二資糧。',
            '修持咕嚕咕咧，可勾招一切事業、權勢所求圓滿，增加福報與運氣、心想事成。人緣增上、魅力無限、所到之處受人歡迎受人愛戴、令其威權具足，廣得善緣得貴人助、在工作升遷上或想轉職者皆能如願，已婚者感情順利、夫妻恩愛、婚姻美滿、家庭和睦，單身者能增強桃花人緣、早日覓得良緣。',
          ] },
          { name: '普巴金剛嘎屋', image: './images/ghau-vajrakilaya.jpg', description: '普巴金剛總集一切諸佛菩薩事業。', more: [
            '因持用威猛誅滅等調伏方式，是故稱之為【降伏事業】大威力普巴金剛。末法時期群魔飛舞，對修行佛法福薄業重之眾生是極為重要之法門。舉凡任何世間法和佛法修行之一切障礙，若能勤修祈請本尊加持庇護，一切障礙惡緣危難無不淨除，能迅速去除惡業疾病、惡神精鬼魔障、惡符邪咒，以及世間事業諸般不順衰敗，均得大力庇護眷顧。',
          ] },
          { name: '文殊菩薩嘎屋', image: './images/ghau-manjushri.jpg', description: '文殊菩薩是諸佛智慧總集，手持智慧燄劍。', more: [
            '代表諸佛菩薩智慧功德。',
            '能摧破愚痴，罪障消滅，令眾生智慧成就，若能依法持咒念誦，是時行者能開啟智慧，得宿命智、辯才無礙，透過文殊菩薩的智慧觀照，能清除一切無明愚痴、昏暗的蓋障，令行者聰明伶俐、思路靈敏、堅固記憶、消除語業上所造作的罪障，得到與諸佛菩薩之般若智慧。',
          ] },
        ] },
        { name: '護身法寶', description: '各款依本尊、經咒與法器造型區分；下方簡介整理自佛堂舊站，詳細內容可透過官方 LINE 詢問。', items: [
          { name: '福壽安康寶瓶', images: [
            { src: './images/tara-p02-01.jpg', alt: '福壽安康寶瓶吊飾' },
            { src: './images/offerings-longlife-vase.jpg', alt: '福壽安康寶瓶與隨附法物' },
          ], description: '內含長壽佛、藥師佛經咒卷及總集甘露。', more: ['特別恭請上師依照經典製作，如法裝臟，內含長壽佛經咒卷及藥師佛經咒卷、長壽佛總集甘露與藥師佛總集甘露，更經上師修持長壽佛本尊及藥師佛本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '福緣聚財摩尼寶', images: [
            { src: './images/tara-p02-02.jpg', alt: '福緣聚財摩尼寶吊飾' },
            { src: './images/offerings-mani-jewel.jpg', alt: '福緣聚財摩尼寶與隨附法物' },
          ], description: '內含黃財神與咕嚕咕咧經咒卷及總集甘露。', more: ['特別恭請上師依照經典製作，如法裝臟，內含黃財神經咒卷及咕嚕咕咧經咒卷、黃財神總集甘露與咕嚕咕咧總集甘露，更經上師修持黃財神本尊及咕嚕咕咧本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '息災如意金剛杵', images: [
            { src: './images/tara-p02-03.jpg', alt: '息災如意金剛杵吊飾' },
            { src: './images/offerings-vajra-peace.jpg', alt: '息災如意金剛杵與隨附法物' },
          ], description: '內含金剛薩埵與觀音菩薩經咒卷及總集甘露。', more: ['特別恭請上師依照經典製作，如法裝臟，內含金剛薩埵經咒卷及觀音菩薩心經咒卷、總集甘露，更經上師修持金剛薩埵本尊及觀音菩薩本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '福慧吉祥文殊劍', images: [
            { src: './images/tara-p02-04.jpg', alt: '福慧吉祥文殊劍吊飾' },
            { src: './images/offerings-manjushri-sword.jpg', alt: '福慧吉祥文殊劍與隨附法物' },
          ], description: '內含文殊菩薩與綠度母經咒卷及總集甘露。', more: ['特別恭請上師依照經典製作，如法裝臟，內含文殊菩薩經咒卷及綠度母經咒卷、文殊菩薩總集甘露與綠度母總集甘露，更經上師修持文殊菩薩本尊及綠度母本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '八大黑嚕嘎普巴杵', images: [
            { src: './images/tara-p02-05.jpg', alt: '八大黑嚕嘎普巴杵吊飾' },
            { src: './images/offerings-ghau-eight-herukas.jpg', alt: '八大黑嚕嘎普巴杵與隨附法物' },
          ], description: '內含八大黑嚕嘎心咒卷與修法甘露。', more: ['特別恭請上師依照經典製作，如法裝臟，內含八大黑嚕嘎心咒卷及貝諾法王修法八大黑嚕嘎甘露、紐續寺廟修法八大黑嚕嘎甘露，更經上師修持八大黑嚕嘎本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '普巴金剛普巴杵', images: [
            { src: './images/tara-p02-06.jpg', alt: '普巴金剛普巴杵吊飾' },
            { src: './images/offerings-vajrakilaya.jpg', alt: '普巴金剛普巴杵與隨附法物' },
          ], description: '恭請上師修持普巴金剛本尊儀軌。', more: ['特別恭請上師修持普巴金剛本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '摧破息災金剛杵', image: './images/tara-p02-08.jpg', description: '恭請上師修持摧破金剛及金剛手菩薩本尊儀軌。', more: ['特別恭請上師修持摧破金剛本尊及金剛手菩薩本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '金剛盔甲羯摩杵', image: './images/tara-p02-09.jpg', description: '恭請上師修持忿怒蓮師金剛盔甲本尊儀軌。', more: ['特別恭請上師修持忿怒蓮師金剛盔甲本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '威猛降魔金剛斧', image: './images/tara-p02-10.jpg', description: '恭請上師修持三位本尊儀軌。', more: ['特別恭請上師修持獅面空行母本尊、金剛亥母本尊及黑忿怒空行母本尊儀軌，清淨修法開光加持圓滿。'] },
          { name: '大鵬金翅鳥護身項鍊', images: [
            { src: './images/tara-p02-11.jpg', alt: '大鵬金翅鳥護身項鍊正面' },
            { src: './images/offerings-garuda-pendant.jpg', alt: '大鵬金翅鳥護身項鍊背面' },
          ], description: '恭請上師修持大鵬金翅鳥本尊儀軌，背面書寫種子字。', more: ['特別恭請上師修持大鵬金翅鳥本尊儀軌，清淨修法開光加持圓滿。背面由仁波切親自書寫種子字。'] },
          { name: '九宮八卦護身墜飾', images: [
            { src: './images/tara-p02-12.jpg', alt: '九宮八卦護身墜飾正面' },
            { src: './images/offerings-nine-palace-pendant.jpg', alt: '九宮八卦護身墜飾背面' },
          ], description: '九宮八卦護身墜飾，背面由仁波切親自書寫種子字。', more: ['將九宮八卦懸掛於公司、住家大門上或屋內、辦公室、佛堂及屋角等處，可作為回遮與祈願家宅平安之用。背面由仁波切親自書寫「嗡 啊 吽」種子字。'] },
          { name: '九宮八卦小護身墜飾', description: '九宮八卦咒輪小款隨身墜飾。', more: ['將九宮八卦懸掛於公司、住家大門上或屋內、辦公室、佛堂及屋角等處，可作為回遮與祈願家宅平安之用。背面由仁波切親自書寫「嗡 啊 吽」種子字。詳細尺寸與請供資訊請洽官方 LINE。'] },
        ] },
        { name: '加持咒輪圖', description: '包含勾松咒輪圖與九宮八卦圖等款式，部分圖卡依尺寸區分。', items: [
          { name: '勾松咒輪圖（大）', description: '蓮師伏藏咒輪圖；佛堂舊站介紹可懸掛於門楣或放置於家中、辦公空間。' },
          { name: '勾松咒輪圖（中）', description: '蓮師伏藏咒輪圖；佛堂舊站介紹可懸掛於門楣或放置於家中、辦公空間。' },
          { name: '鎮宅化煞九宮八卦圖立牌（文殊九宮八卦立牌）', description: '文殊九宮八卦圖立牌；商品名稱與規格請以佛堂提供資訊為準。' },
          { name: '九宮八卦圖（中）', description: '九宮八卦咒輪圖中款；佛堂舊站介紹可隨身攜帶或懸掛於空間中。' },
        ] },
        { name: '其他結緣品', description: '包含息增懷誅圓滿運動手環、西藏手工八吉祥臥香爐，以及多款本尊主題手環與項鍊。', items: [
          { name: '息災 金剛薩埵手環', image: './images/tara-p04-01.jpg', description: '迅速消除罪障，歡喜而遠離困境。', more: ['心咒：嗡 班雜 薩埵 吽'], detailsLabel: '心咒' },
          { name: '增益 黃財神手環', image: './images/tara-p04-02.jpg', description: '增長福德、壽命、智慧，受用自在富饒。', more: ['心咒：嗡 藏巴拉 雜連 紮耶 梭哈'], detailsLabel: '心咒' },
          { name: '懷愛 咕嚕咕咧佛母手環', image: './images/tara-p04-03.jpg', description: '淨除道障違緣、增上順緣。', more: ['心咒：嗡 咕嚕 咕咧 啥以 梭哈'], detailsLabel: '心咒' },
          { name: '伏誅 金剛手菩薩手環', image: './images/tara-p04-04.jpg', description: '怯除疾病瘟疫、迴遮危難。', more: ['心咒：嗡 班雜 巴尼 吽呸'], detailsLabel: '心咒' },
          { groupTitle: '吉祥圓滿', name: '綠度母運動手環', image: './images/tara-p04-05.jpg', description: '心想事成所求滿願。', more: ['心咒：嗡 達列 嘟達列 嘟列 梭哈'], detailsLabel: '心咒' },
          { name: '健康長壽 長壽佛手環', image: './images/tara-p04-06.jpg', description: '增長壽命及福德智慧。', more: ['心咒：嗡 咕嚕 阿育 悉地 吽 啥 阿瑪 日阿尼 孜溫 諦耶 梭哈', '※長壽佛手環由尊貴的 嘉察仁波切設計，修法開光加持圓滿。'], detailsLabel: '心咒與手環介紹' },
          { name: '西藏手工八吉祥臥香爐', images: [
            { src: './images/offering-incense-burner-front.png', alt: '西藏手工八吉祥臥香爐正面' },
            { src: './images/offering-incense-burner-detail.png', alt: '西藏手工八吉祥臥香爐使用情境' },
          ], description: '西藏手工製八吉祥臥香爐，提供不同尺寸。' },
          { name: '度母五色圓滿手環及佛卡', image: './images/tara-p05-01.jpg', description: '特別恭請尊貴的 圖松法王 修法開光加持圓滿。', more: ['※修法加持圓滿之度母手環與佛卡乙張'], detailsLabel: '品項補充' },
          { name: '度母七色手環', description: '七色度母主題手環。' },
          { name: '度母七色項鏈', description: '七色度母主題項鍊。' },
        ] },
      ],
      topics: [
        { to: '/offerings/ghau', eyebrow: 'GHau', title: '心想事成嘎屋', image: './images/ghau-banner.png', description: '認識隨身佛龕的意義、裝臟聖物與嘎屋款式。' },
        { to: '/offerings/protective', eyebrow: 'PROTECTIVE CHARMS', title: '護身法寶', image: './images/protective-banner.png', description: '依本尊、經咒與法器造型瀏覽各款護身法寶。' },
        { to: '/offerings/mantra-diagrams', eyebrow: 'MANTRA DIAGRAMS', title: '加持咒輪圖', image: './images/mantra-banner.png', description: '認識勾松咒輪圖與九宮八卦圖等品項。' },
        { to: '/offerings/smoke-offering', eyebrow: 'SMOKE OFFERING', title: '煙供除障粉', image: './images/smoke-offering-banner.png', description: '瀏覽煙供除障粉品項與相關介紹。' },
        { to: '/offerings/other', eyebrow: 'OTHER OFFERINGS', title: '其他結緣品', image: './images/offering-other-cover.png', description: '西藏手工八吉祥臥香爐，以及多款本尊主題手環與項鍊。' },
        { to: '/offerings/mug', eyebrow: 'TARA MUG', title: '聚財滿願杯', image: './images/offering-mug-home-cover.jpg', description: '查看達拉 TARA 主題隨行杯介紹。' },
      ],
    }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">OFFERINGS</span><h1>加持結緣品</h1><p>達拉佛堂殊勝法寶及聖物</p></section>
        <section class="section-wrap offering-topics" aria-label="結緣品專題介紹">
          <div class="offering-topic-grid">
            <RouterLink v-for="topic in topics" :key="topic.to" :to="topic.to" class="offering-topic-card" :class="{ 'offering-topic-card-mug': topic.to === '/offerings/mug' }">
              <img :src="topic.image" :alt="topic.title + '主題圖片'" loading="lazy">
              <div class="offering-topic-copy"><span class="eyebrow">{{ topic.eyebrow }}</span><h3>{{ topic.title }}</h3><p>{{ topic.description }}</p><span class="text-link">了解更多 <b aria-hidden="true">→</b></span></div>
            </RouterLink>
          </div>
        </section>
        <section class="offering-footnote section-wrap"><p>品項與庫存狀態可能變動，請供前請透過官方 LINE 確認。本網站不提供線上付款或請供表單。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問請供方式 <span aria-hidden="true">↗</span></a></section>
      </div>
    `,
  };

  const OfferingDetailPage = {
    props: ['slug'],
    data: () => ({
      config,
      activeImages: {},
      pausedCarousels: {},
      expandedDetails: {},
      carouselTimer: null,
      categories: OfferingsPage.data().categories,
      pages: {
        ghau: {
          title: '心想事成嘎屋', category: '嘎屋', eyebrow: 'GHau', image: './images/ghau-banner.png',
          lead: '',
          sections: [
            { id: 'meaning', title: '隨身的廟宇', paragraphs: [
              '嘎屋（ghau）是藏語的音譯，意指小型佛龕、護身佛的盒子，又稱為「隨身的廟宇」。嘎屋是將佛教三寶聖物佩掛於自身上，其內可裝臟各傳承的守護咒輪、小佛像、舍利子、甘露及各種的加持聖物。',
              '有特殊裝臟開光的嘎屋，亦代表某依本尊的壇城，是極為殊勝的護身加持物。可阻擋邪穢魔鬼、非人之傷害，並得到善神護法護佑，消除一切障礙。',
            ] },
            { id: 'deities', title: '十尊佛與法徽', paragraphs: [
              '每個嘎屋正面為十尊佛，背面為無量壽佛學會法徽。',
              '十位本尊之嘎屋各有其特殊功德與加持力，如此殊勝難得的嘎屋若能隨身配帶，從外在而言，可以免除八難十六畏怖等違緣逆境。從內在而言，可以增廣個人福壽、權勢，俾令順緣增上，諸事吉祥，圓滿所希求之願。',
            ] },
            { id: 'contents', title: '嘎屋裝臟物', bullets: [
              '所依每位本尊咒語',
              '所依聖物總聚丸 (Tendu Rilbu，藏音「滇堆日布」，請參見下方說明)',
              '尊貴的上師 貝諾法王賜予之甘露及特別修法加持的米',
              '尊貴的上師 貝諾法王賜予之白玉不斷傳承下來的金剛砂',
              '西康德格印經墨汁甘露丸：德格印經院的說部、注疏部中具足八萬四千法 的內容，用模版墨汁製印時流出的墨汁，收集製成甘露丸。(此墨汁為植物性墨汁)',
            ], subheading: '所依聖物總聚丸', subparagraphs: [
              '乃是由來源超過400樣、種類多達275種經過加持之神聖所依誓言物所集合在一起而製成的藥丸，其中包括有如：佛陀、蓮花生大士、耶謝措嘉佛母、龍欽巴尊者、吉美林巴尊者、湯東嘉波尊者、噶瑪洽美仁波切、岡波巴大師、大寶法王噶瑪巴、薩千．貢噶寧波尊者、米滂仁波切、宗薩蔣揚欽哲仁波切、蔣貢工珠仁波切、前世白玉貝諾法王、前世白玉噶瑪古千法王、前世敦珠法王、前世頂果欽哲法王等各大教派的殊勝成就者、伏藏大師們的聖骨、頭髮、血、肉、衣物、甘露，以及包括白玉寺、敏卓林寺、雪謙寺、噶陀寺等寧瑪主寺修法的甘露法藥。',
              '此次南卓林寺將這些種類眾多、殊勝不可言的加持聖物匯集在一起，製作成了此一藥丸－「所依聖物總聚丸」，可謂極為希有珍貴、應當如理珍重。',
            ] },
            { id: 'wear', title: '日常配戴提醒', paragraphs: [
              '所有「嘎屋」皆由學會住持恭請眾仁波切，喇嘛共同如法裝臟，開光加持。數量有限，請事先詢問登記。',
              '嘎屋日常生活中配戴在身上勿取下(除沐浴時)尤其是睡覺時更要配戴在身上。',
            ] },
          ], previous: null, next: { title: '護身法寶', to: '/offerings/protective' },
        },
        protective: {
          title: '護身法寶', category: '護身法寶', eyebrow: 'PROTECTIVE CHARMS', image: './images/protective-banner.png',
          lead: '',
          sections: [
            { id: 'protective-intro', title: '殊勝護身法寶', paragraphs: [
              '達拉護身法寶內含珍貴的裝臟物甘露與各本尊經咒，特別恭請尊貴的嘉察仁波切與僧眾如法製作裝臟、開光修法、灑淨加持圓滿，及多位尊貴的法王親臨佛堂修法開光加持。佛堂平日舉辦法會、不斷修法，匯聚殊勝加持力。現開放與有緣大眾請供，實屬難得的緣分。',
              '請供佩戴者如具信心、恭敬心與虔誠心相應，可得諸佛菩薩護佑。隨身配戴或攜帶身上，有如佛菩薩的金剛護身般，可得極大保護力，任何魔障邪氣不能近身；若能搭配煙供粉常常淨化，更能常保清淨，得好運勢不斷增長，一切順心如意。',
            ] },
            { id: 'protective-care', title: '配戴護身法寶注意事項', bullets: [
              '日常生活中隨身配戴，尤其出入磁場不佳的場所（如醫院、喪事）可以保護平安勿取下，回家後立即以煙供粉薰燒，睡覺時更需配戴。',
              '沐浴時請取下，避免沾水，以免法寶內的加持物受損。',
              '可不定期帶到佛堂，恭請仁波切加持灑淨。',
              '平時不配戴時，可置於家中乾淨桌面或佛堂，並定期以除障粉薰燒淨化。',
              '若有損壞，請帶至佛堂處理。',
            ] },
          ], previous: { title: '嘎屋', to: '/offerings/ghau' }, next: { title: '加持咒輪圖', to: '/offerings/mantra-diagrams' },
        },
        'mantra-diagrams': {
          title: '加持咒輪圖', category: '加持咒輪圖', eyebrow: 'MANTRA DIAGRAMS', image: './images/mantra-banner.png',
          lead: '',
          sections: [
            { id: 'gosung', title: '勾松咒輪圖', image: './images/mantra-gosung.jpg', subsections: [
              { title: '由來', paragraphs: [
                '蓮師巖藏大威力 驅魔鎮宅護守家宅大門咒輪，藏名譯音為（勾松松扣），是取伏藏大師敦都林巴尊者，由巖藏寶庫中取出蓮師所畫留傳後世弟子。',
                '藏密祖師蓮花生大士，為救度末法眾生僻脫一切邪魔凶鬼、及傷害眾生各種病魔精鬼的侵害，蓮師化現大護法九足蝎子，噴出熾烈火焰，噉食催伏傷害眾生一切邪魔凶神、羅剎、山精鬼怪。',
                '此護門鎮宅咒輪「勾松」必須展開明顯，勿折疊捲曲，掛在任何門楣上，可以保護鎮宅平安，使所有好鬥的邪魔、怨鬼、男鬼、活鬼（多為女性）、厲鬼、邪靈之類等，都不敢來損害擾亂，並且將它們的路徑中斷，使之無門路可循！因此九足頭黑色鐵蠍護法，即是「給共」魔王的刺星和終結者！',
              ] },
              { title: '功德利益', paragraphs: [
                '將此蓮師巖藏大威力咒護輪懸掛於自宅大門上，一切邪魔凶神惡鬼精靈見者心驚膽顫懼怕，更能將其抵擋於遠處無法靠近，此門咒護輪有此特別之力量，更能保護行者不受一切外來邪魔精鬼及外道惡符咒之侵害與障礙，而強行侵入傷害眾生精鬼邪魔自心將碎裂，遠離逃命。',
              ] },
              { title: '注意事項', paragraphs: [
                '鎮宅咒輪「勾松」圖，由上師加持開光。勾松咒輪圖卡可隨身攜帶，或掛在大門門楣上保護家宅平安；也可以掛立在客廳、辦公室、商店、公司行號、寺院道場、關房。',
                '護輪需常保持潔淨，而且必須謙虔誠恭敬，千萬不可起輕蔑毀謗，亦不可隨便印製發送。慎重。',
              ] },
            ] },
            { id: 'nine-palace', title: '九宮八卦', image: './images/mantra-nine-palace.jpg', subsections: [
              { title: '由來', paragraphs: [
                '此九宮八卦咒輪牌，是由西藏密宗開山祖師─蓮花生大士，為眾生於世間因受時空、方位不吉祥所生障難，特聚集梵、藏、漢三地破除各種兇煞之鎮宅安居妙寶而成。',
              ] },
              { title: '功德利益', paragraphs: [
                '吉祥九宮八卦咒輪牌，藉由上師開光的力量，隨身佩戴於身上或繫於包包上可以趨吉避凶，可以有效避開、迴遮一切災煞、歲煞、劫煞、伏兵、大禍、太歲、歲破等諸年月日時分秒時辰煞星的無明侵害，增善緣、滅惡緣，息災破禍，息疾病而添福壽，化凶煞為清涼，提昇吉祥能量，百事皆順，無禁無忌、吉祥如意。將此咒牌懸掛於公司門口或辦公室後方、住家大門上、屋內佛堂，可防範因人、事、物、門向、地理、時空之沖剋所生兇煞，阻擋一切不祥災禍，轉禍為福，百無禁忌，於宅內安居者，不論錢財、婚姻、子嗣、人緣、名位、迴遮一切太歲、歲破、劫煞、災煞、歲煞、伏兵、大禍等諸年月日時煞星。',
                '對於阻擋路沖、灶、廁、門、床等不利方位所衍生的噩運、凶煞，在化解風水煞氣，將有趨吉避凶，令人意想不到的神奇功效得諸佛菩薩之加庇而善緣生生不息，滅惡緣而無災禍，息疾病而添福壽，家安宅吉。',
              ] },
              { title: '注意事項', paragraphs: [
                '可隨身攜帶或掛貼自宅大門門帽上保護家宅平安，需常保持潔淨，而且必須謙虔誠恭敬，千萬不可起輕蔑毀謗，亦不可隨便印製發送。',
              ] },
            ] },
          ], previous: { title: '護身法寶', to: '/offerings/protective' }, next: { title: '煙供除障粉', to: '/offerings/smoke-offering' },
        },
        'smoke-offering': {
          title: '煙供除障粉', eyebrow: 'SMOKE OFFERING', image: './images/smoke-offering-banner.png',
          lead: '達拉度母除障香粉',
          sections: [
            { id: 'smoke-intro', title: '達拉度母除障香粉', paragraphs: [
              '達拉煙供粉非常殊勝難得，有供養諸佛、清淨除穢、淨化除障、保護息災、增加好運勢等利益。因加入多種稀有甘露與眾多加持物，並特別恭請尊貴的嘉察仁波切與僧眾如法修法、灑淨、加持圓滿，是非常殊勝難得的法寶，其加持力亦不可思議！',
              '薰燒煙供除障粉不僅可以清淨自身磁場、淨化空間環境，也可去除身上因接觸沾染的晦氣。保持清淨，更可以召喚好的磁場能量、增長運氣、增加善緣、消除災障及惡緣，常保平安、一切順利。',
              '隨時點燃煙供除障粉並定期薰燒，可化解違緣障礙，使一切所求如願。隨身攜帶或以清淨動機薰燒，並以信心祈請，也可藉由香氣供養諸佛菩薩及護法空行眾，祈願賜予加持、淨除所知障與煩惱障，遠離人與非人侵害及此世來世魔難冤孽，令惡緣轉輕或熄滅，得健康、長壽、運勢提升，累積福慧資糧，所願成就。',
            ] },
            { id: 'smoke-contents', title: '煙供除障粉內含物', bullets: [
              '尊貴的第三世貝諾法王修持的總集甘露丸。',
              '白玉印度南卓林寺六千僧眾修法的加持物與煙供粉。',
              '西康白玉祖寺所依聖物總聚丸及多種稀有甘露與加持物。',
              '西康穆松寺甘露總集丸及加持物、西康白玉巴納寺總集甘露丸及加持物。',
              '聖地菩提迦耶寧瑪大法會九千僧眾修法加持的煙供粉。',
              '空隆降魔佛爺修法加持而成甘露丸與特別為中心製作的煙供粉。',
              '多竺欽法王修持之加持物。',
              '圖松法王修法加持物。',
              '西藏嘎陀寺「法藥之王－萬僧法藥」。',
              '數十位殊勝成就者及各寧瑪主寺修持的甘露丸。',
              '西藏、印度、不丹、尼泊爾等聖地的水、土。',
              '嘉察仁波切收藏之數千種珍稀殊勝的加持物。',
            ], image: './images/tara-p03-01-ingredients.jpg', imageAfterList: true },
            { id: 'smoke-for-whom', title: '哪些人需要常常薰燒煙供粉？', paragraphs: [
              '需要常常與人接觸，或想淨化磁場、增加正能量與好運的人，例如：老師、櫃檯、直銷業、保險業、房仲業、服務業、餐飲業、百貨業、殯葬業、業務、美容美髮、醫護、按摩推拿等。',
            ] },
            { id: 'smoke-usage', title: '使用及注意事項', bullets: [
              '達拉煙供粉特別恭請尊貴上師修法加持圓滿，不需另行修法即可使用。',
              '使用時間不分時段，隨時隨地皆可薰燒淨化。',
              '請置於乾淨的煙供爐，放適量並堆成三角錐狀，較容易燃燒。',
              '每天可定期薰燒自身與居家環境，或公司行號，以保持清淨良好的磁場。',
              '若前往醫院、參加喪事等磁場不佳的環境，回家後可薰燒除障粉淨化。',
              '出差時可攜帶少許煙供粉，或在飯店放置於桌上薰燒，祈願自身與環境清淨。',
              '若希望店面增加客源，可每天以煙供粉淨化店面。',
              '薰燒後的煙供粉可撒於盆栽、土地或水中，以利益一切眾生。',
            ] },
            { id: 'smoke-note', title: '請供資訊', paragraphs: [
              '達拉煙供粉可供養諸佛、清淨除穢、淨化除障、保護息災、增加好運勢。除障粉恭請尊貴的嘉察仁波切與僧眾共同如法裝臟、開光加持。數量有限，請事先詢問登記。',
            ] },
          ],
          previous: { title: '加持咒輪圖', to: '/offerings/mantra-diagrams' }, next: { title: '其他結緣品', to: '/offerings/other' },
        },
        other: {
          title: '其他結緣品', category: '其他結緣品', eyebrow: 'OTHER OFFERINGS', image: './images/offering-other-cover.png',
          lead: '西藏手工八吉祥臥香爐，以及多款本尊主題手環與項鍊。',
          itemsTitle: '結緣品項目',
          itemsIntro: '息增懷誅圓滿運動手環，由尊貴的法王穆松古千親自監督設計及修法加持圓滿，適合平日及運動時配戴。',
          sections: [],
          previous: null, next: { title: '聚財滿願杯', to: '/offerings/mug' },
        },
        mug: {
          title: '聚財滿願杯', eyebrow: 'TARA MUG', image: './images/offering-mug-header.png',
          lead: '',
          sections: [
            { id: 'mug-intro', title: '達拉度母「聚財滿願杯」', image: './images/offering-mug-intro.jpg', paragraphs: [
              '達拉度母陳敏老師為了讓大家都能在生活中與度母連結，特別為弟子們設計了「聚財滿願杯」。',
              '陳敏老師恭請尊貴的祖古嘉察仁波切修法「財源度母法會」，灑淨加持圓滿。',
            ] },
            { id: 'mug-totem', title: '達拉 TARA 圖騰', image: './images/offering-mug-totem.jpg', paragraphs: [
              '代表著諸佛菩薩的息、增、懷、誅、圓滿壇城。',
            ], subsections: [
              { title: '息災 ○', paragraphs: ['平息業障、消除災厄，祈願平安健康。'] },
              { title: '增益 ■', paragraphs: ['增長智慧、福報與財富，祈願財運事業順遂。'] },
              { title: '懷愛 ♡', paragraphs: ['善緣具足、人緣增長，祈願桃花姻緣和合。'] },
              { title: '誅除 ▲', paragraphs: ['斷除種種違緣障礙，祈願除障淨化。'] },
              { title: '圓滿 ◎', paragraphs: ['心想事成、所求滿願，祈願智慧圓滿。'] },
            ] },
            { id: 'mug-mantra', title: '度母心咒', image: './images/offering-mug-cover.jpg', paragraphs: [
              '嗡 達咧 嘟達咧 嘟咧梭哈',
              '聖尊度母加持力。',
            ] },
            { id: 'mug-use', title: '如何使用', bullets: [
              '使用度母杯飲用時，可觀想度母賜予加持、化為甘露水，心中默念杯上的度母心咒後飲用，祈願身心健康安樂。',
              '可以在度母杯中飲用水、咖啡或茶；以「水為財」觀想度母加持，祈願財源廣進。',
              '在度母杯中倒入水或飲品時，可先於息增懷誅壇城前祈請心願，再念誦度母心咒七遍，祈願得度母加持、財源廣進、所求滿願。',
              '可在度母杯中放置五色寶石，象徵木、火、土、金、水五行能量，配合度母心咒加持，作為聚財的祝願。',
              '也可在度母杯中種植綠色開運竹，放置於家中或辦公桌上，寓意福運聚財、生生不息、節節高升。',
            ] },
          ],
          previous: null, next: null,
        },
      },
    }),
    computed: {
      detail() {
        return this.pages[this.slug] || this.pages.ghau;
      },
      displayItems() {
        if (this.slug === 'mug') return [];
        const category = this.categories.find(item => item.name === this.detail.category);
        if (!category) return [];
        return category.items;
      },
    },
    mounted() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.carouselTimer = window.setInterval(() => {
        this.displayItems.forEach(item => {
          if (item.images && item.images.length > 1 && !this.pausedCarousels[item.name]) this.changeImage(item, 1);
        });
      }, 5000);
    },
    beforeUnmount() {
      window.clearInterval(this.carouselTimer);
    },
    methods: {
      scrollToSection(id) {
        const section = document.getElementById(id);
        if (!section) return;
        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      },
      carouselIndex(item) {
        return this.activeImages[item.name] || 0;
      },
      changeImage(item, amount) {
        const count = item.images.length;
        this.activeImages[item.name] = (this.carouselIndex(item) + amount + count) % count;
      },
      pauseCarousel(item, paused) {
        this.pausedCarousels[item.name] = paused;
      },
      toggleItemDetails(name) {
        this.expandedDetails[name] = !this.expandedDetails[name];
      },
    },
    template: `
      <div class="offering-detail-page" :class="{ 'offering-detail-page--ghau': slug === 'ghau' }">
        <div class="section-wrap offering-breadcrumb"><RouterLink to="/offerings">結緣品總覽</RouterLink><span aria-hidden="true">／</span><span>{{ detail.title }}</span></div>
        <section class="offering-detail-hero"><img :src="detail.image" :alt="detail.title + '主題圖片'"></section>
          <header class="section-wrap offering-detail-heading"><span class="eyebrow">{{ detail.eyebrow }}</span><h1>{{ detail.title }}</h1><p v-if="detail.lead">{{ detail.lead }}</p></header>
        <article class="section-wrap offering-detail-content">
          <nav v-if="detail.sections.length > 1 && detail.category !== '嘎屋'" class="offering-detail-toc" aria-label="本頁章節導覽"><a v-for="section in detail.sections" :key="section.id" :href="'#' + section.id" @click.prevent="scrollToSection(section.id)">{{ section.title }}</a></nav>
          <section v-for="section in detail.sections" :id="section.id" :key="section.id" class="offering-detail-section">
            <div class="offering-detail-section-layout" :class="{ 'offering-detail-section-layout--split': slug === 'mug' && section.image, 'offering-detail-section-layout--text-center': slug === 'mug' && !section.image }">
              <div v-if="section.image && !section.imageAfterList" class="offering-detail-section-media"><img class="offering-detail-section-image" :src="section.image" :alt="section.title" loading="lazy"></div>
              <div class="offering-detail-section-copy">
                <h2>{{ section.title }}</h2>
                <p v-for="(paragraph, index) in section.paragraphs || []" :key="'p' + index">{{ paragraph }}</p>
                <ul v-if="section.bullets"><li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li></ul>
                <img v-if="section.image && section.imageAfterList" class="offering-detail-section-image" :src="section.image" :alt="section.title + '照片'" loading="lazy">
                <div v-if="section.subheading" class="offering-detail-subsection"><h3>{{ section.subheading }}</h3><p v-for="(paragraph, index) in section.subparagraphs" :key="'sub' + index">{{ paragraph }}</p></div>
                <div v-for="subsection in section.subsections || []" :key="subsection.title" class="offering-detail-subsection"><h3>{{ subsection.title }}</h3><p v-for="(paragraph, index) in subsection.paragraphs" :key="'sub-' + index">{{ paragraph }}</p></div>
              </div>
            </div>
          </section>
          <section v-if="slug !== 'mantra-diagrams' && displayItems.length" class="offering-detail-products"><div class="offering-detail-section-heading"><span class="eyebrow">BROWSE ITEMS</span><h2>{{ detail.itemsTitle || (detail.category === '嘎屋' ? '本尊嘎嗚' : detail.title + '品項') }}</h2><p v-if="detail.itemsIntro" class="offering-items-intro">{{ detail.itemsIntro }}</p></div>
            <ul class="offering-grid">
              <li v-for="item in displayItems" :key="item.name" class="offering-item" :class="{ 'offering-item--no-image': !item.image && !(item.images && item.images.length) }">
                <div class="offering-image" :class="{ 'offering-image-gallery': item.images && item.images.length > 1 }">
                  <img v-if="item.image" :src="item.image" :alt="item.name" loading="lazy">
                  <div v-else-if="item.images && item.images.length" class="offering-carousel" @mouseenter="pauseCarousel(item, true)" @mouseleave="pauseCarousel(item, false)" :aria-label="item.name + '照片輪播'"><img :src="item.images[carouselIndex(item)].src" :alt="item.images[carouselIndex(item)].alt || item.name" loading="lazy"></div>
                </div>
                <div class="offering-item-copy"><span v-if="item.groupTitle" class="offering-name-group">{{ item.groupTitle }}</span><h3 class="offering-name">{{ item.name }}</h3><p v-if="item.description" class="offering-item-description">{{ item.description }}</p><div v-if="item.more && item.more.length" class="offering-item-details"><div class="offering-item-details-panel" :class="{ 'is-open': expandedDetails[item.name] }" :aria-hidden="!expandedDetails[item.name]"><div class="offering-item-details-inner"><p v-for="(paragraph, index) in item.more" :key="'more' + index">{{ paragraph }}</p></div></div><button type="button" class="offering-item-details-toggle" :aria-expanded="!!expandedDetails[item.name]" @click="toggleItemDetails(item.name)">{{ item.detailsLabel || '功德利益' }} <span aria-hidden="true" :class="{ 'is-open': expandedDetails[item.name] }">⌄</span></button></div></div>
              </li>
            </ul>
          </section>
        </article>
        <nav class="section-wrap offering-detail-pager" aria-label="專題頁面導覽"><RouterLink class="button button-blue" to="/offerings">← 回到總覽頁</RouterLink><RouterLink v-if="detail.next" class="button button-blue offering-detail-next" :to="detail.next.to">{{ detail.next.title }} →</RouterLink></nav>
        <section class="offering-detail-contact"><div class="section-wrap"><span class="eyebrow">QUESTIONS &amp; OFFERINGS</span><h2>請供與品項資訊</h2><p>品項與請供狀態可能更新，請先透過官方 LINE 詢問。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問 <span aria-hidden="true">↗</span></a></div></section>
      </div>
    `,
  };

  const activityEvents = [
    {
      slug: 'new-year-prayer', title: '新年滿願祈福大法會', eyebrow: 'NEW YEAR PRAYER', subtitle: '1/1 許願日', image: './images/activity-new-year-prayer.png',
      description: '每年國曆一月一日舉辦新年祈願法會，於聖度母尊前虔心許願，祈願闔家平安、福慧增長、所求滿願。',
      sections: [
        { title: '新年的第一天・許願日', paragraphs: ['達拉度母每年 1 月 1 日舉辦新年祈願法會。在聖度母尊前親自許下新年願望，並將功德迴向一切眾生，祝福大家新年快樂、福慧善緣增長，闔家平安順心如意。', '一元復始、萬象更新。弟子們虔誠祈願觀音度母護佑，願新年心想事成、諸事順遂。'] },
        { title: '度母指示籤', paragraphs: ['度母指示籤是度母的指引，也是給大家的方向與祝福。可將籤文牢記於心，或隨身攜帶，時時提醒自己，感受度母的加持與祝福。'] },
        { title: '祈福滿願壇城開放新年度認供', paragraphs: ['壇城開放大眾祈福、許願與認供，可依個人願望選擇許願卡、佛菩薩祈福燈或吉祥滿願寶瓶。認供項目與年度資訊請洽佛堂確認。'] },
      ],
    },
    {
      slug: 'spring-prosperity', title: '迎春招財 納福增壽', eyebrow: 'CHINESE NEW YEAR', subtitle: '農曆大年初一・迎財源度母', image: './images/activity-spring-prosperity.png', imagePosition: 'center top',
      description: '大年初一開放佛堂禮佛參拜，祈願新年心想事成、所求滿願，並以布施與善行廣結善緣。',
      sections: [
        { title: '大年初一迎財寶度母', subheading: '財寶天母是為能賜予行者財富的女性本尊。', image: './images/treasure-mother-thangka.png', imageAlt: '財寶天母唐卡', paragraphs: ['於六道之中專管人道世間之財富，並為五路財神之佛母。行者若能至誠懇切供養、禮拜、依止、修習持誦，及不是為了滿足一己的私慾，而是為了要有足夠資財，以三輪體空多行布施於苦難眾生，廣結善緣。如此財源天母當滿其心願，定可去除一切外內密之障礙，增廣無量財富與福德，得到未來的圓滿成就。'] },
        { title: '大年初一禮佛參拜', paragraphs: ['達拉TARA於（大年初一）開放佛堂供弟子們前往禮佛參拜，敬邀十方法友共同至中心禮拜觀音度母，祈願新年心想事成、所求滿願。'] },
        { title: '祈願與認供', paragraphs: ['祈福滿願壇城依年度開放許願、認供與祈福項目。參與方式與當年度安排請以佛堂公告為準。'] },
      ],
    },
    {
      slug: 'world-incense-day', title: '世界煙供日', eyebrow: 'TIBETAN WORLD INCENSE DAY', subtitle: '放天馬・修煙供', image: './images/world-incense-day-hero.png', imagePosition: 'center bottom',
      description: '蓮師經典提云：此日到來，地神、山神、龍王、天龍八部等將因前世因緣而聚集，是佛教密乘放天馬、修煙供非常重要的日子。',
      sections: [
        { title: '', paragraphs: ['全世界出家眾或在家眾皆會在這幾天進行法會儀式，不論是修煙供、放天馬、龍王修法、供養天龍八部等，除了可以幫助我們積聚往生淨土資糧，成就出世果位之外，也能對我們在此世間的生活需求、事業的成功有所助益，淨息所知煩惱障、遠離人與非人害、得健康、長壽、提升運氣，並能累積福慧資糧。'] },
        { title: '放天馬旗', image: './images/activity-world-incense-day.png', imageAlt: '山間飄揚的五色天馬旗', imageLayout: 'stacked', imagePlain: true, paragraphs: ['天馬旗是藏傳佛教中用來對治各種業緣障礙、增加福氣運勢最善巧方便的法門。', '佛陀住世之時，有些弟子運勢低落，時常遭邪魔障礙，身心不時染患病苦，無法專心修學佛法，懇求世尊傳授善妙法門，因此佛陀傳以「天馬」法門，助弟子們修行。天馬旗上印有佛菩薩及本尊心咒、摩尼經及四神獸，當五色天馬旗隨風飄動時，書寫於上之經咒，經仁波切禪定力之加持後隨風傳送而加持整個地區，甚至整個法界。', '使十方虛空一切眾生、龍王、山神、地神等都能蒙佛法加持，令眾生歡喜，因而迴向福報給放天馬之功德主，得無盡之善業功德，消災除障，增長福運。特別能改善運勢，是惡緣障礙現前、重業輕報的善巧法門。', '可破除他人施放符咒，避難官司諍訟，除惡夢、惡想、惡作，使衰損之健康、權勢、財運得以恢復，令身心安泰、福壽增長、權勢威顯、事業昌隆。由於大悲心施無量無盡故，施放天馬之福亦無量。'] },
        { title: '山淨煙供', image: './images/mountain-purification-smoke-offering.png', imageAlt: '信眾於山間參與煙供儀式', imageLayout: 'stacked', imagePlain: true, paragraphs: ['煙供的修持，是一種累積資糧、消除違緣障礙的殊勝法門。', '藉著供養、布施四種賓客，除了可以幫助我們積聚往生淨土資糧、成就出世果位之外，也能對我們在此世間的生活需求、事業的成功有所助益。如平息病魔、障礙；增長壽命、福德、資財；能統攝具有能力的人與非人等；消滅傷害等。', '修煙供需依照儀軌及壇城如法修持。一般信眾可以用虔誠心供養五穀、藥材、花、油、布、香及各種食物，乃至七珍八寶等，經由上師佛法的加持，將之轉化成殊勝供品，以火燃燒的方式，供養十方諸佛菩薩，下施六道眾生，能令法界一切歡喜滿足。觀想受布施者心中的煩惱與飢寒等皆得平息，眼前受用之財富亦皆圓滿。十方安樂吉祥！因此修持山淨煙供，為成就四種事業和究竟成佛之必要。'] },
      ],
    },
    {
      slug: 'dedication-smoke-offering', title: '超薦度亡與下煙供', eyebrow: 'DEDICATION & SMOKE OFFERING', subtitle: '清明節・教孝月', image: './images/activity-dedication-smoke-offering.png',
      description: '清明節與教孝月是重要的祭祖與超渡時節，以佛法功德迴向先亡親友及一切有緣眾生。',
      sections: [
        { title: '超度的意義', items: [
          { title: '超脫三惡道', text: '得生三善道或常住極樂淨土，免遭三世輪迴。' },
          { title: '指引正確方向', text: '墮落於輪迴的眾生，有如行走於荒野中的瞎子，前路茫茫；超度可以指引眾生運用自己本性的智慧之光，遠離無明黑暗。' },
          { title: '消業除障', text: '眾生罪業牽纏，釋迦牟尼佛為眾生消除罪業，傳授小乘、大乘、密乘的方便法門，再按照各乘法門修行，消除眾生業障。' },
          { title: '消魔障', text: '由本身業力顯現的魔障會傷己害人。為魔超度、傳法、灌頂，勸其行善、發大悲菩提心，以避免墮入多生多死的輪迴漩渦。' },
          { title: '為龍修法', text: '龍生病並會使地球遭受各種天災人禍，為龍修法可使法界平安。' },
          { title: '神鬼的超度', text: '神鬼大都於鬼道、畜生道、人道轉世，為其超度可助其得到解脫。' },
        ] },
        { title: '超度的力量', paragraphs: ['猛烈勾召無邊六道眾生全部前來，能召引先亡祖先眷屬、累世冤親債主、中陰冤債深重、中陰迷惑、橫死冤魂、墮胎之嬰靈、惡鬼道、地獄道及頑劣不願受度之眾生，一律勾招前來接受超度。猶如父母教訓犯錯的小孩，悲心是渴切希望孩子能成材、棄惡從善、知過能改，故愛之深、責之切。尤其是勾招四魔：'], itemsHeading: '四魔', items: [
          { title: '天子魔', text: '即他化自在天之天人，障礙行者之修行，帶來無常、失去、毀壞。' },
          { title: '煩惱魔', text: '即自己內心之貪、嗔、痴、慢、疑等種種煩惱障，是眾生痛苦的來源。' },
          { title: '死魔', text: '即突然死亡對修行造成中斷障礙，帶來所知障。' },
          { title: '蘊魔', text: '即色、受、想、行、識五種取蘊，帶來我執、無明。' },
        ], closingParagraphs: ['不論外魔（一般眾生認為四魔是外在的）或內魔（修行人則清楚四魔全由內心造作出來），均由自己造作。在未成佛之前，均需常供養超度；不度化則無法安樂，無法離開無常，無法成佛。'] },
        { title: '超度的功德利益', groups: [
          { title: '為已投胎的眾生超度', paragraphs: ['已投生於各道的眾生（先亡祖先、父母、六親眷屬），為他們超度可以使他們在所生的各道中得到福報利益、減少痛苦，種下接觸佛法的因緣。'] },
          { title: '為中陰身的眾生超度', paragraphs: ['中陰身是指死亡後到再出生前之間的境界，一般不是大善大惡的人約為 49 天。中陰身的超度，由仁波切先勾招處在中陰身狀態下的神識，使他們先能歡喜聽聞佛法，再進一步令其心開意解而得度，往生阿彌陀佛的淨土。', '以大悲菩提心實施煙供、水供、布施血和肉及食物，奉行善事，並將功德迴向給他們，更以傳法、講經來度他們解脫。'] },
          { title: '為累世冤親債主及三惡道眾生超度', paragraphs: ['一般三惡道眾生以大悲菩提心施煙供、水供、布施血及肉及食物，奉行一切善，並將無量功德迴向給他們，傳法、講經度他們解脫。', '厲鬼的超度，則修忿怒本尊、施火供，使厲鬼無始以來之深重業障、身體、名字皆燒掉，讓神識往生到阿彌陀佛淨土。'] },
          { title: '為在世的人超度', paragraphs: ['目的是為現世父母及六親眷屬增加智慧及福德二資糧，清淨無始以來無明所造成的業障，去病魔、增福延壽，使法界免受天災、水災、兵災、風災、火災、瘟疫等危害。'] },
        ] },
      ],
    },
    {
      slug: 'tara-birthday', title: '達拉度母感恩慶生會', eyebrow: 'THANKSGIVING FOR TARA', subtitle: '感恩還願日', image: './images/activity-tara-birthday.png',
      description: '在感恩與還願的特別日子，獻上誠摯心意，感謝度母慈悲護佑、滿足祈請與願求。',
      sections: [
        { title: '感恩與還願', paragraphs: ['度母是眾生的母親，我們都是度母的小孩。於這個感恩與還願的日子，敬邀弟子們參加盛會，獻上誠摯心意，感謝度母的慈悲、護佑與加持。'] },
        { title: '觀音度母的慈悲願力', paragraphs: ['觀世音菩薩以大慈悲願力普渡眾生、聞聲救苦。度母是觀世音菩薩悲憫眾生的化現，共有二十一尊，各代表不同功德利益，慈悲救渡一切苦難眾生。'] },
        { title: '法會祈願', image: './images/activity-tara-birthday-prayer.png', imageAlt: '信眾手持供燈虔心祈願', paragraphs: ['虔心祈請度母加持，祈願消除病苦災劫、增長福慧與壽命，並將功德迴向眾生，願大家平安吉祥、所求滿願。活動日期與參與方式請以佛堂公告為準。'] },
      ],
    },
    {
      slug: 'dragon-king-day', title: '龍王日供龍王寶瓶', eyebrow: 'TIBETAN DRAGON KINGS DAY', subtitle: '供龍王寶瓶・祈願風調雨順', image: './images/activity-dragon-king-day.png',
      description: '《出龍日》，俗稱「龍王日」，是指潛龍出地的日子，乃龍王偕同龍族眷屬出於大地之日，遍行各方巡視，令善人吉祥並護持行者無障礙。',
      sections: [
        { title: '龍王財神寶瓶是求世間福報最為快速的方法之一', paragraphs: [
          '可消除我們因無知冒犯龍王及其眷屬所導致感染病苦、災劫而不自覺的障礙，亦是用來降伏鬼神妖龍，讓人間風調雨順、防止飢荒瘟疫，減少海嘯、乾旱等災害，增廣受用、財源廣進等無窮利益的特殊寶瓶。',
          '因龍族是佛法及庫藏的守護者，龍王乃統領一切水族，並掌管人類之資財。傳統上亦相信，傳染病、呼吸系統疾病、癌症及皮膚病等的起因，都是因為龍王及其眷屬不得安寧而引致的。因人們長期以來所造成的各種水污染及濫捕濫殺，令其飽受疾疫之苦，且傷害了無數的水族生命。',
          '因此若能透過修法、祈請諸佛菩薩加持，供養龍王寶瓶可使龍王及其眷屬解脫諸苦、獲得安樂而不作障礙，進而獲得龍王賜福，使施放寶瓶者及其所處之域風調雨順，並能迅速獲得廣大福報和智慧，財富得到無限增長，遠離危險和痛苦，帶來財富及平安，願望皆能滿足。',
        ] },
        { title: '放生功德利益', paragraphs: ['《放生功德論》云：若欲善趣之樂，放生能得天人福報；若欲自得寂滅，放生即得聲聞羅漢果；若以菩提心所攝，放生則成佛果之因；若願上師住世，放生即能感得上師長久住世；若欲自己長壽，放生成為殊勝長壽法；此有無等之功德。', '【放生功德】放生可得無邊利益，因放生同時具足了三種布施：'], items: [
          { title: '財施', text: '買受困和代宰的眾生。' },
          { title: '法施', text: '放生時為他們念咒、說法和三皈依。' },
          { title: '無畏施', text: '解救他們的生命和恐怖。' },
        ], closingParagraphs: ['所以常行放生能積聚無量無邊的福德，亦有不可思議的善果。'] },
      ],
    },
    {
      slug: 'daily-practice', title: '日常共修', eyebrow: 'DAILY PRACTICE', subtitle: '二十一度母薈供共修', image: './images/activity-daily-practice.png',
      description: '透過共修持誦彼此增上，累積福慧資糧；邀請法友依佛堂公告參與共修。',
      sections: [
        { title: '共修', subheading: '共修的功德利益，可以鏡子的反射做比喻', boldParagraphs: true, paragraphs: ['若以二十人共同念誦咒語，總數達十萬遍，則不論自己在共修時念誦多少遍，都是得到了十萬遍的功德；不僅自己得到，其他十九人也得到十萬遍的功德，故仁波切經常鼓勵弟子參加共修，不僅功德利益大，累積資糧也迅速，希望各位金剛師兄弟能常常參與共修。'] },
        { title: '二十一度母共修之功德利益', paragraphs: [
          '綠度母法門為金剛乘教法中相應最迅速、成就極快的殊勝本尊法門。',
          '「度母」為救度無量眾生，急切有力之意。諸佛加持一切眾生，凡能意念度母名號者，必得諸佛大加持力，特別是針對息、增、懷、誅的事業，能從種種的災難恐懼中解脫，免除三有的痛苦，因度母之願力。當世間越濁劣，則其救度之力越快速，摧滅魔軍之力越強。此因末法眾生修行不夠精進，發心不夠懇切，本尊感應較慢，惟有度母感應最快，因度母的智慧眼，觀察世間快如閃電。',
          '綠度母為廿一尊度母之主，綠度母咒乃廿一度母之根本咒。如果常勤祈請或念誦，能斷輪迴之根源，免除一切魔障、瘟疫病苦，消除一切水火刀兵盜賊等災難。乃滿願及除障最深奧的法門，能阻止惡咒、自殺、瘋癲、爭鬥、惡兆、夢魘、疾病、傳染病及牲畜之病等一切損傷，破除年、月、日、時之不祥。並能增長福慧、權威、壽命。凡有所求時，皆得如願成就，圓滿吉祥。',
        ] },
        { title: '共修時間', paragraphs: ['每週共修項目與時間可能依佛堂安排調整，請參閱官方公告或先透過 LINE 詢問。'] },
      ],
    },
  ];

  const ActivitiesPage = {
    data: () => ({ config, events: activityEvents }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">WEEKLY ACTIVITIES</span><h1>法會活動</h1><p>每週日下午有不同的法會活動。最新場次與活動內容，請以 Facebook 官方粉專公告為準。</p></section>
        <section class="section-wrap activity-card"><div class="activity-card-art" aria-hidden="true"><span>週日</span><b>∞</b></div><div class="activity-card-copy"><span class="eyebrow">每週日下午</span><h2>近期法會活動</h2><p>活動內容每週不同，請前往 Facebook 官方粉專查看公告。</p><a class="button button-blue" :href="config.links.facebook" target="_blank" rel="noopener noreferrer">前往 Facebook 官方粉專 <span aria-hidden="true">↗</span></a></div></section>
        <p class="section-wrap activity-note">前往 Facebook 查看最新活動資訊；網站不會自動同步 Facebook 活動。</p>
        <section class="section-wrap activity-events"><div class="activity-events-heading"><span class="eyebrow">PRAYER &amp; CEREMONIES</span><h2>祈福法會</h2><p>認識佛堂舉辦的法會與共修活動。</p></div><div class="activity-event-grid"><RouterLink v-for="event in events" :key="event.slug" :to="'/activities/' + event.slug" class="activity-event-card"><img :src="event.image" :alt="event.title" loading="lazy"><div class="activity-event-copy"><span class="eyebrow">{{ event.eyebrow }}</span><h3>{{ event.title }}</h3><p>{{ event.description }}</p><span class="text-link">了解更多 <b aria-hidden="true">→</b></span></div></RouterLink></div></section>
      </div>
    `,
  };

  const ActivityDetailPage = {
    props: ['slug'],
    data: () => ({ config, events: activityEvents }),
    computed: {
      event() { return this.events.find(item => item.slug === this.slug) || this.events[0]; },
    },
    template: `
      <div class="activity-detail-page">
        <div class="section-wrap activity-detail-breadcrumb"><RouterLink to="/activities">法會活動</RouterLink><span aria-hidden="true">／</span><span>{{ event.title }}</span></div>
        <section class="activity-detail-hero"><img :src="event.image" :alt="event.title" :style="event.imagePosition ? { objectPosition: event.imagePosition } : null" fetchpriority="high"></section>
        <header class="section-wrap activity-detail-heading"><span class="eyebrow">{{ event.eyebrow }}</span><h1>{{ event.title }}</h1><p>{{ event.description }}</p></header>
        <article class="section-wrap activity-detail-content"><section v-for="(section, index) in event.sections" :key="section.title || index" class="activity-detail-section"><h2 v-if="section.title">{{ section.title }}</h2><div v-if="section.image" class="activity-detail-image-copy" :class="{ 'activity-detail-image-copy-stacked': section.imageLayout === 'stacked' }"><figure class="activity-detail-figure" :class="{ 'activity-detail-figure-plain': section.imagePlain }"><img :src="section.image" :alt="section.imageAlt || section.title" loading="lazy"></figure><div class="activity-detail-copy"><h3 v-if="section.subheading">{{ section.subheading }}</h3><p v-for="paragraph in section.paragraphs" :key="paragraph"><strong v-if="section.boldParagraphs">{{ paragraph }}</strong><template v-else>{{ paragraph }}</template></p></div></div><template v-else><h3 v-if="section.subheading">{{ section.subheading }}</h3><p v-for="paragraph in section.paragraphs" :key="paragraph"><strong v-if="section.boldParagraphs">{{ paragraph }}</strong><template v-else>{{ paragraph }}</template></p><h3 v-if="section.itemsHeading">{{ section.itemsHeading }}</h3><ul v-if="section.items" class="activity-detail-list"><li v-for="item in section.items" :key="item.title"><strong v-if="item.title">{{ item.title }}：</strong>{{ item.text }}</li></ul><p v-for="paragraph in section.closingParagraphs" :key="paragraph">{{ paragraph }}</p><div v-for="group in section.groups" :key="group.title" class="activity-detail-subsection"><h3>{{ group.title }}</h3><p v-for="paragraph in group.paragraphs" :key="paragraph">{{ paragraph }}</p></div></template></section></article>
        <section class="activity-detail-contact"><div class="section-wrap"><span class="eyebrow">JOIN &amp; ASK</span><h2>法會參與與洽詢</h2><p>場次、登記與參與方式請以佛堂最新公告為準。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問 <span aria-hidden="true">↗</span></a><RouterLink class="button button-outline" to="/activities">回到法會活動</RouterLink></div></section>
      </div>
    `,
  };

  const TestimonialsPage = {
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">TESTIMONIALS</span><h1>見證分享</h1><p>記錄與達拉度母佛堂結緣的故事與修持點滴。</p></section>
        <section class="section-wrap testimonials-content"><div class="testimonials-empty"><span aria-hidden="true">✦</span><h2>見證分享文章</h2><p>文章內容將陸續整理刊載，敬請期待。</p></div></section>
      </div>
    `,
  };

  const VisitPage = {
    data: () => ({ config }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">VISIT &amp; CONTACT</span><h1>交通與聯絡</h1><p>參訪前可先透過官方 LINE 詢問安排。</p></section>
        <section class="section-wrap visit-layout">
          <div class="visit-details"><span class="eyebrow">佛堂位置</span><h2>歡迎蒞臨</h2><address>{{ config.address }}</address><div class="transport-info"><h3>交通資訊</h3><p><strong>捷運：</strong>板南線「忠孝敦化站」1 號出口。</p><p><strong>公車：</strong>「捷運忠孝敦化站」步行約 1 分鐘；「忠孝敦化路口」步行約 3 分鐘。</p><p>頂呱呱忠孝店旁，羅馬大廈 8 樓。</p></div><p>參訪安排與交通問題，歡迎先透過 LINE 詢問。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問參訪方式 <span aria-hidden="true">↗</span></a><a class="map-open-link" :href="config.links.map" target="_blank" rel="noopener noreferrer">在 Google 地圖開啟 <span aria-hidden="true">↗</span></a></div>
          <div class="map-frame"><iframe :src="config.mapEmbedUrl" title="達拉 TARA 位置地圖" width="600" height="450" style="border:0" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
        </section>
        <section class="section-wrap contact-section"><div class="contact-heading"><span class="eyebrow">OFFICIAL ACCOUNTS</span><h2>官方聯絡與社群</h2></div><nav class="social-links" aria-label="官方聯絡與社群">
          <a :href="config.links.line" target="_blank" rel="noopener noreferrer"><span class="social-link-icon" aria-hidden="true"><svg class="social-icon" viewBox="0 0 24 24"><path d="M12 3C6.7 3 2.5 6.4 2.5 10.6c0 3.7 3.3 6.7 7.8 7.4.3.1.7.2.8.5.1.2 0 .6 0 .8l-.1.8c0 .2-.2.8.7.4s5.1-3 7-5.2c1.3-1.4 2.3-3.1 2.3-4.7C21 6.4 17.1 3 12 3z"/><path class="social-icon-cutout" d="M7.2 9h1v3.4h-1zm2.1 0h1l1.5 2v-2h1v3.4h-.9l-1.6-2.1v2.1h-1zm4.4 0h2.8v.9h-1.8v.4h1.6v.8h-1.6v.5h1.8v.8h-2.8z"/></svg></span>詢問請供與參訪方式 <b aria-hidden="true">↗</b></a>
          <a :href="config.links.facebook" target="_blank" rel="noopener noreferrer"><span class="social-link-icon" aria-hidden="true"><svg class="social-icon" viewBox="0 0 24 24"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4z"/></svg></span>Facebook 官方粉專 <b aria-hidden="true">↗</b></a>
          <a :href="config.links.instagram" target="_blank" rel="noopener noreferrer"><span class="social-link-icon" aria-hidden="true"><svg class="social-icon social-icon-instagram" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.7" cy="6.7" r="1.2"/></svg></span>Instagram 官方帳號 <b aria-hidden="true">↗</b></a>
          <a :href="config.links.youtube" target="_blank" rel="noopener noreferrer"><span class="social-link-icon" aria-hidden="true"><svg class="social-icon" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path class="social-icon-cutout" d="m10 9 5 3-5 3z"/></svg></span>YouTube 官方頻道 <b aria-hidden="true">↗</b></a>
        </nav></section>
      </div>
    `,
  };

  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: '/', component: HomePage },
      { path: '/about', component: AboutPage },
      { path: '/teachers/:slug', component: TeacherDetailPage, props: true },
      { path: '/offerings', component: OfferingsPage },
      { path: '/offerings/:slug', component: OfferingDetailPage, props: true },
      { path: '/activities', component: ActivitiesPage },
      { path: '/activities/:slug', component: ActivityDetailPage, props: true },
      { path: '/testimonials', component: TestimonialsPage },
      { path: '/visit', component: VisitPage },
    ],
    scrollBehavior: () => ({ top: 0 }),
  });

  createApp({ components: { SiteHeader, SiteFooter, RouterView }, template: '<SiteHeader /><main><RouterView /></main><SiteFooter />' })
    .use(router)
    .mount('#app');

  if ('IntersectionObserver' in window && 'MutationObserver' in window) {
    const appRoot = document.querySelector('#app');
    const revealSelector = 'header.site-header, main section, main article, main figure, main .center-card, main .home-ad-placeholder, main .offering-topic, main .offering-item-card, main .activity-card, main .activity-event-card, main .home-teacher-photo, main .welcome-copy, main .offerings-band-copy, main .tara-element-card, main .deity-copy-card, footer.site-footer';
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.04, rootMargin: '0px 0px -24px 0px' });
    const observeRevealItems = () => {
      appRoot.querySelectorAll(revealSelector).forEach((element) => {
        if (element.classList.contains('scroll-reveal')) return;
        element.classList.add('scroll-reveal');
        revealObserver.observe(element);
      });
    };
    let revealFrame = 0;
    const scheduleRevealItems = () => {
      if (revealFrame) cancelAnimationFrame(revealFrame);
      revealFrame = requestAnimationFrame(() => {
        revealFrame = 0;
        observeRevealItems();
      });
    };
    const revealMutationObserver = new MutationObserver(scheduleRevealItems);
    revealMutationObserver.observe(appRoot, { childList: true, subtree: true });
    observeRevealItems();
  }
})();
