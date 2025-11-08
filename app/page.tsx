"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Crown, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({
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
      setMessage({
        text: "An error occurred during subscription.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Head>
        <title>Bitawd - A data analytics platform for Ethiopia</title>
        <meta
          name="description"
          content="Bitawd — Ethiopia's first business intelligence and data analytics platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          {/* Left Section: Logo + Brand */}
          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center text-blue-400 font-bold"
            >
              <Crown className="w-6 h-6" />
            </Link>

            <Link href="/" className="flex items-center space-x-1 ">
              <span className="text-2xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                <span className="text-blue-100">B</span>
                <span className="text-blue-200">i</span>
                <span className="text-blue-300">t</span>
                <span className="text-blue-400">a</span>
                <span className="text-blue-500">w</span>
                <span className="text-blue-600">d</span>
              </span>
            </Link>
          </div>
        </header>

        {/* Hero Section - Centered with custom styling */}
        <section className="text-center py-32 flex flex-col justify-center items-center min-h-[80vh]">
          <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl max-w-6xl text-blue-400 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
            Intelligence in Context
          </h1>

          {/* Subtext - Centered */}
          <p className="text-gray-400 leading-relaxed sm:text-xl lg:text-2xl max-w-5xl mx-auto lg:mx-0 text-center pb-18 py-8">
            <span className=" font-medium tracking-tight">
              <span className="text-blue-100">B</span>
              <span className="text-blue-200">i</span>
              <span className="text-blue-300">t</span>
              <span className="text-blue-400">a</span>
              <span className="text-blue-500">w</span>
              <span className="text-blue-600">d</span>
            </span>{" "}
            is Ethiopia’s premier AI-powered data platform, helping business
            leaders, investors, and analysts navigate the economic landscape
            with trusted, actionable intelligence
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex justify-center w-full max-w-md animate-in slide-in-from-bottom duration-700 delay-300"
          >
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
                message.type === "success" ? "text-green-400" : "text-red-400"
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
                    [
                      "Fragmented Sources",
                      "Data scattered across multiple sources prevents a single source of truth.",
                    ],
                    [
                      "Low Reliability",
                      "Incomplete, outdated datasets lead to weak and wrong insights.",
                    ],
                    [
                      "Untimely Insights",
                      "Manual analysis means missed opportunities.",
                    ],
                    [
                      "High Entry Barriers",
                      "Data work requires skill and resources most lack.",
                    ],
                    [
                      "Lack of Local Context",
                      "Generic models miss Ethiopia's unique dynamics.",
                    ],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start">
                      <XCircle className="h-6 w-6 text-red-400 mr-3 mt-1" />
                      <span>
                        <strong>{title}:</strong> {desc}
                      </span>
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
                    [
                      "Interactive Dashboards",
                      "Unified economic, sectoral, and financial data for smarter decisions.",
                    ],
                    [
                      "AI-Augmented Insights",
                      "Instant explanations of data powering a dashboard.",
                    ],
                    [
                      "Bespoke Consulting",
                      "Help building data and AI strategy.",
                    ],
                    [
                      "Data Analyst (Coming Soon)",
                      "AI analyst for unified insights across datasets.",
                    ],
                    [
                      "Research Assistant (Coming Soon)",
                      "On-demand AI summaries of Ethiopian data.",
                    ],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1" />
                      <span>
                        <strong>{title}:</strong> {desc}
                      </span>
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
          <p>&copy; 2025 Bitawd. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
