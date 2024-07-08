"use client";
import { AppProvider } from "@/providers/AppProvider";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q0WLFNDGB0"
        ></script>

        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q0WLFNDGB0');
          `}
        </script> */}

        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <AppProvider>{children}</AppProvider>
      </body>
      <GoogleAnalytics gaId={process.env["NEXT_PUBLIC_GA_ID"]} />
    </html>
  );
}
