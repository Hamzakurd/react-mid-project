
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./UseAuth";

const MESSAGES_KEY = "messages";
const APPROVED_KEY = "approvedMessages";
const MESSAGES_EVENT = "evWiseMessagesUpdated";

const readArray = (key) => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const getApproved = (messages) => {
  return messages.filter(
    (msg) =>
      String(msg.status || "").toLowerCase() === "approved"
  );
};

export const useMessages = () => {
  const { currentUser } = useAuth();

  const [messages, setMessages] = useState(() =>
    readArray(MESSAGES_KEY)
  );

  const [approvedMessages, setApprovedMessages] = useState(
    () => getApproved(readArray(MESSAGES_KEY))
  );

  useEffect(() => {
    const refreshMessages = () => {
      const savedMessages = readArray(MESSAGES_KEY);

      setMessages(savedMessages);
      setApprovedMessages(getApproved(savedMessages));
    };

    refreshMessages();

    window.addEventListener(
      MESSAGES_EVENT,
      refreshMessages
    );

    window.addEventListener(
      "storage",
      refreshMessages
    );

    window.addEventListener(
      "focus",
      refreshMessages
    );

    return () => {
      window.removeEventListener(
        MESSAGES_EVENT,
        refreshMessages
      );

      window.removeEventListener(
        "storage",
        refreshMessages
      );

      window.removeEventListener(
        "focus",
        refreshMessages
      );
    };
  }, []);

  const saveMessages = (updatedMessages) => {
    localStorage.setItem(
      MESSAGES_KEY,
      JSON.stringify(updatedMessages)
    );

    const approved = getApproved(updatedMessages);

    localStorage.setItem(
      APPROVED_KEY,
      JSON.stringify(approved)
    );

    setMessages(updatedMessages);
    setApprovedMessages(approved);

    window.dispatchEvent(
      new Event(MESSAGES_EVENT)
    );
  };

  const createMessage = async ({
    name,
    email,
    message,
    rating
  }) => {
    try {
      const username = String(
        name || currentUser?.name || ""
      ).trim();

      const userEmail = String(
        email || currentUser?.email || ""
      ).trim().toLowerCase();

      const userMessage = String(message || "").trim();
      const userRating = Number(rating);

      if (!username || !userMessage) {
        toast.error(
          "Please write your name and feedback!"
        );
        return false;
      }

      if (
        userEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
      ) {
        toast.error(
          "Please enter a valid email address!"
        );
        return false;
      }

      if (
        !Number.isInteger(userRating) ||
        userRating < 1 ||
        userRating > 5
      ) {
        toast.error(
          "Please select a rating from 1 to 5 stars!"
        );
        return false;
      }

      const newMessage = {
        id: crypto.randomUUID(),
        userId: currentUser?.id ?? null,
        username,
        userEmail,
        userMessage,
        userRating,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      const currentMessages = readArray(MESSAGES_KEY);

      saveMessages([
        ...currentMessages,
        newMessage
      ]);

      toast.success(
        "Your feedback was sent to admin for review!"
      );

      return true;
    } catch (error) {
      console.error("Create feedback error:", error);
      toast.error("Unable to send feedback!");
      return false;
    }
  };

  const updatedStatus = async (id, newStatus) => {
    try {
      const status = String(newStatus).toLowerCase();

      const allowedStatuses = [
        "pending",
        "approved",
        "rejected"
      ];

      if (!allowedStatuses.includes(status)) {
        toast.error("Invalid feedback status!");
        return false;
      }

      if (currentUser?.role !== "admin") {
        toast.error(
          "Only admins can manage feedback!"
        );
        return false;
      }

      const currentMessages = readArray(MESSAGES_KEY);

      const targetMessage = currentMessages.find(
        (msg) => String(msg.id) === String(id)
      );

      if (!targetMessage) {
        toast.error("Feedback not found!");
        return false;
      }

      if (status === "rejected") {
        const remainingMessages = currentMessages.filter(
          (msg) => String(msg.id) !== String(id)
        );

        saveMessages(remainingMessages);

        toast.success(
          "Feedback rejected and removed successfully!"
        );

        return true;
      }

      if (
        String(
          targetMessage.status || "pending"
        ).toLowerCase() === status
      ) {
        return true;
      }

      const updatedMessages = currentMessages.map(
        (msg) =>
          String(msg.id) === String(id)
            ? {
                ...msg,
                status,
                updatedAt: new Date().toISOString()
              }
            : msg
      );

      saveMessages(updatedMessages);

      toast.success(
        `Feedback ${status} successfully!`
      );

      return true;
    } catch (error) {
      console.error("Update feedback error:", error);
      toast.error("Unable to update feedback!");
      return false;
    }
  };

  const getApprovedMessages = () => {
    const currentMessages = readArray(MESSAGES_KEY);
    const approved = getApproved(currentMessages);

    setApprovedMessages(approved);

    return approved;
  };

  return {
    createMessage,
    updatedStatus,
    getApprovedMessages,
    messages,
    approvedMessages
  };
};
