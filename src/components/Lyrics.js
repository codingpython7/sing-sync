import "./Lyrics.css";
import React, { useState, useEffect } from "react";
import Main from "./Main.tsx";

const Lyrics = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [song, setSong] = useState(null);
  const [tapCount, setTapCount] = useState(0);
  const [audioRef] = useState(React.createRef()); // Create a reference for the audio element

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((currentLine) => currentLine + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentLine]);

  const handleChange = (event) => {
    setSong(event.target.value);
    setCurrentLine(0);

    // Play audio when Twinkle, Twinkle, Little Star is selected
    if (event.target.value === "Twinkle, Twinkle, Little Star") {
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.src = "C:\\Users\\slssg\\OneDrive\\Documents\\SingSync\\sing-sync\\src\\Twinkle.mp3"; // Set audio source
        audioElement.load(); // Load the audio file
        audioElement.play(); // Play the audio
      }
    }
  };

  const handleTap = () => {
    setTapCount(tapCount + 1);
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
      <Main />
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
                  {line}
                </span>
              ))}
          </p>
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