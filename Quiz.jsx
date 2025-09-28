"use client"

import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"

// Quiz data
const quizData = [
  {
    question: "Siapa yang dianggap sebagai 'Bapak Jurnalisme Modern'?",
    options: ["Joseph Pulitzer", "William Randolph Hearst", "Edward R. Murrow", "Walter Lippmann"],
    correctAnswer: 0,
    funFact: "Joseph Pulitzer juga menginspirasi penghargaan jurnalistik paling bergengsi di dunia!",
  },
  {
    question: "Kapan surat kabar pertama di dunia diterbitkan?",
    options: ["Abad ke-15", "Abad ke-16", "Abad ke-17", "Abad ke-18"],
    correctAnswer: 2,
    funFact: "Bayangkan menunggu berita selama berabad-abad sebelum ada surat kabar! 📜",
  },
  {
    question: "Apa nama surat kabar pertama yang diterbitkan di Indonesia?",
    options: ["Bataviaasche Nouvelles", "Java Bode", "Medan Prijaji", "Bintang Hindia"],
    correctAnswer: 0,
    funFact: "Terbit pertama kali pada 7 Agustus 1744. Berita trending saat itu: 'Kapal VOC tiba dengan selamat' 😄",
  },
  {
    question: "Siapa jurnalis Indonesia yang mendirikan Kantor Berita Antara?",
    options: ["Adam Malik", "Soemanang", "Adinegoro", "Rosihan Anwar"],
    correctAnswer: 0,
    funFact: "Adam Malik juga pernah menjadi Wakil Presiden RI. Dari jurnalis ke politisi! 🚀",
  },
  {
    question: "Kode Etik Jurnalistik ditetapkan oleh organisasi apa di Indonesia?",
    options: [
      "PWI (Persatuan Wartawan Indonesia)",
      "Dewan Pers",
      "AJI (Aliansi Jurnalis Independen)",
      "Komisi Penyiaran Indonesia",
    ],
    correctAnswer: 1,
    funFact: "Dewan Pers: Menjaga wartawan tetap jujur sejak 1966! 📝",
  },
  {
    question: "Istilah 'Yellow Journalism' mengacu pada?",
    options: ["Jurnalisme investigasi", "Jurnalisme sensasional", "Jurnalisme data", "Jurnalisme solusi"],
    correctAnswer: 1,
    funFact:
      "Namanya berasal dari karakter kartun 'Yellow Kid' yang muncul di koran sensasional. Jadi bukan tentang warna kuning! 🟡",
  },
  {
    question: "Surat kabar 'The New York Times' didirikan pada tahun?",
    options: ["1831", "1851", "1871", "1891"],
    correctAnswer: 1,
    funFact:
      "Slogan mereka: 'All the News That's Fit to Print'. Tapi sekarang mungkin 'All the News That Fits Our Website' 😂",
  },
  {
    question: "Siapa yang menerbitkan majalah 'Tempo' pertama kali di Indonesia?",
    options: ["Mochtar Lubis", "Goenawan Mohamad", "Jakob Oetama", "B.M. Diah"],
    correctAnswer: 1,
    funFact: "Tempo pernah dibredel dua kali oleh pemerintah. Talk about being too hot to handle! 🔥",
  },
  {
    question: "Apa yang dimaksud dengan 'lead' dalam penulisan berita?",
    options: ["Bagian penutup berita", "Judul berita", "Paragraf pertama yang memuat inti berita", "Kutipan wawancara"],
    correctAnswer: 2,
    funFact: "Lead yang baik menjawab 5W+1H dalam satu paragraf. Efisiensi level: Jurnalis! ⚡",
  },
  {
    question: "Kapan Hari Pers Nasional di Indonesia diperingati?",
    options: ["9 Februari", "9 Maret", "9 April", "9 Mei"],
    correctAnswer: 0,
    funFact: "Tanggal ini dipilih karena berdirinya PWI pada 9 Februari 1946. Selamat ulang tahun, Pers! 🎂",
  },
  {
    question: "Apa yang dimaksud dengan istilah 'off the record' dalam wawancara jurnalistik?",
    options: [
      "Wawancara yang tidak direkam",
      "Informasi yang tidak boleh dipublikasikan",
      "Wawancara yang dilakukan di luar kantor",
      "Wawancara tambahan setelah sesi utama",
    ],
    correctAnswer: 1,
    funFact: "Ketika narasumber bilang 'off the record', jurnalis langsung: 'Ini pasti gosip hot!' 🤫",
  },
  {
    question:
      "Siapa jurnalis yang terkenal dengan laporannya tentang Perang Vietnam dan memengaruhi opini publik Amerika?",
    options: ["Edward R. Murrow", "Walter Cronkite", "Bob Woodward", "Carl Bernstein"],
    correctAnswer: 1,
    funFact:
      "Walter Cronkite dijuluki 'the most trusted man in America'. Bayangkan punya julukan seperti itu di era hoaks sekarang! 🌟",
  },
  {
    question:
      "Kasus jurnalistik investigasi yang paling terkenal, membongkar skandal Watergate, diliput oleh jurnalis dari media?",
    options: ["The New York Times", "The Washington Post", "Time Magazine", "The Boston Globe"],
    correctAnswer: 1,
    funFact: "Skandal ini menyebabkan satu-satunya pengunduran diri Presiden AS dalam sejarah. Talk about a scoop! 😮",
  },
  {
    question: "Apa yang dimaksud dengan 'citizen journalism'?",
    options: [
      "Jurnalisme yang hanya membahas isu kewarganegaraan",
      "Jurnalisme yang dilakukan oleh warga biasa",
      "Jurnalisme yang fokus pada politik dalam negeri",
      "Jurnalisme yang didanai masyarakat",
    ],
    correctAnswer: 1,
    funFact:
      "Sekarang semua orang dengan smartphone adalah jurnalis potensial. Breaking news dari toilet pun bisa viral! 📱",
  },
  {
    question: "Rumus penulisan berita 5W+1H terdiri dari unsur-unsur berikut, kecuali:",
    options: ["Where (Di mana)", "Who (Siapa)", "Wisdom (Kebijaksanaan)", "When (Kapan)"],
    correctAnswer: 2,
    funFact: "Jika 'Wisdom' masuk dalam rumus, mungkin berita hoaks akan berkurang 90%! 🧠",
  },
  {
    question: "Undang-undang yang mengatur tentang pers di Indonesia adalah:",
    options: ["UU No. 40 Tahun 1999", "UU No. 32 Tahun 2002", "UU No. 11 Tahun 2008", "UU No. 14 Tahun 2008"],
    correctAnswer: 0,
    funFact: "UU ini lahir setelah Reformasi 1998. Sebelumnya, pers Indonesia seperti burung dalam sangkar emas! 🐦",
  },
  {
    question: "Siapa jurnalis Indonesia yang terkenal dengan buku 'Jurnalisme dan Sastra'?",
    options: ["Mochtar Lubis", "Rosihan Anwar", "Goenawan Mohamad", "P.K. Ojong"],
    correctAnswer: 2,
    funFact: "Goenawan juga penyair. Jadi beritanya bisa puitis: 'Hujan air mata turun di gedung DPR' 📝",
  },
  {
    question: "Apa nama penghargaan jurnalistik internasional paling bergengsi?",
    options: ["Pulitzer Prize", "Nobel Prize", "Emmy Award", "BAFTA Award"],
    correctAnswer: 0,
    funFact: "Pemenang Pulitzer mendapat hadiah $15.000. Tidak cukup untuk membeli rumah, tapi cukup untuk gengsi! 🏆",
  },
  {
    question: "Periode yang disebut sebagai 'era kebangkitan pers' di Indonesia terjadi pada:",
    options: ["Masa Orde Lama", "Masa Orde Baru", "Masa Reformasi", "Masa Kolonial Belanda"],
    correctAnswer: 2,
    funFact: "Setelah Reformasi, jumlah media melonjak dari 289 menjadi ribuan. Seperti jamur di musim hujan! 🍄",
  },
  {
    question: "Apa yang dimaksud dengan 'newsroom' dalam konteks jurnalistik?",
    options: [
      "Ruang konferensi pers",
      "Ruang untuk menyimpan arsip berita",
      "Ruang kerja redaksi di kantor media",
      "Studio penyiaran berita",
    ],
    correctAnswer: 2,
    funFact: "Newsroom modern: 50% jurnalisme, 50% minum kopi, 100% deadline stress! ☕",
  },
]

// Main Quiz Component
function Quiz() {
  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes in seconds
  const [timerActive, setTimerActive] = useState(true)
  const [showFunFact, setShowFunFact] = useState(false)
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false)
  const [showWrongAnimation, setShowWrongAnimation] = useState(false)
  const [userName, setUserName] = useState("")
  const [showIntro, setShowIntro] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [eliminatedOptions, setEliminatedOptions] = useState(Array(quizData.length).fill([]))
  const [isTimerWarning, setIsTimerWarning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("default")

  const confettiRef = useRef(null)

  // Theme options
  const themes = {
    default: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      background: "#f0f9ff",
      card: "#ffffff",
      text: "#1e293b",
      accent: "#f97316",
    },
    dark: {
      primary: "#8b5cf6",
      secondary: "#6d28d9",
      background: "#0f172a",
      card: "#1e293b",
      text: "#f8fafc",
      accent: "#f97316",
    },
    neon: {
      primary: "#10b981",
      secondary: "#059669",
      background: "#18181b",
      card: "#27272a",
      text: "#f4f4f5",
      accent: "#ec4899",
    },
    retro: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      background: "#fdf2f8",
      card: "#ffffff",
      text: "#881337",
      accent: "#fbbf24",
    },
  }

  const theme = themes[currentTheme]

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && timerActive && quizStarted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        if (timeLeft <= 300 && !isTimerWarning) {
          setIsTimerWarning(true)
        }
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && timerActive) {
      finishQuiz()
    }
  }, [timeLeft, timerActive, quizStarted])

  // Confetti effect
  useEffect(() => {
    if (showConfetti && confettiRef.current) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          particleCount,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
          ...defaults,
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [showConfetti])

  // Handle answer selection
  const handleAnswerClick = (selectedOption) => {
    if (eliminatedOptions[currentQuestion].includes(selectedOption)) {
      return // Don't allow selecting eliminated options
    }

    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = selectedOption
    setSelectedAnswers(newSelectedAnswers)

    // Show animation based on correct/wrong answer
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setShowCorrectAnimation(true)
      setTimeout(() => setShowCorrectAnimation(false), 1000)
    } else {
      setShowWrongAnimation(true)
      setTimeout(() => setShowWrongAnimation(false), 1000)
    }

    // Show fun fact after answering
    setShowFunFact(true)
    setTimeout(() => {
      setShowFunFact(false)
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 3000)
  }

  // Navigation functions
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFunFact(false)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFunFact(false)
    }
  }

  // Use hint to eliminate wrong options
  const useHint = () => {
    if (hintsUsed >= 3 || selectedAnswers[currentQuestion] !== null) return

    const correctAnswer = quizData[currentQuestion].correctAnswer
    const availableWrongOptions = [0, 1, 2, 3].filter(
      (opt) => opt !== correctAnswer && !eliminatedOptions[currentQuestion].includes(opt),
    )

    // Randomly select one wrong option to eliminate
    if (availableWrongOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableWrongOptions.length)
      const optionToEliminate = availableWrongOptions[randomIndex]

      const newEliminatedOptions = [...eliminatedOptions]
      newEliminatedOptions[currentQuestion] = [...newEliminatedOptions[currentQuestion], optionToEliminate]
      setEliminatedOptions(newEliminatedOptions)
      setHintsUsed(hintsUsed + 1)
      setShowHint(true)
      setTimeout(() => setShowHint(false), 2000)
    }
  }

  // Finish quiz and calculate score
  const finishQuiz = () => {
    let totalScore = 0
    for (let i = 0; i < quizData.length; i++) {
      if (selectedAnswers[i] === quizData[i].correctAnswer) {
        totalScore++
      }
    }
    setScore(totalScore)
    setShowScore(true)
    setTimerActive(false)

    // Show confetti for good scores
    if (totalScore >= quizData.length * 0.7) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswers(Array(quizData.length).fill(null))
    setTimeLeft(1200)
    setTimerActive(true)
    setHintsUsed(0)
    setEliminatedOptions(Array(quizData.length).fill([]))
    setIsTimerWarning(false)
    setShowConfetti(false)
  }

  // Start quiz
  const startQuiz = () => {
    if (userName.trim() === "") {
      alert("Silakan masukkan nama Anda terlebih dahulu!")
      return
    }
    setShowIntro(false)
    setQuizStarted(true)
  }

  // Change theme
  const changeTheme = (themeName) => {
    setCurrentTheme(themeName)
  }

  // ReviewItem component for showing answers
  const ReviewItem = ({ questionData, index, selectedAnswer }) => {
    const isCorrect = selectedAnswer === questionData.correctAnswer
    return (
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
          borderRadius: "12px",
          borderLeft: `4px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
          transition: "all 0.3s ease",
        }}
      >
        <p style={{ fontWeight: "600", marginBottom: "10px" }}>
          <span style={{ color: theme.accent }}>Soal {index + 1}:</span> {questionData.question}
        </p>
        <p>
          Jawaban Anda:{" "}
          {selectedAnswer !== null ? (
            <span
              style={{
                color: isCorrect ? "#10b981" : "#ef4444",
                fontWeight: "500",
              }}
            >
              {questionData.options[selectedAnswer]}
            </span>
          ) : (
            <span style={{ color: "#ef4444", fontStyle: "italic" }}>Tidak dijawab</span>
          )}
        </p>
        {!isCorrect && (
          <p style={{ color: "#10b981", fontWeight: "600" }}>
            Jawaban Benar: {questionData.options[questionData.correctAnswer]}
          </p>
        )}
        <p style={{ marginTop: "10px", fontSize: "0.9rem", color: theme.accent, fontStyle: "italic" }}>
          {questionData.funFact}
        </p>
      </div>
    )
  }

  // Custom Navbar component with PLASMA logo
  const Navbar = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          marginBottom: "20px",
          borderBottom: `2px solid ${theme.primary}`,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* PNM PLASMA Logo - menggunakan gambar dari file */}
          <div
            style={{
              width: "70px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img 
              src="pers.png" 
              alt="PLASMA PNM Logo" 
              width="70" 
              height="70"
              style={{
                objectFit: "contain"
              }}
            />
          </div>
          <div>
            <h2
              style={{
                color: theme.primary,
                fontSize: "24px",
                fontWeight: "700",
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Kuis Jurnalistik Indonesia
            </h2>
            {quizStarted && !showIntro && (
              <p style={{ fontSize: "14px", color: theme.secondary }}>Halo, {userName}!</p>
            )}
            <p style={{ fontSize: "12px", color: theme.secondary }}>
              PLASMA PNM - Penguji Pemahaman Jurnalis & Media
            </p>
          </div>
        </div>
        {quizStarted && !showIntro && !showScore && (
          <div
            style={{
              backgroundColor: isTimerWarning ? "#ef4444" : theme.primary,
              color: "white",
              padding: "8px 15px",
              borderRadius: "8px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              animation: isTimerWarning ? "pulse 1s infinite" : "none",
              transition: "all 0.3s ease",
            }}
          >
            <span>⏱️</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>
    )
  }

  // Styles
  const styles = {
    container: {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: "100vh",
      transition: "all 0.3s ease",
    },
    quizContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: theme.card,
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
    },
    progressBar: {
      width: "100%",
      height: "8px",
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: "4px",
      marginBottom: "20px",
      overflow: "hidden",
    },
    progress: {
      height: "100%",
      backgroundColor: theme.primary,
      borderRadius: "4px",
      transition: "width 0.3s ease-in-out",
    },
    mainContent: {
      padding: "0 10px",
    },
    questionSection: {
      marginBottom: "30px",
      position: "relative",
      backgroundColor: "rgba(0,0,0,0.02)",
      padding: "20px",
      borderRadius: "12px",
    },
    questionCount: {
      marginBottom: "10px",
      fontSize: "18px",
      fontWeight: "500",
      color: theme.secondary,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    questionText: {
      fontSize: "22px",
      fontWeight: "600",
      color: theme.text,
      marginBottom: "20px",
      lineHeight: 1.4,
      position: "relative",
      padding: "15px",
      borderLeft: `4px solid ${theme.accent}`,
      backgroundColor: "rgba(0,0,0,0.03)",
      borderRadius: "0 8px 8px 0",
    },
    answerSection: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "30px",
      position: "relative",
      gap: "10px",
    },
    answerButton: {
      margin: "4px 0",
      padding: "15px",
      fontSize: "16px",
      backgroundColor: "rgba(0,0,0,0.03)",
      border: "2px solid transparent",
      borderRadius: "10px",
      textAlign: "left",
      cursor: "pointer",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    },
    answerButtonHover: {
      backgroundColor: "rgba(0,0,0,0.05)",
      borderColor: theme.primary,
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
    answerButtonSelected: {
      backgroundColor: `${theme.primary}20`,
      borderColor: theme.primary,
      color: theme.primary,
      fontWeight: "bold",
    },
    answerButtonEliminated: {
      opacity: 0.5,
      textDecoration: "line-through",
      cursor: "not-allowed",
    },
    optionLabel: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: theme.primary,
      color: "white",
      marginRight: "15px",
      fontWeight: "bold",
      flexShrink: 0,
    },
    navigationControls: {
      marginTop: "20px",
    },
    navigationButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
    },
    navButton: {
      padding: "12px 24px",
      backgroundColor: theme.primary,
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    navButtonHover: {
      backgroundColor: theme.secondary,
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
    navButtonDisabled: {
      backgroundColor: "rgba(0,0,0,0.1)",
      cursor: "not-allowed",
      opacity: 0.7,
    },
    scoreSection: {
      fontSize: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    scoreResult: {
      fontSize: "48px",
      fontWeight: "bold",
      color: theme.primary,
      margin: "20px 0",
    },
    submitButton: {
      padding: "15px 30px",
      backgroundColor: theme.accent,
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      transition: "all 0.3s",
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    submitButtonHover: {
      backgroundColor: "#e05d00",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
    funFactOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      animation: "fadeIn 0.3s",
    },
    funFactCard: {
      backgroundColor: theme.card,
      padding: "30px",
      borderRadius: "16px",
      maxWidth: "80%",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      position: "relative",
      textAlign: "center",
      animation: "scaleIn 0.5s",
    },
    funFactText: {
      fontSize: "18px",
      lineHeight: 1.5,
      color: theme.text,
    },
    confettiCanvas: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1000,
    },
    introContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
    },
    introTitle: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px",
      background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    introDescription: {
      fontSize: "18px",
      marginBottom: "30px",
      maxWidth: "600px",
      lineHeight: 1.6,
    },
    nameInput: {
      padding: "12px 20px",
      width: "100%",
      maxWidth: "400px",
      fontSize: "16px",
      borderRadius: "8px",
      border: `2px solid ${theme.primary}`,
      marginBottom: "20px",
      outline: "none",
      transition: "all 0.3s",
    },
    nameInputFocus: {
      borderColor: theme.accent,
      boxShadow: `0 0 0 3px ${theme.primary}40`,
    },
    startButton: {
      padding: "15px 30px",
      backgroundColor: theme.primary,
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      transition: "all 0.3s",
      marginTop: "20px",
    },
    startButtonHover: {
      backgroundColor: theme.secondary,
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
    themeSelector: {
      position: "absolute",
      top: "20px",
      right: "20px",
      display: "flex",
      gap: "10px",
    },
    themeButton: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      border: "2px solid transparent",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    themeButtonActive: {
      transform: "scale(1.2)",
      border: "2px solid white",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    },
    hintButton: {
      padding: "10px 20px",
      backgroundColor: theme.accent,
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "15px",
    },
    hintButtonDisabled: {
      backgroundColor: "rgba(0,0,0,0.1)",
      cursor: "not-allowed",
      opacity: 0.7,
    },
    hintCounter: {
      fontSize: "14px",
      color: theme.secondary,
      marginBottom: "15px",
    },
    hintNotification: {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: theme.accent,
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      zIndex: 1000,
      animation: "slideUp 0.3s, fadeOut 0.3s 2s forwards",
    },
    correctAnimation: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      animation: "pulse 0.5s",
    },
    wrongAnimation: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      animation: "shake 0.5s",
    },
    reviewSection: {
      marginTop: "30px",
      padding: "20px",
      backgroundColor: "rgba(0,0,0,0.02)",
      borderRadius: "12px",
    },
    reviewTitle: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "20px",
      color: theme.primary,
    },
    certificate: {
      backgroundColor: "white",
      padding: "40px",
      border: "10px solid #f0f0f0",
      borderRadius: "8px",
      maxWidth: "600px",
      margin: "30px auto",
      textAlign: "center",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    },
    certificateTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: "10px",
    },
    certificateContent: {
      fontSize: "16px",
      lineHeight: 1.6,
      marginBottom: "20px",
    },
    certificateScore: {
      fontSize: "24px",
      fontWeight: "bold",
      color: theme.accent,
      marginBottom: "20px",
    },
    certificateBadge: {
      fontSize: "18px",
      color: "white",
      padding: "8px 15px",
      borderRadius: "20px",
      display: "inline-block",
      margin: "10px 0",
    },
    badgeExcellent: {
      backgroundColor: "#10b981",
    },
    badgeGood: {
      backgroundColor: "#3b82f6",
    },
    badgeAverage: {
      backgroundColor: "#f59e0b",
    },
    badgeNeedsImprovement: {
      backgroundColor: "#ef4444",
    },
    shareSection: {
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    shareTitle: {
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "15px",
    },
    shareButtons: {
      display: "flex",
      gap: "15px",
    },
    shareButton: {
      padding: "10px 20px",
      backgroundColor: theme.primary,
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    creditSection: {
      fontSize: "14px",
      color: theme.secondary,
      textAlign: "center",
      marginTop: "50px",
      padding: "20px 0",
      borderTop: "1px solid rgba(0,0,0,0.1)",
    },
  }

  // Getting badge based on score
  const getBadge = () => {
    const percentage = (score / quizData.length) * 100
    if (percentage >= 90) return { text: "Excellent", style: styles.badgeExcellent }
    if (percentage >= 70) return { text: "Good", style: styles.badgeGood }
    if (percentage >= 50) return { text: "Average", style: styles.badgeAverage }
    return { text: "Needs Improvement", style: styles.badgeNeedsImprovement }
  }

  // Share result functions
  const shareOnTwitter = () => {
    const text = `I scored ${score}/${quizData.length} on the Indonesian Journalism Quiz! Can you beat my score? #JournalismQuiz #PLASMAPNM`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank")
  }

  const shareOnFacebook = () => {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const shareOnWhatsApp = () => {
    const text = `I scored ${score}/${quizData.length} on the Indonesian Journalism Quiz! Can you beat my score? #JournalismQuiz #PLASMAPNM`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <div style={styles.container}>
      <div style={styles.quizContainer}>
        <Navbar />

        {/* Theme selector */}
        <div style={styles.themeSelector}>
          {Object.keys(themes).map((themeName) => (
            <button
              key={themeName}
              style={{
                ...styles.themeButton,
                backgroundColor: themes[themeName].primary,
                ...(currentTheme === themeName && styles.themeButtonActive),
              }}
              onClick={() => changeTheme(themeName)}
              title={`${themeName} theme`}
            />
          ))}
        </div>

        {showIntro ? (
          <div style={styles.introContainer}>
            <div style={styles.introTitle}>Selamat Datang di Kuis Jurnalistik Indonesia</div>
            <p style={styles.introDescription}>
              Uji pengetahuan Anda tentang dunia jurnalistik Indonesia dan internasional melalui 20 pertanyaan
              menarik. Anda memiliki waktu 20 menit untuk menyelesaikan kuis ini. Siap untuk memulai?
            </p>
            <div>
              <input
                type="text"
                placeholder="Masukkan nama Anda"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={styles.nameInput}
                onFocus={(e) => (e.target.style.borderColor = theme.accent)}
                onBlur={(e) => (e.target.style.borderColor = theme.primary)}
              />
            </div>
            <button
              style={styles.startButton}
              onMouseOver={(e) => Object.assign(e.target.style, styles.startButtonHover)}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = theme.primary
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
              onClick={startQuiz}
            >
              Mulai Kuis
            </button>
          </div>
        ) : showScore ? (
          <div style={styles.mainContent}>
            <div style={styles.scoreSection}>
              <h2>Kuis Selesai!</h2>
              <div style={styles.scoreResult}>
                {score} / {quizData.length}
              </div>
              <p>
                Anda menjawab {score} dari {quizData.length} pertanyaan dengan benar.
              </p>

              {/* Certificate */}
              <div style={styles.certificate}>
                <div style={styles.certificateTitle}>Sertifikat Penyelesaian</div>
                <div style={styles.certificateContent}>
                  Diberikan kepada:
                  <h3>{userName}</h3>
                  telah menyelesaikan Kuis Jurnalistik Indonesia dengan skor:
                </div>
                <div style={styles.certificateScore}>
                  {score}/{quizData.length} ({Math.round((score / quizData.length) * 100)}%)
                </div>
                <div style={{ ...styles.certificateBadge, ...getBadge().style }}>{getBadge().text}</div>
                <div style={styles.certificateContent}>
                  <p>{new Date().toLocaleDateString()}</p>
                  <p>PLASMA PNM - Penguji Pemahaman Jurnalis & Media</p>
                </div>
              </div>

              {/* Share section */}
              <div style={styles.shareSection}>
                <div style={styles.shareTitle}>Bagikan hasil Anda:</div>
                <div style={styles.shareButtons}>
                  <button
                    style={styles.shareButton}
                    onClick={shareOnTwitter}
                    onMouseOver={(e) => (e.target.style.backgroundColor = theme.secondary)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = theme.primary)}
                  >
                    Twitter
                  </button>
                  <button
                    style={styles.shareButton}
                    onClick={shareOnFacebook}
                    onMouseOver={(e) => (e.target.style.backgroundColor = theme.secondary)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = theme.primary)}
                  >
                    Facebook
                  </button>
                  <button
                    style={styles.shareButton}
                    onClick={shareOnWhatsApp}
                    onMouseOver={(e) => (e.target.style.backgroundColor = theme.secondary)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = theme.primary)}
                  >
                    WhatsApp
                  </button>
                </div>
              </div>

              <button
                style={styles.submitButton}
                onClick={restartQuiz}
                onMouseOver={(e) => Object.assign(e.target.style, styles.submitButtonHover)}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = theme.accent
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                Coba Lagi
              </button>

              {/* Review section */}
              <div style={styles.reviewSection}>
                <h3 style={styles.reviewTitle}>Review Jawaban Anda</h3>
                {quizData.map((question, index) => (
                  <ReviewItem key={index} questionData={question} index={index} selectedAnswer={selectedAnswers[index]} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.mainContent}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progress,
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              ></div>
            </div>

            <div style={styles.questionSection}>
              <div style={styles.questionCount}>
                <span>
                  Pertanyaan {currentQuestion + 1}/{quizData.length}
                </span>
                <span style={styles.hintCounter}>Hint tersisa: {3 - hintsUsed}/3</span>
              </div>
              <button
                style={{
                  ...styles.hintButton,
                  ...(hintsUsed >= 3 || selectedAnswers[currentQuestion] !== null
                    ? styles.hintButtonDisabled
                    : {}),
                }}
                onClick={useHint}
                disabled={hintsUsed >= 3 || selectedAnswers[currentQuestion] !== null}
                onMouseOver={(e) => {
                  if (hintsUsed < 3 && selectedAnswers[currentQuestion] === null) {
                    e.target.style.backgroundColor = "#e05d00"
                  }
                }}
                onMouseOut={(e) => {
                  if (hintsUsed < 3 && selectedAnswers[currentQuestion] === null) {
                    e.target.style.backgroundColor = theme.accent
                  }
                }}
              >
                <span>💡</span> Gunakan Hint
              </button>
              <div style={styles.questionText}>{quizData[currentQuestion].question}</div>
              <div style={styles.answerSection}>
                {quizData[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    style={{
                      ...styles.answerButton,
                      ...(eliminatedOptions[currentQuestion].includes(index) ? styles.answerButtonEliminated : {}),
                      ...(selectedAnswers[currentQuestion] === index ? styles.answerButtonSelected : {}),
                    }}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswers[currentQuestion] !== null || eliminatedOptions[currentQuestion].includes(index)}
                    onMouseOver={(e) => {
                      if (
                        selectedAnswers[currentQuestion] === null &&
                        !eliminatedOptions[currentQuestion].includes(index)
                      ) {
                        Object.assign(e.target.style, styles.answerButtonHover)
                      }
                    }}
                    onMouseOut={(e) => {
                      if (
                        selectedAnswers[currentQuestion] === null &&
                        !eliminatedOptions[currentQuestion].includes(index)
                      ) {
                        e.target.style.backgroundColor = selectedAnswers[currentQuestion] === index ? theme.primary : ""
                        e.target.style.borderColor = selectedAnswers[currentQuestion] === index ? theme.primary : ""
                        e.target.style.transform = "translateY(0)"
                        e.target.style.boxShadow = "none"
                      }
                    }}
                  >
                    <span style={styles.optionLabel}>{String.fromCharCode(65 + index)}</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.navigationControls}>
              <div style={styles.navigationButtons}>
                <button
                  style={{
                    ...styles.navButton,
                    ...(currentQuestion === 0 ? styles.navButtonDisabled : {}),
                  }}
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  onMouseOver={(e) => {
                    if (currentQuestion > 0) {
                      Object.assign(e.target.style, styles.navButtonHover)
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentQuestion > 0) {
                      e.target.style.backgroundColor = theme.primary
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = "none"
                    }
                  }}
                >
                  ← Sebelumnya
                </button>
                {currentQuestion < quizData.length - 1 ? (
                  <button
                    style={styles.navButton}
                    onClick={handleNextQuestion}
                    onMouseOver={(e) => Object.assign(e.target.style, styles.navButtonHover)}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = theme.primary
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = "none"
                    }}
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  <button
                    style={styles.submitButton}
                    onClick={finishQuiz}
                    onMouseOver={(e) => Object.assign(e.target.style, styles.submitButtonHover)}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = theme.accent
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = "none"
                    }}
                  >
                    <span>🏁</span> Selesaikan Kuis
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Fun fact overlay */}
        {showFunFact && (
          <div style={styles.funFactOverlay}>
            <div style={styles.funFactCard}>
              {selectedAnswers[currentQuestion] === quizData[currentQuestion].correctAnswer ? (
                <h3 style={{ color: "#10b981", marginBottom: "15px" }}>Jawaban Benar! 🎉</h3>
              ) : (
                <h3 style={{ color: "#ef4444", marginBottom: "15px" }}>Jawaban Salah! 🤔</h3>
              )}
              {selectedAnswers[currentQuestion] !== quizData[currentQuestion].correctAnswer && (
                <p style={{ marginBottom: "20px" }}>
                  Jawaban yang benar adalah:{" "}
                  <strong>{quizData[currentQuestion].options[quizData[currentQuestion].correctAnswer]}</strong>
                </p>
              )}
              <div style={styles.funFactText}>
                <strong>Fun Fact:</strong> {quizData[currentQuestion].funFact}
              </div>
            </div>
          </div>
        )}

        {/* Hint notification */}
        {showHint && (
          <div style={styles.hintNotification}>
            <p>Hint digunakan! Satu pilihan jawaban salah telah dieliminasi.</p>
          </div>
        )}

        {/* Correct/wrong animations */}
        {showCorrectAnimation && <div style={styles.correctAnimation}></div>}
        {showWrongAnimation && <div style={styles.wrongAnimation}></div>}

        {/* Confetti overlay */}
        {showConfetti && <div style={styles.confettiCanvas} ref={confettiRef}></div>}

        {/* Credit section */}
        <div style={styles.creditSection}>
          <p>© 2025 PLASMA PNM - Penguji Pemahaman Jurnalis & Media</p>
          <p>Dibuat dengan ❤️ untuk pecinta jurnalisme Indonesia</p>
        </div>

        {/* CSS animations */}
        <style>
          {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translate(-50%, 20px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }
          `}
        </style>
      </div>
    </div>
  )
}

export default Quiz