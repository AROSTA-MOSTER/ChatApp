import { useState } from "react";
import ContactList from "./ContactList";
import ChatWindow from "./ChatWindow";
import Profile from "./Profile";
import Settings from "./Settings";

interface ChatAppProps {
  phoneNumber: string;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const ChatApp = ({ phoneNumber }: ChatAppProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [currentView, setCurrentView] = useState<'chat' | 'profile' | 'settings'>('chat');
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alex Johnson",
      phone: "(555) 123-4567",
      lastMessage: "Hey, how are you doing?",
      lastMessageTime: "2m ago",
      unreadCount: 2
    },
    {
      id: "2", 
      name: "Sarah Williams",
      phone: "(555) 987-6543",
      lastMessage: "See you tomorrow!",
      lastMessageTime: "1h ago"
    },
    {
      id: "3",
      name: "Mike Chen",
      phone: "(555) 456-7890", 
      lastMessage: "Thanks for the help",
      lastMessageTime: "3h ago"
    },
    {
      id: "4",
      name: "Emma Davis",
      phone: "(555) 321-0987",
      lastMessage: "Good morning! 😊",
      lastMessageTime: "1d ago"
    }
  ]);

  if (currentView === 'profile') {
    return (
      <Profile
        phoneNumber={phoneNumber}
        onBack={() => setCurrentView('chat')}
      />
    );
  }

  if (currentView === 'settings') {
    return (
      <Settings
        onBack={() => setCurrentView('chat')}
      />
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Contact List */}
      <div className={`${selectedContact ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-border`}>
        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          userPhone={phoneNumber}
          onOpenProfile={() => setCurrentView('profile')}
          onOpenSettings={() => setCurrentView('settings')}
        />
      </div>

      {/* Chat Window */}
      <div className={`${selectedContact ? 'block' : 'hidden md:block'} flex-1`}>
        {selectedContact ? (
          <ChatWindow
            contact={selectedContact}
            onBack={() => setSelectedContact(null)}
          />
        ) : (
          <div className="hidden md:flex h-full items-center justify-center bg-chat-background">
            <div className="text-center text-muted-foreground">
              <div className="mb-4 text-6xl">💬</div>
              <h3 className="text-lg font-medium">Select a chat to start messaging</h3>
              <p className="text-sm">Choose from your contacts to begin a conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;