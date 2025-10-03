import { Check, CheckCheck, Clock } from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case 'sent':
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.isSent
            ? 'bg-chat-bubble-sent text-chat-bubble-sent-foreground rounded-br-md'
            : 'bg-chat-bubble-received text-chat-bubble-received-foreground rounded-bl-md'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${
          message.isSent ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs opacity-70">
            {formatTime(message.timestamp)}
          </span>
          {message.isSent && (
            <span className="opacity-70">
              {getStatusIcon()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;