import "./Lyrics.css";
import React, { useState, useEffect } from "react";
import Main from "./Main.tsx";
import levenshtein from "fast-levenshtein";

const Lyrics = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [song, setSong] = useState(null);
  const [tapCount, setTapCount] = useState(0);
  const [audioRef] = useState(React.createRef());
  const [recognizedText, setRecognizedText] = useState("");
  const [scores, setScores] = useState([]);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    if (song && currentLine < lyrics.find((lyric) => lyric.title === song).lyrics.length) {
      const interval = setInterval(() => {
        setCurrentLine((line) => line + 1);
      }, 3000);
      return () => clearInterval(interval);
    } else if (song && currentLine >= lyrics.find((lyric) => lyric.title === song).lyrics.length) {
      // Calculate final score after song ends
      const averageScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
      setFinalScore(averageScore);
    }
  }, [currentLine, song, scores]);

  const handleChange = (event) => {
    setSong(event.target.value);
    setCurrentLine(0);
    setScores([]);
    setFinalScore(null);

    if (event.target.value === "Twinkle, Twinkle, Little Star") {
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.src = "C:\\Users\\slssg\\OneDrive\\Documents\\SingSync\\sing-sync\\src\\Twinkle.mp3";
        audioElement.load();
        audioElement.play();
      }
    }
  };

  const handleTap = () => {
    setTapCount(tapCount + 1);
  };

  // Compare recognized text with the actual lyrics and calculate match percentage
  const compareWithLyrics = (line) => {
    const distance = levenshtein.get(line.toLowerCase(), recognizedText.toLowerCase());
    const similarityPercentage = ((1 - distance / Math.max(line.length, recognizedText.length)) * 100).toFixed(2);

    // Only add score for the current line once
    if (currentLine === scores.length) {
      setScores([...scores, parseFloat(similarityPercentage)]);
    }

    return similarityPercentage;
  };

  const lyrics = [
    {
      title: "Twinkle, Twinkle, Little Star",
      lyrics: [
        "Twinkle, twinkle,", "little star,",
        "How I wonder,", "what you are.",
        "Up above the,", "world so high,",
        "Like a diamond,", "in the sky.",
      ],
    },
    {
      title: "Old MacDonald Had a Farm",
      lyrics: [
        "Old MacDonald had a farm,",
        "E-I-E-I-O.",
        "And on his farm he had a cow,",
        "E-I-E-I-O.",
        "With a moo-moo here,",
        "And a moo-moo there,",
        "Here a moo, there a moo,",
        "Everywhere a moo-moo.",
      ],
    },
  ];

  return (
    <div className="app-container">
      <h1>Sing Sync</h1>
      <Main setRecognizedText={setRecognizedText} />
      <select className="song-select" onChange={handleChange}>
        <option value="">Select a song</option>
        {lyrics.map((lyric) => (
          <option key={lyric.title} value={lyric.title}>
            {lyric.title}
          </option>
        ))}
      </select>
      {song && (
        <div className="song-container">
          <h2>{song}</h2>
          <p>
            {lyrics
              .find((lyric) => lyric.title === song)
              .lyrics.map((line, index) => (
                <span
                  key={line}
                  className={index === currentLine ? "yellow-background" : ""}
                >
                  {line} - 
                  {index === currentLine ? ` ${compareWithLyrics(line)}% match` : ""}
                </span>
              ))}
          </p>
          {finalScore && (
            <div className="score-container">
              <h3>Final Score: {finalScore}%</h3>
            </div>
          )}
        </div>
      )}
      <div className="tap-container">
        <button className="circular-button" onClick={handleTap}>
          {tapCount}
        </button>
      </div>
    </div>
  );
}
export default Lyrics;