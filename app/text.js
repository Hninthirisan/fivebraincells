"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
require("dotenv").config();
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Textarea } from "@nextui-org/react";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyD6myRb4VEeQkc1aIFM_JTnivCd--ZxjfU");

function Page() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleApiRequest = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(question);
      const response = await result.response;
      const text = await response.text();

      // Assuming the API response structure contains the answer
      setAnswer(text);

      setDialogOpen(false); // Close the dialog box
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors or display an error message to the user
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApiRequest();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card
        className="bg-cover w-full h-full flex content-center items-center justify-center flex-col"
        style={{ backgroundImage: "url('/blue.jpg')" }}>
        <h1 className="text-5xl m-10 font-bold text-sky-300">
          The Five Brain Cells Hospital
        </h1>
        <Card className="glass-card bg-opacity-5 bg-cyan-400 bg-blur-md backdrop-filter blackdrop-blur-md rounded-md shadow-lg w-[800px] border-none">
          <p className="text-l text-white m-5 p-5 text-muted-foreground">
            {answer && <span>Answer: {answer}</span>}
          </p>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="rounded-xl bg-sky-900 m-10"
              variant="destructive">
              Ask me
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-7xl">
            <DialogHeader>
              <DialogTitle>Ask me</DialogTitle>
              <DialogDescription>
                I am the customized support chat of 5 Brain Cells Hospital
              </DialogDescription>
            </DialogHeader>

            <div className="w-full flex justify-center items-center">
              <Textarea
                className="w-full"
                placeholder="Type your question here."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}

export default Page;
