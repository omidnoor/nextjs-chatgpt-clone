import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { BsRobot } from "react-icons/bs";
import ReactMarkdown from "react-markdown";

const Message = ({ role, content }) => {
  const { user } = useUser();

  return (
    <div
      className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${
        role === "assistant"
          ? "bg-gray-600"
          : role === "notice"
          ? "bg-red-600"
          : ""
      }`}
    >
      <div className="">
        {role === "user" && !!user && (
          <Image
            src={user.picture}
            width={30}
            height={30}
            alt="User Avatar"
            className="rounded-sm shadow-md shadow-black/50"
          />
        )}
        {role === "assistant" && (
          <div
            className="flex w-[30px] items-center justify-center 
           rounded-sm bg-gray-900 shadow-md shadow-black/50"
          >
            <BsRobot size={30} className="p-1 text-emerald-200" />
          </div>
        )}
      </div>
      <div className="prose prose-invert">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};
export default Message;
