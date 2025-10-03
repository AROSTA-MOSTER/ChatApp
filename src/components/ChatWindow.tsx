import { useState } from "react";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MessageBubble from "./MessageBubble";

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  contact: Contact;
  onBack: () => void;
}

const ChatWindow = ({ contact, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How are you doing today?",
      timestamp: new Date(Date.now() - 3600000),
      isSent: false,
      status: 'read'
    },
    {
      id: "2", 
      text: "I'm doing great, thanks for asking! How about you?",
      timestamp: new Date(Date.now() - 3500000),
      isSent: true,
      status: 'read'
    },
    {
      id: "3",
      text: "That's awesome to hear! I'm having a productive day at work.",
      timestamp: new Date(Date.now() - 3400000),
      isSent: false,
      status: 'read'
    },
    {
      id: "4",
      text: "Nice! What are you working on?",
      timestamp: new Date(Date.now() - 120000),
      isSent: true,
      status: 'delivered'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: new Date(),
      isSent: true,
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-chat-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="font-medium text-sm">{contact.name}</h2>
            <p className="text-xs text-muted-foreground">
              {isTyping ? "typing..." : "online"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-card border-t border-border">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0"
          >
            <Smile className="h-4 w-4" />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          
          <Button
            type="submit"
            size="sm"
            disabled={!newMessage.trim()}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;