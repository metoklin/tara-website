# 達拉 TARA 靜態網站

網站本體位於 `dist/`，直接以靜態檔案執行，不需安裝 Node.js、npm 或建置工具。可直接開啟 `dist/index.html` 預覽；導覽使用網址雜湊（例如 `#/about`）。

## 修改位置

- `dist/app.js`：頁面文字與 Vue Router 路由。
- `dist/styles.css`：原生 CSS 樣式。
- `dist/config.js`：公開的地址、地圖嵌入網址、Facebook、LINE、Instagram 連結。
- `dist/images/`：Logo 與佛堂照片。
- `dist/vendor/`：本機保存的 Vue 與 Vue Router Global Build。

`config.js` 會下載到每位訪客的瀏覽器，只能放公開資訊。不要在其中放 Secret、私人 API 金鑰或密碼。此版本沒有呼叫外部資料 API，因此沒有加入 `fetch()` 或 Axios；如日後需要 HTTP API，使用瀏覽器原生 `fetch()`。

## ChatGPT Sites

`.openai/hosting.json` 將 Sites 靜態目錄設為 `dist`。部署時提交 `dist/` 中的靜態檔案；不需執行 build。
