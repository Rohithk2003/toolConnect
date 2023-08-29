import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

export default function RenderInfo({ headingText, text }) {
  return (
    <>
      <main>
        <div className="text-white bg-black mb-auto h-max">
          <div className="mx-8 max-w-2xl py-44 sm:mx-auto">
            <h1 className="text-white font-[Inter] font-bold text-5xl mb-5">
              {headingText}
            </h1>
            <p className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-gray-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-8">
              {text}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
