import { useState, useEffect } from "react";
import { ChevronDown, Play, Sparkles, Zap, Shield } from "lucide-react";
import Footer from "./Components/Footer";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Cutting-edge solutions that push boundaries",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Lightning-fast experiences that captivate",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Enterprise-grade protection you can trust",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-gray-100/50 to-gray-50/50 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            NEXUS
          </div>
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-600 hover:text-black transition-colors duration-300 relative group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-700 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>
          <button className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-2 rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent"
              style={{ transform: `translateY(10px)` }}
            >
              NEXUS
            </h1>

            <p
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              Where{" "}
              <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent font-semibold">
                innovation
              </span>{" "}
              meets{" "}
              <span className="bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent font-semibold">
                excellence
              </span>
              . Crafting digital experiences that transform possibilities into
              reality.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              <button className="group bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="flex items-center space-x-2">
                  <span>Start Your Journey</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
              <button className="group flex items-center space-x-3 text-gray-600 hover:text-black transition-colors duration-300">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="text-lg">Watch Demo</span>
              </button>
            </div>

            <div className="flex justify-center">
              <ChevronDown className="w-8 h-8 text-gray-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
              Why Choose NEXUS?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect blend of creativity, technology, and results
              that sets us apart.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-sm border border-gray-200 hover:border-gray-400 transition-all duration-500 transform hover:scale-105 shadow-sm hover:shadow-md ${
                  currentFeature === index ? "ring-2 ring-gray-400" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <feature.icon className="w-12 h-12 text-black mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-4 text-black">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "10M+", label: "Users Reached" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 group-hover:text-black transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-3xl p-12 backdrop-blur-sm border border-gray-200 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have transformed their
              digital presence with NEXUS.
            </p>
            <button className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Project Today
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
