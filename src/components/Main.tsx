import React from 'react';
import useSpeechRecognition from "C:\\Users\\slssg\\OneDrive\\Documents\\SingSync\\sing-sync\\src\\hooks\\useSpeechRecognitionHook.ts";

const Main = () => {
    const {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    return (
        <div>
            {hasRecognitionSupport ? (
                <>
                    <div>
                        <button onClick={startListening}>Start Listening</button>
                    </div>
                    <input type="text" value={text} readOnly style={{
                            width: '80%',
                            padding: '.',
                            fontSize: '16px',
                            margin: '20px auto',
                            wordWrap: 'break-word',
                        }} />
                </>
            ) : (
                <h1>Your browser has no speech recognition support.</h1>
            )}
        </div>
    );
}

export default Main;