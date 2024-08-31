import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// Styled component for VolumeUpIcon

const StyledVolumeUpIcon = styled(({ isSpeaking, ...other }) => (
  <VolumeUpIcon {...other} />
))(({ isSpeaking }) => ({
  width: "30px",
  height: "30px",
  color: isSpeaking ? "#065DE0" : "inherit", // Blue when speaking, otherwise default color
  cursor: "pointer",
  "&:hover": {
    color: "#0040A0", // Darker color on hover
  },
}));

const TextToSpeech = ({ text }) => {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const updateVoiceList = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // 음성 목록이 로드된 후 업데이트
    updateVoiceList();

    // 음성 목록 변경 이벤트 핸들러 설정
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoiceList;
    }

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    // return () => {
    //   if (window.speechSynthesis.onvoiceschanged !== undefined) {
    //     window.speechSynthesis.onvoiceschanged = null;
    //   }
    // };
  }, []);

  const speak = (text) => {
    // //console.log("speak", speak);
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length === 0) {
      console.error("No voices available.");
      return;
    }

    const hindiVoice = availableVoices.find(
      (voice) => voice.lang === "hi-IN" && voice.name === "Google हिन्दी"
    );

    if (!hindiVoice) {
      console.error("Google हिन्दी 음성을 찾을 수 없습니다.");
      return;
    }

    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = hindiVoice;
    utterance.lang = "hi-IN";

    // 볼륨과 속도 설정
    utterance.volume = 1; // 최대 볼륨
    utterance.rate = 1; // 기본 속도

    utterance.onstart = () => {
      // //console.log("Speech started.");
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      // //console.log("Speech ended.");
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error speaking text:", error);
    }
  };

  return (
    <div>
      <StyledVolumeUpIcon
        onClick={() => speak(text)}
        isSpeaking={isSpeaking}
        disabled={isSpeaking}
      >
        {isSpeaking ? "Speaking..." : "Speak"}
      </StyledVolumeUpIcon>
    </div>
  );
};

export default TextToSpeech;
