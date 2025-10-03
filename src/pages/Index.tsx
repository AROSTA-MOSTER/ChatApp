import { useState } from "react";
import PhoneRegistration from "@/components/PhoneRegistration";
import ChatApp from "@/components/ChatApp";

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegistration = (phone: string) => {
    setPhoneNumber(phone);
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {!isRegistered ? (
        <PhoneRegistration onRegister={handleRegistration} />
      ) : (
        <ChatApp phoneNumber={phoneNumber} />
      )}
    </div>
  );
};

export default Index;
