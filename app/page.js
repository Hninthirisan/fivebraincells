"use client";
import React, { useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import MarkdownContent from "./Markdowncontent";
import "@mantine/core/styles.css";
import { Loader } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import Image from 'next/image'; // Import the Image component

const slogan = [
  { text: "I" },
  { text: "am" },
  { text: "the" },
  { text: "customized" },
  {
    text: "Hospital Assistant!!!",
    className: "text-blue-500 dark:text-blue-500",
  },
];

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyD6myRb4VEeQkc1aIFM_JTnivCd--ZxjfU");

function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApiRequest = async () => {
    setLoading(true);
    // Define an array of health-related keywords
    const keywords = [
      "hospital",
      "cancer",
      "surgery",
      "clinic",
      "emergency room",
      "doctor",
      "nurse",
      "patient",
      "treatment",
      "medicine",
      "ambulance",
      "healthcare",
      "ward",
      "trauma",
      "anesthesia",
      "radiology",
      "pediatrics",
      "obstetrics",
      "cardiology",
      "psychiatry",
      "orthopedics",
      "intensive care",
      "laboratory",
      "pharmacy",
      "rehabilitation",
      "oncology",
      "neurology",
      "endocrinology",
      "gynecology",
      "ophthalmology",
      "dermatology",
      "urology",
      "anesthesiology",
      "gastroenterology",
      "pulmonology",
      "hematology",
      "nephrology",
      "allergy",
      "pathology",
      "immunology",
      "infectious disease",
      "podiatry",
      "geriatrics",
      "plastic surgery",
      "radiography",
      "mammography",
      "electrocardiogram",
      "ultrasonography",
      "magnetic resonance imaging",
      "computed tomography",
      "prosthesis",
      "cardiac arrest",
      "chemotherapy",
      "radiotherapy",
      "palliative care",
      "autopsy",
      "epidemic",
      "pandemic",
      "epidural",
      "electroconvulsive therapy",
      "intravenous",
      "triage",
      "infusion",
      "inpatient",
      "outpatient",
      "general surgery",
      "plastic surgeon",
      "oncologist",
      "cardiologist",
      "radiologist",
      "neurologist",
      "brain",
      "spinal cord injury",
      "stroke",
      "cerebral hemorrhea",
      "aneurysm",
      "fever",
      "cells",
      "stress",
      "tumor",
      "pain",
      "cancer",
      "diabetes",
      "obesity",
      "heart disease",
      "hypertension",
      "blood pressure",
      "accident",
      "first aid",
      "blood",
      "body",
      "disease",
      "toxin",
      "โรงพยาบาล",
      "ဆေးရုံ"
    ];
    const containsKeyword = keywords.some((keyword) =>
      question.toLowerCase().includes(keyword)
    );

    try {
      // Check if the user's question contains hospital-related keywords
      if (!containsKeyword) {
        setAnswer(
          "I don't know what you are asking,  \n" +
          "I am a hospital related Assistant.  \n" +
          "One of **The Five Brain Cells** instructs me not to respond outside the boundary."
        );
        setLoading(false);
        return;
      }
      // Construct the query by joining the keywords with a space
      const query = keywords.join(" ");

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Modify the API request to include hospital-related keywords in the query
      const result = await model.generateContent(question, { query });

      const response = await result.response;
      const text = await response.text();

      // Assuming the API response structure contains the answer
      setAnswer(text);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors or display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApiRequest();
    setQuestion("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!loading) {
        handleSubmit(e);
      }
    }
  };

  return (
    <BackgroundGradientAnimation className="absolute h-full w-full flex items-center justify-center z-1">
      <div className="z-50 text-white font-bold px-4  md:text-md lg:text-xl">
        <div className="absolute top-1 left-1 p-1">
          <Image
            src={"/logo.png"} // Provide the path to your logo image file
            alt="Your Logo"
            width={200} // Set the width of the logo
            height={200} // Set the height of the logo
            className="object-contain"
          />
        </div>
        <p className="text-center mb-20 z-50 bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 text-3xl md:text-4xl lg:text-7xl">
          The FIVE Brain Cells <span className="text-lg">@ RIC</span>
        </p>
        <TypewriterEffectSmooth words={slogan} />
        <input
          placeholder="Type your Question?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyUp={handleKeyPress}
          className="z-20 mb-10 h-15 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 p-4 md:p-6 w-full z-10 bg-neutral-950 placeholder:text-neutral-700"
        />
        <div className="flex items-center justify-center h-full">
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center mb-10 h-12 animate-shimmer  rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            ASK ME
          </button>
        </div>
        {/* Show loading indicator if loading */}
        {loading && (
          <div className="flex items-center justify-center">
            <MantineProvider className="inline-flex items-center justify-center">
              <Loader color="grape" type="bars" size={30} />
            </MantineProvider>
          </div>
        )}
        {/* Show answer if available */}
        {!loading && answer && (
          <div className="p-10 max-h-80 overflow-y-auto">
            <MarkdownContent content={answer} />
          </div>
        )}
      </div>
    </BackgroundGradientAnimation>
  );
}

export default Home;
