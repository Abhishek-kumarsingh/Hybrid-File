"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedGeminiChat } from "@/components/enhanced-gemini-chat";
import { AIAssistantLanding } from "@/components/ai-assistant-landing";
import { Sparkles, MessageSquare, Info, Zap } from "lucide-react";

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-purple-500" />
          AI Assistant
        </h1>
        <p className="text-muted-foreground">
          Powered by Google&apos;s Gemini 2.0 Flash model
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6 md:mb-8"
      >
        <TabsList className="w-full max-w-md">
          <TabsTrigger
            value="chat"
            className="flex items-center gap-1.5 flex-1"
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="flex items-center gap-1.5 flex-1"
          >
            <Info className="h-4 w-4" />
            About Gemini
          </TabsTrigger>
          <TabsTrigger
            value="examples"
            className="flex items-center gap-1.5 flex-1"
          >
            <Zap className="h-4 w-4" />
            Examples
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-4 md:mt-6">
          <EnhancedGeminiChat />
        </TabsContent>

        <TabsContent value="about" className="mt-4 md:mt-6">
          <AIAssistantLanding />
        </TabsContent>

        <TabsContent value="examples" className="mt-4 md:mt-6">
          <div className="max-w-4xl mx-auto bg-card border rounded-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              What Can Gemini Do?
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore these examples to see the capabilities of Gemini AI in
              action.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 bg-card">
                <h3 className="font-medium mb-2">Creative Writing</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Ask Gemini to write stories, poems, or scripts.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  &quot;Write a short story about a robot who discovers the
                  meaning of friendship&quot;
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-card">
                <h3 className="font-medium mb-2">Code Generation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get help with programming tasks.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  &quot;Create a React component that displays a countdown
                  timer&quot;
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-card">
                <h3 className="font-medium mb-2">Learning Assistance</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn new concepts with detailed explanations.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  &quot;Explain quantum computing in simple terms that a high
                  school student would understand&quot;
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-card">
                <h3 className="font-medium mb-2">Problem Solving</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get help with complex problems.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  &quot;What are some strategies to improve team communication
                  in a remote work environment?&quot;
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
