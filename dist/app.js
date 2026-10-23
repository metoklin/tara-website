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
    { image: './images/mantra-banner.png', title: '加持咒輪圖' },
    { image: './images/smoke-offering-banner.png', title: '煙供除障粉' },
    { image: './images/offering-other-cover.png', title: '其他結緣品' },
  ];

  const SiteHeader = {
    components: { RouterLink },
    data: () => ({ config, navItems }),
    template: `
      <header class="site-header">
        <RouterLink class="brand" to="/" aria-label="TARA達拉 首頁">
          <img src="./images/tara-logo.png" alt="TARA 標誌">
          <span><strong>TARA</strong>達拉</span>
        </RouterLink>
        <nav class="main-nav" aria-label="主要導覽">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" exact-active-class="is-active"><span class="main-nav-zh">{{ item.label }}</span><span class="main-nav-en">{{ item.en }}</span></RouterLink>
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
          <a :href="config.links.facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4z"/></svg></a>
          <a :href="config.links.line" target="_blank" rel="noopener noreferrer" aria-label="LINE"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.7 3 2.5 6.4 2.5 10.6c0 3.7 3.3 6.7 7.8 7.4.3.1.7.2.8.5.1.2 0 .6 0 .8l-.1.8c0 .2-.2.8.7.4s5.1-3 7-5.2c1.3-1.4 2.3-3.1 2.3-4.7C21 6.4 17.1 3 12 3z"/><path class="social-icon-cutout" d="M7.2 9h1v3.4h-1zm2.1 0h1l1.5 2v-2h1v3.4h-.9l-1.6-2.1v2.1h-1zm4.4 0h2.8v.9h-1.8v.4h1.6v.8h-1.6v.5h1.8v.8h-2.8z"/></svg></a>
          <a :href="config.links.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.7" cy="6.7" r="1.2"/></svg></a>
        </nav>
        <span class="footer-note">網站內容由佛堂提供</span>
      </footer>
    `,
  };

  const HomePage = {
    data: () => ({ config, offeringCoverSlides, activeOfferingCover: 0, offeringCoverTimer: null }),
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
          <img class="welcome-mark" src="./images/tara-logo.png" alt="TARA 標誌">
          <div class="welcome-copy">
            <span class="eyebrow">認識佛堂</span>
            <h2>一處可以慢慢認識的佛堂</h2>
            <p>佛堂沿革、理念與參訪資訊，將依佛堂提供的資料整理刊載。</p>
            <RouterLink class="text-link" to="/about">閱讀佛堂介紹 <span aria-hidden="true">→</span></RouterLink>
          </div>
          <figure class="welcome-photo">
            <img src="./images/guanyin-shrine.jpg" alt="佛堂供奉的主尊觀世音菩薩">
            <figcaption>佛堂主尊觀世音菩薩</figcaption>
          </figure>
        </section>

        <section class="home-teacher section-wrap">
          <div class="home-teacher-photo"><img src="./images/jiacha-rinpoche.jpg" alt="白玉祖古嘉察仁波切"></div>
          <div class="home-teacher-copy"><span class="eyebrow">VAJRAYANA MASTER</span><h2>尊貴上師</h2><p>白玉祖古嘉察徹滇多傑仁波切，白玉傳承第二任法座持有者貝瑪倫珠嘉措之轉世。</p><RouterLink class="text-link" to="/teachers/jiacha-rinpoche">認識上師 <span aria-hidden="true">→</span></RouterLink></div>
        </section>

        <section class="home-teacher home-teacher-reverse section-wrap">
          <div class="home-teacher-photo"><img src="./images/chen-min-teacher.jpg" alt="神諭度母陳敏老師"></div>
          <div class="home-teacher-copy"><span class="eyebrow">ORACLE TARA</span><h2>神諭度母</h2><p>陳敏老師成立達拉度母佛堂，帶領法會共修並定期安排心靈成長課程。</p><RouterLink class="text-link" to="/teachers/oracle-tara">認識神諭度母 <span aria-hidden="true">→</span></RouterLink></div>
        </section>

        <section class="offerings-band home-center-promo">
          <div class="section-wrap offerings-band-inner">
            <div class="offerings-band-copy">
              <h2>文字待定</h2>
              <RouterLink class="button button-blue" to="/offerings">瀏覽結緣品 <span aria-hidden="true">→</span></RouterLink>
            </div>
            <div class="offerings-band-gallery" aria-hidden="true"></div>
          </div>
        </section>

        <svg class="center-logo-filter-defs" aria-hidden="true" focusable="false"><filter id="center-logo-blue" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.356863 0 0 0 0 0.568627 -1 -1 -1 0 2.9" /></filter></svg>
        <section class="home-centers">
          <div class="section-wrap"><div class="home-section-heading"><span class="eyebrow">TAIWAN CENTER</span><h2>北中南中心</h2></div>
            <div class="center-grid">
              <article class="center-card"><div class="center-logo-frame"><img class="center-logo" src="./images/center-taipei.jpg" alt="Taipei Center 標誌"></div><h3>Taipei Center</h3></article>
              <article class="center-card"><div class="center-logo-frame"><img class="center-logo" src="./images/center-taichung.jpg" alt="Taichung Center 標誌"></div><h3>Taichung Center</h3></article>
              <article class="center-card"><div class="center-logo-frame"><img class="center-logo" src="./images/center-kaohsiung.jpg" alt="Kaohsiung Center 標誌"></div><h3>Kaohsiung Center</h3></article>
            </div>
          </div>
        </section>

        <section class="offerings-band home-center-promo">
          <div class="section-wrap offerings-band-inner">
            <div class="offerings-band-copy">
              <h2>文字待定</h2>
              <RouterLink class="button button-blue" to="/offerings">瀏覽結緣品 <span aria-hidden="true">→</span></RouterLink>
            </div>
            <div class="offerings-band-gallery" aria-hidden="true"></div>
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

        <section class="home-advertising section-wrap" aria-label="廣告版位">
          <div class="home-ad-placeholder">廣告版位 1</div>
          <div class="home-ad-placeholder">廣告版位 2</div>
          <div class="home-ad-placeholder">廣告版位 3</div>
        </section>

        <section class="offerings-band">
          <div class="section-wrap offerings-band-inner">
            <div class="offerings-band-copy">
              <span class="eyebrow">結緣品</span>
              <h2>加持結緣品</h2>
              <p>達拉佛堂殊勝法寶與結緣品</p>
              <RouterLink class="button button-blue" to="/offerings">瀏覽結緣品 <span aria-hidden="true">→</span></RouterLink>
            </div>
            <div class="offerings-band-gallery" aria-label="結緣品總覽封面輪播">
              <RouterLink class="offerings-band-cover" to="/offerings" :aria-label="'瀏覽結緣品：' + offeringCoverSlides[activeOfferingCover].title">
                <img :key="offeringCoverSlides[activeOfferingCover].image" :src="offeringCoverSlides[activeOfferingCover].image" :alt="offeringCoverSlides[activeOfferingCover].title" loading="lazy">
              </RouterLink>
            </div>
          </div>
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
          <div class="about-note"><span class="eyebrow">佛堂介紹</span><h2>關於達拉 TARA</h2><p>「達拉」是梵文 Tara 的音譯，意為度母。佛堂沿革與平日活動資訊，將依佛堂提供的資料整理刊載。</p><div class="content-note"><span aria-hidden="true">✦</span> 佛堂沿革資料待補</div></div>
        </section>
        <section class="mandala-intro section-wrap">
          <div class="mandala-copy"><span class="eyebrow">THE MANDALA</span><h2>壇城配置與色彩</h2><p>佛堂壇城依五行木、火、土、金、水相生的原理，並按東、南、西、北、中方位規劃；壇城周圍以白、黃、紅、藍、綠五色區隔。</p><div class="mandala-colors" aria-label="壇城使用的五種顏色"><span><i class="color-white"></i>白</span><span><i class="color-yellow"></i>黃</span><span><i class="color-red"></i>紅</span><span><i class="color-blue"></i>藍</span><span><i class="color-green"></i>綠</span></div></div>
          <div class="mandala-main-deities"><span class="eyebrow">主壇城供奉</span><h3>觀音度母三尊</h3><p>主尊為觀世音菩薩，左右兩側分別為綠度母與白度母。</p></div>
        </section>
        <section class="about-banner">
          <div class="section-wrap about-banner-inner"><div><span class="eyebrow">壇城主尊</span><h2>觀音度母三尊</h2><p>主尊為觀世音菩薩，左右兩側分別為綠度母與白度母。</p></div><img src="./images/guanyin-detail.jpg" alt="觀世音菩薩聖像細節"></div>
        </section>
      </div>
    `,
  };

  const TeacherDetailPage = {
    props: ['slug'],
    data: () => ({
      profiles: {
        'jiacha-rinpoche': {
          eyebrow: 'VAJRAYANA MASTER', title: '尊貴上師', name: '白玉祖古嘉察仁波切', lineage: '白玉傳承', image: './images/jiacha-rinpoche.jpg', alt: '白玉祖古嘉察仁波切照片',
          paragraphs: [
            '尊貴的祖古嘉察徹滇多傑仁波切，出身於昆氏血脈、瓦述土司世系的巴納阿涅家族。尊貴的依怙主圖松法王認定仁波切為蓮花生大士二十五位親傳弟子之一「索波拉巴」的殊勝化身，亦為白玉傳承第二任法座持有者貝瑪倫珠嘉措之轉世。',
            '仁波切自幼接受佛法啟蒙，後前往印度南卓林寺研習佛法，並依止貝諾法王為根本上師，領受寧瑪派教傳與伏藏法門的灌頂、口傳、教授及大圓滿甚深教法。貝諾法王並派遣仁波切來臺弘揚佛法。',
            '仁波切長期精進實修，曾多次閉關，以寧瑪派三根本為核心持續修持；並隨順弟子的根器與意樂開展佛法事業，同時投入社會服務與慈善利生工作。',
          ],
        },
        'oracle-tara': {
          eyebrow: 'ORACLE TARA', title: '神諭度母', name: '陳敏老師', lineage: '達拉度母佛堂', image: './images/chen-min-teacher.jpg', alt: '神諭度母陳敏老師照片',
          paragraphs: [
            '陳敏老師自幼接觸佛法，秉持慈悲利他的心，投入志工服務與慈善工作，追隨嘉察仁波切的弘法事業。',
            '老師於 2012 年成立「達拉度母佛堂」，主尊為觀音度母三尊，以「達拉度母、滿願眾生」為理念，希望引導有緣大眾親近度母。',
            '目前除每週帶領法會共修，也定期安排心靈成長課程。',
          ],
        },
      },
    }),
    computed: { teacher() { return this.profiles[this.slug] || this.profiles['jiacha-rinpoche']; } },
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">{{ teacher.eyebrow }}</span><h1>{{ teacher.title }}</h1></section>
        <section class="section-wrap teacher-detail"><div class="teacher-detail-photo"><img :src="teacher.image" :alt="teacher.alt"></div><article class="teacher-detail-copy"><span class="eyebrow">{{ teacher.lineage }}</span><h2>{{ teacher.name }}</h2><p v-for="(paragraph, index) in teacher.paragraphs" :key="index">{{ paragraph }}</p></article></section>
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
        { name: '其他結緣品', description: '包含西藏手工八吉祥臥香爐，以及多款本尊主題手環與項鍊。', items: [
          { name: '西藏手工八吉祥臥香爐', images: [
            { src: './images/offering-incense-burner-front.png', alt: '西藏手工八吉祥臥香爐正面' },
            { src: './images/offering-incense-burner-detail.png', alt: '西藏手工八吉祥臥香爐使用情境' },
          ], description: '西藏手工製八吉祥臥香爐，提供不同尺寸。' },
          { name: '息 金剛薩埵運動手環', image: './images/tara-p04-01.jpg', description: '以金剛薩埵為主題的日常手環；佛堂舊站附有相關心咒介紹。' },
          { name: '增 黃財神運動手環', image: './images/tara-p04-02.jpg', description: '以黃財神為主題的日常手環；佛堂舊站附有相關心咒介紹。' },
          { name: '懷 咕嚕咕咧佛母運動手環', image: './images/tara-p04-03.jpg', description: '以咕嚕咕咧佛母為主題的日常手環；佛堂舊站附有相關心咒介紹。' },
          { name: '誅 金剛手菩薩運動手環', image: './images/tara-p04-04.jpg', description: '以金剛手菩薩為主題的日常手環；佛堂舊站附有相關心咒介紹。' },
          { name: '圓滿 綠度母運動手環', image: './images/tara-p04-05.jpg', description: '以綠度母為主題的日常手環；佛堂舊站附有相關心咒介紹。' },
          { name: '長壽佛運動手環', image: './images/tara-p04-06.jpg', description: '以長壽佛為主題的日常手環；佛堂舊站附有相關心咒介紹。' },
          { name: '度母五色圓滿手環及佛卡', image: './images/tara-p05-01.jpg', description: '五色度母主題手環與佛卡組合。' },
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
        { to: '/offerings/mug', eyebrow: 'TARA MUG', title: '聚財滿願杯', image: './images/offering-mug-garden.jpg', description: '查看達拉 TARA 主題隨行杯介紹。' },
      ],
    }),
    template: `
      <div>
        <section class="page-intro"><span class="eyebrow">OFFERINGS</span><h1>加持結緣品</h1><p>達拉佛堂殊勝法寶及聖物</p></section>
        <section class="section-wrap offering-topics" aria-label="結緣品專題介紹">
          <div class="offering-topic-grid">
            <RouterLink v-for="topic in topics" :key="topic.to" :to="topic.to" class="offering-topic-card">
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
          previous: { title: '加持咒輪圖', to: '/offerings/mantra-diagrams' }, next: null,
        },
        other: {
          title: '其他結緣品', category: '其他結緣品', eyebrow: 'OTHER OFFERINGS', image: './images/offering-other-cover.png',
          lead: '西藏手工八吉祥臥香爐，以及多款本尊主題手環與項鍊。',
          sections: [],
          previous: null, next: { title: '聚財滿願杯', to: '/offerings/mug' },
        },
        mug: {
          title: '聚財滿願杯', eyebrow: 'TARA MUG', image: './images/offering-mug-garden.jpg',
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
          <section v-if="slug !== 'mantra-diagrams' && displayItems.length" class="offering-detail-products"><div class="offering-detail-section-heading"><span class="eyebrow">BROWSE ITEMS</span><h2>{{ detail.category === '嘎屋' ? '本尊嘎嗚' : detail.title + '品項' }}</h2></div>
            <ul class="offering-grid">
              <li v-for="item in displayItems" :key="item.name" class="offering-item" :class="{ 'offering-item--no-image': !item.image && !(item.images && item.images.length) }">
                <div class="offering-image" :class="{ 'offering-image-gallery': item.images && item.images.length > 1 }">
                  <img v-if="item.image" :src="item.image" :alt="item.name" loading="lazy">
                  <div v-else-if="item.images && item.images.length" class="offering-carousel" @mouseenter="pauseCarousel(item, true)" @mouseleave="pauseCarousel(item, false)" :aria-label="item.name + '照片輪播'"><img :src="item.images[carouselIndex(item)].src" :alt="item.images[carouselIndex(item)].alt || item.name" loading="lazy"></div>
                </div>
                <div class="offering-item-copy"><h3 class="offering-name">{{ item.name }}</h3><p v-if="item.description" class="offering-item-description">{{ item.description }}</p><div v-if="item.more && item.more.length" class="offering-item-details"><div class="offering-item-details-panel" :class="{ 'is-open': expandedDetails[item.name] }" :aria-hidden="!expandedDetails[item.name]"><div class="offering-item-details-inner"><p v-for="(paragraph, index) in item.more" :key="'more' + index">{{ paragraph }}</p></div></div><button type="button" class="offering-item-details-toggle" :aria-expanded="!!expandedDetails[item.name]" @click="toggleItemDetails(item.name)">功德利益 <span aria-hidden="true" :class="{ 'is-open': expandedDetails[item.name] }">⌄</span></button></div></div>
              </li>
            </ul>
          </section>
        </article>
        <nav class="section-wrap offering-detail-pager" aria-label="專題頁面導覽"><RouterLink class="button button-blue" to="/offerings">← 回到總覽頁</RouterLink><RouterLink v-if="detail.next" class="button button-blue offering-detail-next" :to="detail.next.to">{{ detail.next.title }} →</RouterLink></nav>
        <section class="offering-detail-contact"><div class="section-wrap"><span class="eyebrow">QUESTIONS &amp; OFFERINGS</span><h2>請供與品項資訊</h2><p>品項與請供狀態可能更新，請先透過官方 LINE 詢問。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問 <span aria-hidden="true">↗</span></a></div></section>
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
          <div class="visit-details"><span class="eyebrow">佛堂位置</span><h2>歡迎蒞臨</h2><address>{{ config.address }}</address><div class="transport-info"><h3>交通資訊</h3><p><strong>捷運：</strong>板南線「忠孝敦化站」1 號出口。</p><p><strong>公車：</strong>「捷運忠孝敦化站」步行約 1 分鐘；「忠孝敦化路口」步行約 3 分鐘。</p><p>頂呱呱忠孝店旁，羅馬大廈 8 樓。</p></div><p>參訪安排與交通問題，歡迎先透過 LINE 詢問。</p><a class="button button-blue" :href="config.links.line" target="_blank" rel="noopener noreferrer">LINE 詢問參訪方式 <span aria-hidden="true">↗</span></a><a class="map-open-link" :href="config.links.map" target="_blank" rel="noopener noreferrer">在 Google 地圖開啟 <span aria-hidden="true">↗</span></a></div>
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
      { path: '/teachers/:slug', component: TeacherDetailPage, props: true },
      { path: '/offerings', component: OfferingsPage },
      { path: '/offerings/:slug', component: OfferingDetailPage, props: true },
      { path: '/activities', component: ActivitiesPage },
      { path: '/visit', component: VisitPage },
    ],
    scrollBehavior: () => ({ top: 0 }),
  });

  createApp({ components: { SiteHeader, SiteFooter, RouterView }, template: '<SiteHeader /><main><RouterView /></main><SiteFooter />' })
    .use(router)
    .mount('#app');
})();
