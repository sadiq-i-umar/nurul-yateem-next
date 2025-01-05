import { useRouter } from "next/navigation";
import { navItems } from "./data";

const WebsiteNav = () => {
  const router = useRouter();
  return (
    <div className="flex items-center py-4">
      <img src="/nurul_yateem_logo.png" width={120} height={60} />
      <div className="flex items-center flex-grow justify-end font-semibold">
        <div className="flex gap-8">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="px-8 py-2 text-[#006837] border-2 border-[#006837] rounded-md hover:bg-[#006837] hover:text-white"
              onClick={() => router.push(item.route)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteNav;
