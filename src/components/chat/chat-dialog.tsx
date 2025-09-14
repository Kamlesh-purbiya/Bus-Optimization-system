"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, MessageSquare, Send, User, Loader2 } from "lucide-react";
import { handleChat } from "./actions";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "model";
  content: string;
};

export function ChatDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const onSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: [{ text: msg.content }],
    }));

    const result = await handleChat({
      history: chatHistory,
      message: input,
    });

    if ("error" in result) {
      const errorMessage: Message = {
        role: "model",
        content: `Sorry, something went wrong: ${result.error}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } else {
      const modelMessage: Message = {
        role: "model",
        content: result.response,
      };
      setMessages((prev) => [...prev, modelMessage]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
        size="icon"
      >
        <MessageSquare className="h-7 w-7" />
        <span className="sr-only">Open Chat</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] grid-rows-[auto_1fr_auto] h-[80vh]">
          <DialogHeader>
            <DialogTitle>Chat with Sage</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-grow p-4 border-y" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "model" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[80%]",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                   {message.role === "user" && (
                     <Avatar className="h-8 w-8">
                       <AvatarFallback>
                         <User />
                       </AvatarFallback>
                     </Avatar>
                   )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-3 py-2 bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="p-4">
            <div className="flex items-center w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                disabled={isLoading}
              />
              <Button onClick={onSend} disabled={isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
