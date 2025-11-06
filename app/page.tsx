"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Crown, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

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
        <title>Zewd AI - Coming Soon</title>
        <meta
          name="description"
          content="Zewd AI — Ethiopia's first business intelligence and data analytics platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          {/* Left Section: Logo + Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center text-blue-400">
              <Crown className="w-7 h-7" />
            </Link>
            <Link href="/" className="flex items-center">
              <span className="text-lg sm:text-xl md:text-2xl font-medium">
                <span className="text-white">Zewd</span>
                <span className="text-blue-400 font-bold">AI</span>
              </span>
            </Link>
          </div>

          {/* Right Section: Nav Links */}
          <nav>
            <a href="#features" className="text-lg hover:text-gray-400 transition-colors">
              Features
            </a>
          </nav>
        </header>

        {/* Hero Section - Centered with custom styling */}
        <section className="text-center py-32 flex flex-col justify-center items-center min-h-[70vh]">
          <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700 delay-100 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">
              Know More
            </span>
            <span className="bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-1 sm:mb-2">
              Decide Smarter
            </span>
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">
              With Zewd AI
            </span>
          </h1>

          <p className="text-md sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-in slide-in-from-bottom duration-700 delay-200 leading-relaxed">
            The premier AI-powered data platform for navigating Ethiopia's
            economic landscape. We deliver the critical intelligence that
            business leaders, investors, and analysts trust.
          </p>

          <form onSubmit={handleSubmit} className="flex justify-center w-full max-w-md animate-in slide-in-from-bottom duration-700 delay-300">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
              className="bg-gray-800 text-white px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 flex-grow border border-gray-700"
            />
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 py-3 rounded-r-md transition-all duration-200 whitespace-nowrap font-medium border border-blue-500`}
            >
              {loading ? "Submitting..." : "Notify Me"}
            </button>
          </form>

          {message.text && (
            <p
              className={`mt-4 text-sm animate-in fade-in duration-500 ${
                message.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </section>

        {/* Spacer to create more separation */}
        <div className="py-16"></div>

        {/* Problem & Solution Section - Positioned lower */}
        <section className="py-20 bg-gray-800 rounded-xl">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center text-blue-400">
              The Data Challenge — Our Solutions
            </h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto text-center text-gray-300">
              We unify fragmented data to deliver trusted, localized insights
              for your business and investments.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* The Challenge */}
              <div className="text-left p-6 bg-gray-900 rounded-xl shadow-md border border-white/10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-blue-400">
                  The Challenge
                </h3>
                <p className="text-lg mb-8">
                  Ethiopian businesses, investors, and analysts face critical
                  decisions without timely, reliable, and contextualized data.
                </p>
                <ul className="space-y-4 text-lg">
                  {[
                    ["Fragmented Sources", "Data scattered across multiple sources prevents a single source of truth."],
                    ["Low Reliability", "Incomplete, outdated datasets lead to weak and wrong insights."],
                    ["Untimely Insights", "Manual analysis means missed opportunities."],
                    ["High Entry Barriers", "Data work requires skill and resources most lack."],
                    ["Lack of Local Context", "Generic models miss Ethiopia's unique dynamics."]
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start">
                      <XCircle className="h-6 w-6 text-red-400 mr-3 mt-1" />
                      <span><strong>{title}:</strong> {desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Solution */}
              <div className="text-left p-6 bg-gray-900 rounded-xl shadow-md border border-white/10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-blue-400">
                  Our Solutions
                </h3>
                <p className="text-lg mb-8">
                  Ethiopia's first business intelligence platform turning
                  scattered data into actionable insights.
                </p>
                <ul className="space-y-4 text-lg">
                  {[
                    ["Interactive Dashboards", "Unified economic, sectoral, and financial data for smarter decisions."],
                    ["AI-Augmented Insights", "Instant explanations of data powering a dashboard."],
                    ["Bespoke Consulting", "Help building data and AI strategy."],
                    ["Data Analyst (Coming Soon)", "AI analyst for unified insights across datasets."],
                    ["Research Assistant (Coming Soon)", "On-demand AI summaries of Ethiopian data."]
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1" />
                      <span><strong>{title}:</strong> {desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
          <p>&copy; 2025 Zewd AI. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;