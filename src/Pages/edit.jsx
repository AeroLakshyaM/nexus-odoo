import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function EditProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alexandra Chen",
    title: "Senior UX/UI Designer & Frontend Developer",
    location: "San Francisco, CA",
    email: "alexandra.chen@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate designer and developer with 8+ years of experience creating beautiful, user-centered digital experiences.",
    skillsOffered: ["UI/UX Design", "React", "Figma"],
    skillsWanted: ["Python", "JavaScript", "AutoCAD"],
    availability: "weekends",
    profileVisibility: "Public",
  })

  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")
  const fileInputRef = useRef(null)

  const addSkill = (type) => {
    const skill = type === "offered" ? newSkillOffered : newSkillWanted
    if (skill.trim()) {
      setProfileData((prev) => ({
        ...prev,
        [type === "offered" ? "skillsOffered" : "skillsWanted"]: [
          ...prev[type === "offered" ? "skillsOffered" : "skillsWanted"],
          skill.trim(),
        ],
      }))
      if (type === "offered") {
        setNewSkillOffered("")
      } else {
        setNewSkillWanted("")
      }
    }
  }

  const removeSkill = (type, index) => {
    setProfileData((prev) => ({
      ...prev,
      [type === "offered" ? "skillsOffered" : "skillsWanted"]: prev[
        type === "offered" ? "skillsOffered" : "skillsWanted"
      ].filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    console.log("Saving profile data:", profileData)
    alert("Profile saved successfully!")
  }

  const handleDiscard = () => {
    console.log("Discarding changes")
    alert("Changes discarded!")
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Mobile Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
          isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-gray-200"
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Edit Profile
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <div className="flex items-center gap-1">
                <svg className={`w-4 h-4 transition-colors ${isDarkMode ? "text-gray-500" : "text-yellow-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <svg className={`w-4 h-4 transition-colors ${isDarkMode ? "text-blue-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDiscard}
                  className={`border px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Discard
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        {/* Main Profile Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className={`rounded-2xl md:rounded-3xl border-2 transition-all duration-500 ${
              isDarkMode
                ? "bg-black/60 border-white/20 backdrop-blur-xl"
                : "bg-white/80 border-gray-200 backdrop-blur-xl"
            }`}
          >
            <div className="p-4 md:p-8">
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center space-y-4 mb-8">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 transition-all duration-300 ${
                      isDarkMode ? "border-white/30" : "border-gray-300"
                    }`}
                  >
                    <img
                      src="/placeholder.svg?height=192&width=192"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={handleImageUpload}
                          className={`rounded-full p-2 md:p-3 ${
                            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      console.log("File selected:", file.name)
                    }
                  }}
                />
              </div>

              {/* Form Sections */}
              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Basic Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={profileData.title}
                        onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="e.g., Senior Developer"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="City, State/Country"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Skills
                  </h3>
                  
                  {/* Skills Offered */}
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Skills I Can Offer
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newSkillOffered}
                        onChange={(e) => setNewSkillOffered(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill("offered")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="Add a skill..."
                      />
                      <button
                        onClick={() => addSkill("offered")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skillsOffered.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                            isDarkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill("offered", index)}
                            className="hover:bg-black/20 rounded-full p-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Wanted */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Skills I Want to Learn
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newSkillWanted}
                        onChange={(e) => setNewSkillWanted(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill("wanted")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                        placeholder="Add a skill..."
                      />
                      <button
                        onClick={() => addSkill("wanted")}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skillsWanted.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                            isDarkMode
                              ? "bg-green-600 text-white"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill("wanted", index)}
                            className="hover:bg-black/20 rounded-full p-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Preferences
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Availability
                      </label>
                      <select
                        value={profileData.availability}
                        onChange={(e) => setProfileData({ ...profileData, availability: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                        }`}
                      >
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="evenings">Evenings</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Profile Visibility
                      </label>
                      <select
                        value={profileData.profileVisibility}
                        onChange={(e) => setProfileData({ ...profileData, profileVisibility: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                        }`}
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Friends">Friends Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="md:hidden mt-8 space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Changes
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDiscard}
                  className={`w-full border px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Discard Changes
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
