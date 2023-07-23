import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillChatSquareFill } from "react-icons/bs";

export const ChatSidebar = ({ chatId }) => {
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
  }, [chatId]);

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
            className={`side-menu-item  ${
              chatId === chat._id ? "bg-gray-700 hover:bg-gray-700" : ""
            }`}
          >
            <div>
              <BsFillChatSquareFill size={20} className="p-0 text-white/50" />
            </div>
            <span
              title={chat.title}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {chat.title}
            </span>
          </Link>
        ))}
      </div>
      <Link href="/api/auth/logout" className="side-menu-item">
        Logout
      </Link>
    </div>
  );
};
