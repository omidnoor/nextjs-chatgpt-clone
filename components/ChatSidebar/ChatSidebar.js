import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillChatSquareFill } from "react-icons/bs";

const ChatSidebar = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const loadChatList = async () => {
      const response = await fetch("/api/chat/getChatList", {
        method: "POST",
      });
      const json = await response.json();
      setChatList(json?.chats || []);
    };
    loadChatList();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden bg-gray-900 text-white">
      <Link
        href="/chat"
        className="side-menu-item bg-emerald-500 hover:bg-emerald-600"
      >
        <AiOutlinePlus />
        New chat
      </Link>
      <div className=" flex-1  overflow-auto bg-gray-950">
        {chatList?.map((chat) => (
          <Link
            href={`/chat/${chat._id}`}
            key={chat._id}
            className="side-menu-item"
          >
            <BsFillChatSquareFill size={20} className="p-0" />
            {chat.title}
          </Link>
        ))}
      </div>
      <Link href="/api/auth/logout" className="side-menu-item">
        Logout
      </Link>
    </div>
  );
};
export default ChatSidebar;
