import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownContent = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default MarkdownContent;
