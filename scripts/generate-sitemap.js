import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import fs from "fs";
import path from "path";


/* ==========================================
   FIREBASE CONFIG
========================================== */

const firebaseConfig = {

  apiKey:
    "AIzaSyB_GVo_krJ2SyHpkhMe__vSBD9t_8f38VE",

  authDomain:
    "matkanews-79fb7.firebaseapp.com",

  projectId:
    "matkanews-79fb7",

  storageBucket:
    "matkanews-79fb7.firebasestorage.app",

  messagingSenderId:
    "847989358715",

  appId:
    "1:847989358715:web:546b01dc43c6c3a639e2de",

};


/* ==========================================
   INITIALIZE FIREBASE
========================================== */

const app =
  initializeApp(firebaseConfig);


const db =
  getFirestore(app);


/* ==========================================
   WEBSITE URL
========================================== */

const BASE_URL =
  "https://matka.news";


/* ==========================================
   GENERATE SITEMAP
========================================== */

async function generateSitemap() {

  try {

    console.log(
      "Fetching markets from Firestore..."
    );


    const marketsQuery =
      query(
        collection(db, "markets"),
        orderBy("displayOrder")
      );


    const snapshot =
      await getDocs(marketsQuery);


    const urls = [];


    /* ======================================
       HOME PAGE
    ====================================== */

    urls.push({

      loc:
        `${BASE_URL}/`,

      priority:
        "1.0",

      changefreq:
        "daily",

    });


    /* ======================================
       MARKET PAGES
    ====================================== */

    snapshot.forEach((doc) => {

      const market =
        doc.data();


      const slug =
        market.slug;


      /* Skip invalid markets */

      if (!slug) {

        console.log(
          `Skipping market ${doc.id}: No slug`
        );

        return;

      }


      /* MARKET HOME */

      urls.push({

        loc:
          `${BASE_URL}/market/${slug}`,

        priority:
          "0.9",

        changefreq:
          "daily",

      });


      /* JODI CHART */

      urls.push({

        loc:
          `${BASE_URL}/market/${slug}/jodi-chart`,

        priority:
          "0.8",

        changefreq:
          "daily",

      });


      /* PANEL CHART */

      urls.push({

        loc:
          `${BASE_URL}/market/${slug}/panel-chart`,

        priority:
          "0.8",

        changefreq:
          "daily",

      });

    });


    /* ======================================
       CREATE XML
    ====================================== */

    const sitemapUrls =
      urls.map((url) => {

        return `

  <url>

    <loc>${url.loc}</loc>

    <changefreq>${url.changefreq}</changefreq>

    <priority>${url.priority}</priority>

  </url>`;

      }).join("");


    const sitemap =

`<?xml version="1.0" encoding="UTF-8"?>

<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>

${sitemapUrls}

</urlset>`;


    /* ======================================
       SAVE SITEMAP
    ====================================== */

    const outputPath =
      path.resolve(
        "public",
        "sitemap.xml"
      );


    fs.writeFileSync(
      outputPath,
      sitemap.trim()
    );


    console.log(
      "✅ Sitemap generated successfully!"
    );


    console.log(
      `✅ Total URLs: ${urls.length}`
    );


    console.log(
      `📍 Saved to: ${outputPath}`
    );


    process.exit(0);


  } catch (error) {

    console.error(
      "❌ Sitemap generation failed:",
      error
    );


    process.exit(1);

  }

}


generateSitemap();