import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import OnboardingForm from "./forms/OnboardingForm";
import RecruitmentForm from "./forms/RecruitmentForm";
import WelcomeChat from "./WelcomeChat";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    teamSelcted,
    chatHistory,
    newChatClicked,
    formButtonClicked,
    hasChatHistory,
    chatManuallyButtonClicked
  } = useChatStore();
  // console.log(teamSelcted, "hehe");
  const { authUser } = useAuthStore();

  // useEffect(() => {
  //   getMessages(selectedUser._id)
  // }, [selectedUser._id, getMessages]);

  // if (isMessagesLoading)
  //   return (
  //     <div className="flex-1 flex flex-col overflow-auto">
  //       <ChatHeader />
  //       <MessageSkeleton />
  //       <MessageInput />
  //     </div>
  //   );

  const formRenderContent = () => {
    if (formButtonClicked) {
      // Show appropriate form based on team selection
      if (teamSelcted === "Recruitment Team") {
        return <RecruitmentForm />;
      } else if (teamSelcted === "Onboarding Team") {
        return <OnboardingForm />;
      }
    }

    // // Show welcome chat if there's chat history or new chat is clicked
    // if (hasChatHistory || newChatClicked || chatManuallyButtonClicked) {
    //   return <WelcomeChat />;
    // }

    // // Default welcome chat view
    // return <WelcomeChat />;
  };

  return (
    // <div className="flex-1 flex flex-col overflow-auto">
    //   <ChatHeader />
    //   {!hasChatHistory || newChatClicked ? (
    //     <WelcomeChat />
    //   ) : formButtonClicked ? (
    //     formRenderContent()
    //   ) : chatManuallyButtonClicked || !hasChatHistory (
    //     <>
    //       <div className="flex-1 overflow-y-auto p-4 space-y-4">

    //       </div>
    //       <MessageInput />
    //     </>
    //   )}
    // </div>

    <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader />
    {!hasChatHistory || newChatClicked ? (
      <WelcomeChat />
    ) : formButtonClicked ? (
      formRenderContent()
    ) : chatManuallyButtonClicked || !hasChatHistory ? ( // Fixed syntax
      <>
        <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>
        <MessageInput />
      </>
    ) : null} {/* Added a fallback */}
  </div>
  );
};

export default ChatContainer;
