import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const sidebarNav = [
  { label: "Overview", link: "#overview" },
  { label: "Features", link: "#features" },
  { label: "File Format Requirements", link: "#file-format-requirements" },
  { label: "How It Works", link: "#how-it-works" },
  { label: "Security Measures", link: "#security-measures" },
  { label: "Testing & Performance", link: "#testing--performance" },
  { label: "API", link: "#api" },
  { label: "Deployment", link: "#deployment" },
  { label: "Reporting Format", link: "#reporting-format" },
  { label: "Contribution & Maintenance", link: "#contribution--maintenance" },
  { label: "Support & Questions", link: "#support--questions" },
];

function stripTitleAndToc(md: string): string {
  // Remove the first H1 and everything up to the first H2 (Overview)
  // This assumes the doc starts with # Title, then --- and TOC, then --- and ## Overview
  const overviewIdx = md.toLowerCase().indexOf('## overview');
  if (overviewIdx !== -1) {
    return md.slice(overviewIdx);
  }
  return md;
}

const Docs: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("/DOCUMENTATION.md")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load documentation");
        return res.text();
      })
      .then((md) => setMarkdown(stripTitleAndToc(md)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      {/* Top Bar */}
      <div className="flex items-center bg-white px-6 py-4 shadow z-10 border-b border-gray-200">
        <img src="/placeholder.svg" alt="Logo" className="h-10 w-10 mr-3" />
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight">Account Guardian Docs</span>
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-white/90 border-r border-gray-200 p-8 hidden md:block overflow-y-auto min-h-full">
          <nav>
            <ul className="space-y-2">
              {sidebarNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.link}
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 text-base font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex justify-center items-start py-10 px-2 md:px-8 bg-transparent">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            {error && <div className="text-red-500">Error: {error}</div>}
            {!markdown && !error && <div>Loading documentation...</div>}
            {markdown && (
              <article className="prose prose-blue max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    hr: () => <hr className="my-14 border-t-2 border-gray-200" />,
                    h2: ({children, ...props}) => (
                      <h2 className="mt-14 mb-6 text-3xl font-extrabold text-blue-800 tracking-tight border-b border-gray-100 pb-2" {...props}>{children}</h2>
                    ),
                    h3: ({children, ...props}) => (
                      <h3 className="mt-10 mb-4 text-2xl font-bold text-blue-700 tracking-tight" {...props}>{children}</h3>
                    ),
                    ul: ({children, ...props}) => (
                      <ul className="list-disc pl-6 space-y-2 marker:text-blue-500" {...props}>{children}</ul>
                    ),
                    ol: ({children, ...props}) => (
                      <ol className="list-decimal pl-6 space-y-2 marker:text-blue-500" {...props}>{children}</ol>
                    ),
                    li: ({children, ...props}) => (
                      <li className="mb-1 text-gray-800" {...props}>{children}</li>
                    ),
                    table: ({children, ...props}) => (
                      <table className="my-8 w-full border-collapse rounded-lg overflow-hidden" {...props}>{children}</table>
                    ),
                    thead: ({children, ...props}) => (
                      <thead className="bg-blue-50" {...props}>{children}</thead>
                    ),
                    th: ({children, ...props}) => (
                      <th className="px-4 py-2 text-left font-semibold text-blue-900" {...props}>{children}</th>
                    ),
                    td: ({children, ...props}) => (
                      <td className="px-4 py-2 bg-blue-50 text-blue-900" {...props}>{children}</td>
                    ),
                    pre: ({children, ...props}) => (
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-8" {...props}>{children}</pre>
                    ),
                    code: ({inline, className, children, ...props}: {inline?: boolean, className?: string, children: React.ReactNode}) =>
                      inline ? (
                        <code className="bg-gray-100 text-blue-700 rounded px-1 py-0.5" {...props}>{children}</code>
                      ) : (
                        <code {...props}>{children}</code>
                      ),
                    a: ({node, ...props}) => <a {...props} className="text-blue-700 underline hover:text-blue-900" />,
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </article>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs; 