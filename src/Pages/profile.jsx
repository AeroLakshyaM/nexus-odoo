import { useState, useRef } from "react";
import { AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export default function UserProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const tabsRef = useRef(null);
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ef4444", "#3b82f6", "#10b981"]
  );

  const profileData = {
    name: "Alexandra Chen",
    title: "Senior UX/UI Designer & Frontend Developer",
    location: "San Francisco, CA",
    email: "alexandra.chen@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2022",
    bio: "Passionate designer and developer with 8+ years of experience creating beautiful, user-centered digital experiences. I specialize in bridging the gap between design and development, ensuring pixel-perfect implementations that delight users.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=800",
    stats: {
      projects: 47,
      followers: 1234,
      following: 567,
      likes: 8901,
    },
    skills: {
      design: [
        { name: "UI/UX Design", level: 95 },
        { name: "Figma", level: 90 },
        { name: "Adobe Creative Suite", level: 85 },
        { name: "Prototyping", level: 88 },
      ],
      development: [
        { name: "React", level: 92 },
        { name: "TypeScript", level: 88 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 90 },
      ],
    },
    experience: [
      {
        company: "TechCorp Inc.",
        position: "Senior UX Designer",
        duration: "2022 - Present",
        description:
          "Leading design initiatives for enterprise SaaS products, managing a team of 4 designers.",
      },
      {
        company: "StartupXYZ",
        position: "Product Designer",
        duration: "2020 - 2022",
        description:
          "Designed and developed the complete user experience for a fintech mobile application.",
      },
      {
        company: "Design Studio",
        position: "UI Designer",
        duration: "2018 - 2020",
        description:
          "Created beautiful interfaces for various client projects across different industries.",
      },
    ],
    projects: [
      {
        title: "E-commerce Dashboard",
        description:
          "Complete redesign of admin dashboard with 40% improvement in user efficiency",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["UI/UX", "React", "Analytics"],
      },
      {
        title: "Mobile Banking App",
        description:
          "Fintech mobile app serving 100K+ users with seamless transaction experience",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Mobile", "Fintech", "UX Research"],
      },
      {
        title: "Design System",
        description:
          "Comprehensive design system adopted across 15+ products in the organization",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Design System", "Components", "Documentation"],
      },
    ],
    achievements: [
      {
        title: "Design Excellence Award",
        year: "2023",
        organization: "TechCorp",
      },
      {
        title: "Best Mobile App Design",
        year: "2022",
        organization: "Design Awards",
      },
      {
        title: "Innovation in UX",
        year: "2021",
        organization: "UX Conference",
      },
    ],
    socialLinks: {
      github: "https://github.com/alexandra-chen",
      linkedin: "https://linkedin.com/in/alexandra-chen",
      twitter: "https://twitter.com/alexandra_chen",
      website: "https://alexandrachen.design",
    },
  };

  const tabs = ["overview", "projects", "experience", "skills"];

  // Touch handlers for tab swiping
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    const currentIndex = tabs.indexOf(activeTab);

    if (isLeftSwipe && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
    if (isRightSwipe && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  // Project carousel swipe handlers
  const handleProjectSwipe = (direction) => {
    if (
      direction === "left" &&
      currentProjectIndex < profileData.projects.length - 1
    ) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
    if (direction === "right" && currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  const handlePanEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handleProjectSwipe("right");
    } else if (info.offset.x < -threshold) {
      handleProjectSwipe("left");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
          isDarkMode
            ? "bg-black/40 border-white/10"
            : "bg-white/60 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Profile
              </h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div
            className={`rounded-2xl p-6 ${
              isDarkMode
                ? "bg-black/60 border border-white/20"
                : "bg-white/80 border border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h1
                  className={`text-2xl md:text-3xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {profileData.name}
                </h1>
                <p
                  className={`text-lg mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {profileData.title}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {profileData.stats.projects}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {profileData.stats.followers}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {profileData.stats.likes}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Likes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="mb-6">
          <div
            className={`rounded-xl p-1 ${
              isDarkMode
                ? "bg-black/60 border border-white/20"
                : "bg-white/80 border border-gray-200"
            }`}
          >
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg"
                      : isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="touch-pan-y"
          >
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* About */}
                <div className="lg:col-span-2 space-y-6">
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode
                        ? "bg-black/60 border border-white/20"
                        : "bg-white/80 border border-gray-200"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      About
                    </h3>
                    <p
                      className={`leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {profileData.bio}
                    </p>
                  </div>

                  {/* Featured Projects */}
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode
                        ? "bg-black/60 border border-white/20"
                        : "bg-white/80 border border-gray-200"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                        />
                      </svg>
                      Featured Projects
                    </h3>
                    <div className="grid gap-4">
                      {profileData.projects
                        .slice(0, 2)
                        .map((project, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                              isDarkMode
                                ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                                : "bg-gray-50 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex gap-4">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4
                                  className={`font-semibold ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {project.title}
                                </h4>
                                <p
                                  className={`text-sm mt-1 ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {project.description}
                                </p>
                                <div className="flex gap-2 mt-2">
                                  {project.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className={`px-2 py-1 text-xs rounded-full ${
                                        isDarkMode
                                          ? "bg-gray-700 text-gray-300"
                                          : "bg-gray-200 text-gray-700"
                                      }`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode
                        ? "bg-black/60 border border-white/20"
                        : "bg-white/80 border border-gray-200"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Contact
                    </h3>
                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm truncate">
                          {profileData.email}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-sm">{profileData.phone}</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div
                    className={`rounded-xl p-6 ${
                      isDarkMode
                        ? "bg-black/60 border border-white/20"
                        : "bg-white/80 border border-gray-200"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Social
                    </h3>
                    <div className="flex gap-3">
                      {Object.entries(profileData.socialLinks).map(
                        ([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                              isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {platform === "github" && (
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              )}
                              {platform === "linkedin" && (
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              )}
                              {platform === "twitter" && (
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                              )}
                              {platform === "website" && (
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                              )}
                            </svg>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? "bg-black/60 border border-white/20"
                    : "bg-white/80 border border-gray-200"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  All Projects
                </h3>
                <div className="grid gap-6">
                  {profileData.projects.map((project, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                        isDarkMode
                          ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full md:w-48 h-32 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4
                            className={`text-xl font-semibold mb-2 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {project.title}
                          </h4>
                          <p
                            className={`mb-4 ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {project.description}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-3 py-1 text-sm rounded-full ${
                                  isDarkMode
                                    ? "bg-gray-700 text-gray-300"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? "bg-black/60 border border-white/20"
                    : "bg-white/80 border border-gray-200"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Work Experience
                </h3>
                <div className="space-y-6">
                  {profileData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                        isDarkMode
                          ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4
                          className={`text-lg font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {exp.position}
                        </h4>
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {exp.duration}
                        </span>
                      </div>
                      <h5
                        className={`text-md font-medium mb-2 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {exp.company}
                      </h5>
                      <p
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? "bg-black/60 border border-white/20"
                    : "bg-white/80 border border-gray-200"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Skills & Expertise
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Design Skills
                    </h4>
                    <div className="space-y-4">
                      {profileData.skills.design.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {skill.name}
                            </span>
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          <div
                            className={`w-full h-2 rounded-full ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          >
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Development Skills
                    </h4>
                    <div className="space-y-4">
                      {profileData.skills.development.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {skill.name}
                            </span>
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          <div
                            className={`w-full h-2 rounded-full ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          >
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
