import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return(
            <Html lang="en">
                <Head>
                    <link rel="preload" href="/fonts/IBMPlexSans-Bold.ttf" as="font" crossOrigin="anonymous" />
                    <link rel="preload" href="/fonts/IBMPlexSans-Regular.ttf" as="font" crossOrigin="anonymous" />
                    <link rel="preload" href="/fonts/IBMPlexSans-SemiBold.ttf" as="font" crossOrigin="anonymous" />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript />
                </body>
            </Html>
        )
    }

} 
 
export default MyDocument;