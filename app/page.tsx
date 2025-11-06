"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setEmail("");
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ text: "An error occurred during subscription.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Head>
        <title>Analytics App - Coming Soon</title>
        <meta name="description" content="Analytics App - Pre-launch page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold">Zewd AI</h1>
          <nav>
            <a href="#features" className="text-lg hover:text-gray-400">
              Features
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-5xl font-bold mb-4">
            Crown Your Decisions with Your Data
          </h2>
          <p className="text-xl mb-8">
            Get ready for a revolutionary way to analyze your data.
          </p>

          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
              className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded-r-md transition-colors duration-200`}
            >
              {loading ? "Submitting..." : "Notify Me"}
            </button>
          </form>

          {/* ✅ Inline Success/Error Message */}
          {message.text && (
            <p
              className={`mt-4 text-sm ${
                message.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h3 className="text-4xl font-bold text-center mb-12">
            What to Expect
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-2xl font-bold mb-2">Pre-built Dashboards</h4>
              <p>
                Access a wide range of pre-built dashboards based on publicly
                available datasets. Get insights instantly without any setup.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-2xl font-bold mb-2">Analyst Agent</h4>
              <p>
                An AI-powered agent that generates insights for you. Ask
                questions in natural language and get answers in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-white/10">
          <p>&copy; 2025 Analytics App. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;



// "use client";

// import type { NextPage } from "next";
// import Head from "next/head";
// import { useState } from "react";

// const Home: NextPage = () => {
//   const [email, setEmail] = useState("");

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         setEmail('');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert('An error occurred during subscription.');
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white">
//       <Head>
//         <title>Analytics App - Coming Soon</title>
//         <meta
//           name="description"
//           content="Analytics App - Pre-launch page"
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="container mx-auto px-4">
//         {/* Header */}
//         <header className="flex justify-between items-center py-6">
//           <h1 className="text-3xl font-bold">Analytics App</h1>
//           <nav>
//             <a href="#features" className="text-lg hover:text-gray-400">
//               Features
//             </a>
//           </nav>
//         </header>

//         {/* Hero Section */}
//         <section className="text-center py-20">
//           <h2 className="text-5xl font-bold mb-4">
//             The Future of Data Analytics is Coming
//           </h2>
//           <p className="text-xl mb-8">
//             Get ready for a revolutionary way to analyze your data.
//           </p>
//           <form onSubmit={handleSubmit} className="flex justify-center">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={handleEmailChange}
//               className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
//             >
//               Notify Me
//             </button>
//           </form>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="py-20">
//           <h3 className="text-4xl font-bold text-center mb-12">
//             What to Expect
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h4 className="text-2xl font-bold mb-2">Pre-built Dashboards</h4>
//               <p>
//                 Access a wide range of pre-built dashboards based on publicly
//                 available datasets. Get insights instantly without any setup.
//               </p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h4 className="text-2xl font-bold mb-2">Analyst Agent</h4>
//               <p>
//                 An AI-powered agent that generates insights for you. Ask
//                 questions in natural language and get answers in seconds.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="text-center py-6">
//           <p>&copy; 2025 Analytics App. All rights reserved.</p>
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default Home;
