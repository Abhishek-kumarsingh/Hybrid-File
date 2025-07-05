"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { LoadingDots } from "./ai-loading-dots";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TypewriterEffect } from "./typewriter-effect";
import {
  Send,
  Sparkles,
  Brain,
  MessageSquare,
  Code,
  Image as ImageIcon,
  FileText,
  Copy,
  Check,
  AlertCircle,
  Lightbulb,
  Trash2,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Camera,
  ChevronRight,
  ChevronLeft,
  Zap,
  Wand2,
} from "lucide-react";

// Sample prompt suggestions by category
const PROMPT_SUGGESTIONS = {
  general: [
    "Explain quantum computing in simple terms",
    "What are the most effective ways to reduce stress?",
    "Tell me about the latest advancements in renewable energy",
    "How does machine learning work?",
  ],
  creative: [
    "Write a short story about a robot learning to feel emotions",
    "Create a poem about the changing seasons",
    "Suggest 5 creative team building activities",
    "Design a character for a sci-fi novel",
  ],
  coding: [
    "Create a JavaScript function to sort an array of objects by a property",
    "Explain the differences between REST and GraphQL APIs",
    "Write a Python function to find prime numbers",
    "How do I implement authentication in a React app?",
  ],
  business: [
    "Generate a marketing plan for a new eco-friendly product",
    "What are the best practices for sustainable web development?",
    "Create a SWOT analysis template",
    "How to improve team communication in remote work environments",
  ],
};

// Sample conversation starters
const CONVERSATION_STARTERS = [
  {
    title: "Interview Preparation",
    description: "Get help preparing for job interviews",
    icon: MessageSquare,
    prompt:
      "Help me prepare for a frontend developer interview. What are the most common questions and how should I answer them?",
  },
  {
    title: "Code Debugging",
    description: "Get help fixing code issues",
    icon: Code,
    prompt:
      "Debug this React code: function Component() { const [count, setCount] = useState(0); useEffect(() => { setCount(count + 1) }, [count]); return <div>{count}</div>; }",
  },
  {
    title: "Content Creation",
    description: "Generate creative content",
    icon: FileText,
    prompt:
      "Write a compelling product description for a new smart water bottle that tracks hydration and syncs with fitness apps.",
  },
  {
    title: "Learning Assistant",
    description: "Learn new concepts and skills",
    icon: Brain,
    prompt:
      "Explain how blockchain technology works and its real-world applications beyond cryptocurrency.",
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  feedback?: "positive" | "negative";
  isTyping?: boolean;
}

export function EnhancedGeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestionCategory, setSuggestionCategory] =
    useState<keyof typeof PROMPT_SUGGESTIONS>("general");
  const [copied, setCopied] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [prompt]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent, submittedPrompt?: string) => {
    e.preventDefault();
    const promptToSend = submittedPrompt || prompt;
    if (!promptToSend.trim()) return;

    // Add user message immediately
    const userMessage: Message = {
      role: "user",
      content: promptToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");
    setPrompt("");

    try {
      // Call the actual Gemini API
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptToSend }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to get response from Gemini API");
      }

      // Extract the text from the Gemini API response
      const responseText = data.text || "No response text found";

      const assistantMessage: Message = {
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("Error calling Gemini API:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopied(`${index}`);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClearConversation = () => {
    setMessages([]);
    setPrompt("");
    setError("");
  };

  const handlePromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFeedback = (index: number, type: "positive" | "negative") => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, feedback: type } : msg))
    );
  };

  const toggleRecording = () => {
    // In a real implementation, this would start/stop voice recording
    setRecording(!recording);
    if (!recording) {
      // Simulate starting recording
      setTimeout(() => {
        setRecording(false);
        setPrompt(
          "This is a transcribed voice message. In a real implementation, this would be the text converted from your voice input."
        );
      }, 3000);
    }
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    // In a real implementation, you might want to use the Fullscreen API
  };

  return (
    <div
      className={`w-full mx-auto transition-all duration-300 ${
        fullscreen ? "fixed inset-0 z-50 bg-background" : "max-w-6xl"
      }`}
    >
      <div className="flex flex-col h-full">
        {fullscreen && (
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h2 className="font-semibold">Gemini AI Assistant</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div
          className={`flex ${sidebarOpen ? "space-x-4" : "space-x-0"} h-full`}
        >
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <Card
              className={`flex flex-col ${
                fullscreen
                  ? "h-[calc(100vh-60px)] rounded-none border-0"
                  : "h-[calc(80vh)]"
              }`}
            >
              <CardHeader className="pb-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {!sidebarOpen && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                        className="h-8 w-8 lg:hidden"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        AI Assistant
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Powered by New Generation AI
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="hidden md:flex px-3 py-1 bg-purple-50 dark:bg-purple-900/20"
                    >
                      <Brain className="h-3.5 w-3.5 mr-1 text-purple-500" />
                      <span className="text-xs font-medium">AI Powered</span>
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="h-8 w-8"
                    >
                      {fullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Messages Area */}
              <CardContent
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto pb-0 px-3 sm:px-4 md:px-6 break-long-words"
              >
                {messages.length === 0 && !loading && !error ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                      <Sparkles className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">
                      How can I help you today?
                    </h3>
                    <p className="text-muted-foreground max-w-md mb-8">
                      Ask me anything, request creative content, solve problems,
                      or try one of the conversation starters below.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                      {CONVERSATION_STARTERS.map((starter, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left"
                            onClick={(e) => handleSubmit(e, starter.prompt)}
                          >
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                              <starter.icon className="h-4 w-4 text-purple-500" />
                            </div>
                            <div>
                              <p className="font-medium">{starter.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {starter.description}
                              </p>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 py-4">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="group"
                        >
                          <div
                            className={`flex gap-3 ${
                              message.role === "assistant" ? "mb-6" : "mb-4"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.role === "user"
                                  ? "bg-blue-100 dark:bg-blue-900/30"
                                  : "bg-purple-100 dark:bg-purple-900/30"
                              }`}
                            >
                              {message.role === "user" ? (
                                <span className="text-blue-700 dark:text-blue-400 text-sm font-semibold">
                                  You
                                </span>
                              ) : (
                                <Sparkles className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">
                                  {message.role === "user"
                                    ? "You"
                                    : "Gemini AI"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(
                                    message.timestamp
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>

                              <div
                                className={`relative rounded-lg p-4 ${
                                  message.role === "user"
                                    ? "bg-blue-50 dark:bg-blue-900/10 text-foreground"
                                    : "bg-purple-50 dark:bg-purple-900/10 text-foreground"
                                }`}
                              >
                                {message.role === "assistant" ? (
                                  <div className="prose prose-sm dark:prose-invert max-w-none break-words overflow-hidden">
                                    {message.isTyping ? (
                                      <TypewriterEffect
                                        text={message.content}
                                        speed={20}
                                        onComplete={() => {
                                          setMessages((prev) =>
                                            prev.map((msg, i) =>
                                              i === index
                                                ? { ...msg, isTyping: false }
                                                : msg
                                            )
                                          );
                                        }}
                                      />
                                    ) : (
                                      <ReactMarkdown
                                        components={{
                                          code: ({
                                            node,
                                            inline,
                                            className,
                                            children,
                                            ...props
                                          }: any) => {
                                            const match = /language-(\w+)/.exec(
                                              className || ""
                                            );
                                            return !inline && match ? (
                                              <div className="max-w-full overflow-x-auto">
                                                <SyntaxHighlighter
                                                  style={vscDarkPlus}
                                                  language={match[1]}
                                                  PreTag="div"
                                                  wrapLines={true}
                                                  wrapLongLines={true}
                                                  customStyle={{
                                                    maxWidth: "100%",
                                                    overflowX: "auto",
                                                  }}
                                                  {...props}
                                                >
                                                  {String(children).replace(
                                                    /\n$/,
                                                    ""
                                                  )}
                                                </SyntaxHighlighter>
                                              </div>
                                            ) : (
                                              <code
                                                className={className}
                                                {...props}
                                              >
                                                {children}
                                              </code>
                                            );
                                          },
                                          pre: ({ node, ...props }) => (
                                            <pre
                                              className="overflow-x-auto max-w-full"
                                              {...props}
                                            />
                                          ),
                                          p: ({ node, ...props }) => (
                                            <p
                                              className="whitespace-pre-wrap break-words"
                                              {...props}
                                            />
                                          ),
                                          a: ({ node, ...props }) => (
                                            <a
                                              className="break-all"
                                              {...props}
                                            />
                                          ),
                                          ul: ({ node, ...props }) => (
                                            <ul
                                              className="list-disc pl-6 space-y-2"
                                              {...props}
                                            />
                                          ),
                                          ol: ({ node, ...props }) => (
                                            <ol
                                              className="list-decimal pl-6 space-y-2"
                                              {...props}
                                            />
                                          ),
                                          li: ({ node, ...props }) => (
                                            <li className="pl-1" {...props} />
                                          ),
                                        }}
                                      >
                                        {message.content}
                                      </ReactMarkdown>
                                    )}
                                  </div>
                                ) : (
                                  <div className="whitespace-pre-wrap break-words overflow-hidden">
                                    {message.content.startsWith("1.") ||
                                    message.content.startsWith("- ") ? (
                                      <ReactMarkdown
                                        components={{
                                          ul: ({ node, ...props }) => (
                                            <ul
                                              className="list-disc pl-6 space-y-2"
                                              {...props}
                                            />
                                          ),
                                          ol: ({ node, ...props }) => (
                                            <ol
                                              className="list-decimal pl-6 space-y-2"
                                              {...props}
                                            />
                                          ),
                                          li: ({ node, ...props }) => (
                                            <li className="pl-1" {...props} />
                                          ),
                                        }}
                                      >
                                        {message.content}
                                      </ReactMarkdown>
                                    ) : (
                                      <p>{message.content}</p>
                                    )}
                                  </div>
                                )}

                                {/* Message actions */}
                                <div
                                  className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ${
                                    message.role === "user"
                                      ? "bg-blue-50/80 dark:bg-blue-900/30"
                                      : "bg-purple-50/80 dark:bg-purple-900/30"
                                  } backdrop-blur-sm rounded p-1`}
                                >
                                  {message.role === "assistant" && (
                                    <>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6"
                                        onClick={() =>
                                          handleFeedback(index, "positive")
                                        }
                                      >
                                        <ThumbsUp
                                          className={`h-3.5 w-3.5 ${
                                            message.feedback === "positive"
                                              ? "text-green-500 fill-green-500"
                                              : ""
                                          }`}
                                        />
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6"
                                        onClick={() =>
                                          handleFeedback(index, "negative")
                                        }
                                      >
                                        <ThumbsDown
                                          className={`h-3.5 w-3.5 ${
                                            message.feedback === "negative"
                                              ? "text-red-500 fill-red-500"
                                              : ""
                                          }`}
                                        />
                                      </Button>
                                      <Separator
                                        orientation="vertical"
                                        className="h-4 my-auto"
                                      />
                                    </>
                                  )}
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6"
                                    onClick={() =>
                                      handleCopyMessage(message.content, index)
                                    }
                                  >
                                    {copied === `${index}` ? (
                                      <Check className="h-3.5 w-3.5 text-green-500" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              {/* Feedback confirmation */}
                              {message.role === "assistant" &&
                                message.feedback && (
                                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                                    {message.feedback === "positive" ? (
                                      <>
                                        <ThumbsUp className="h-3 w-3" />
                                        <span>Thanks for your feedback!</span>
                                      </>
                                    ) : (
                                      <>
                                        <ThumbsDown className="h-3 w-3" />
                                        <span>
                                          Thanks for your feedback. We will work
                                          to improve.
                                        </span>
                                      </>
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Loading message */}
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex gap-3 mb-6">
                          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">
                                Gemini AI
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date().toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4">
                              <div className="flex items-center gap-3">
                                <LoadingDots className="text-purple-500" />
                                <p className="text-sm text-muted-foreground animate-pulse">
                                  Generating response...
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-4 w-4 text-red-700 dark:text-red-400" />
                          </div>

                          <div className="flex-1">
                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-4 text-red-700 dark:text-red-400 text-sm flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                              <span>{error}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Invisible element to scroll to */}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </CardContent>

              {/* Input Area */}
              <CardFooter className="pt-4 pb-4 border-t mt-auto">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="relative">
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full"
                        onClick={toggleRecording}
                      >
                        {recording ? (
                          <MicOff className="h-4 w-4 text-red-500" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>

                    <Textarea
                      ref={textareaRef}
                      placeholder={
                        recording ? "Listening..." : "Message Gemini AI..."
                      }
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="pl-[5.5rem] pr-24 min-h-[60px] max-h-[200px] resize-none py-3 bg-muted/30"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      disabled={recording}
                    />

                    <div className="absolute right-2 bottom-2 flex gap-2">
                      {messages.length > 0 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={handleClearConversation}
                          title="Clear conversation"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        type="submit"
                        size="sm"
                        className="h-8 px-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        disabled={loading || (!prompt.trim() && !recording)}
                      >
                        {loading ? (
                          <LoadingDots className="mx-2" />
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5 mr-1" />
                            Send
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {recording ? (
                    <p className="text-xs text-red-500 animate-pulse mt-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                      Recording... Click the microphone icon to stop.
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Shift + Enter for a new line. Enter to send.
                    </p>
                  )}
                </form>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[280px] lg:max-w-[320px] relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="absolute -left-3 top-3 h-6 w-6 rounded-full bg-background border z-10 lg:hidden"
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>

                <div className="space-y-4">
                  {/* Suggestion Categories */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span>Prompt Suggestions</span>
                        <Wand2 className="h-4 w-4 text-purple-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Tabs
                        defaultValue="general"
                        value={suggestionCategory}
                        onValueChange={(value) =>
                          setSuggestionCategory(
                            value as keyof typeof PROMPT_SUGGESTIONS
                          )
                        }
                        className="w-full"
                      >
                        <TabsList className="grid grid-cols-4 h-8 w-full">
                          <TabsTrigger value="general" className="text-xs">
                            General
                          </TabsTrigger>
                          <TabsTrigger value="creative" className="text-xs">
                            Creative
                          </TabsTrigger>
                          <TabsTrigger value="coding" className="text-xs">
                            Coding
                          </TabsTrigger>
                          <TabsTrigger value="business" className="text-xs">
                            Business
                          </TabsTrigger>
                        </TabsList>

                        {Object.entries(PROMPT_SUGGESTIONS).map(
                          ([category, suggestions]) => (
                            <TabsContent
                              key={category}
                              value={category}
                              className="mt-3 space-y-2"
                            >
                              {suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  className="w-full justify-start h-auto py-2 text-left text-sm"
                                  onClick={() =>
                                    handlePromptSuggestion(suggestion)
                                  }
                                >
                                  <Lightbulb className="h-3.5 w-3.5 mr-2 flex-shrink-0 text-purple-500" />
                                  <span className="truncate">{suggestion}</span>
                                </Button>
                              ))}
                            </TabsContent>
                          )
                        )}
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Capabilities */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span>Capabilities</span>
                        <Zap className="h-4 w-4 text-purple-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full">
                            <MessageSquare className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Natural Conversations
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Ask questions in a conversational way
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                            <Code className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Code Generation
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Create and debug code in multiple languages
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-full">
                            <FileText className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Content Creation
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Generate creative text formats like poems,
                              stories, and more
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full">
                            <ImageIcon
                              className="h-3.5 w-3.5 text-green-600 dark:text-green-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Image Understanding
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Analyze and describe images (coming soon)
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Model Information */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">2.0 Flash</p>
                          <p className="text-xs text-muted-foreground">
                            {" "}
                            Advanced AI model
                          </p>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• Fast, efficient responses</p>
                        <p>• Optimized for chat interactions</p>
                        <p>• Supports code, creative content, and more</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
