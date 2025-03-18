"use client"
import React from "react";
interface InfoCard {
  image: string;
  title: string;
  date: string;
  progress: number;
  description: string;
}
const InfoCard: React.FC<InfoCard> = ({ image, title, date, progress, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-78">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-2xl" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">Operation Save the Children</h3>
        <p className="text-gray-500 text-sm">22 Jan 2022</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${progress}%`, maxWidth: "100%" }}
            ></div>
          </div>
          <p className="text-sm font-medium">{progress}%</p>
        </div>
        <p className="text-gray-600 text-sm mt-2">Pupil need to have uniforms for school and are in dire need. The more you reach out the more you get help as well. The objective is to reach out to 5000 Orphaned children.</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button className=" font-semibold">View</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">Donate</button>
        </div>
      </div>
    </div>

    
  );
};

const CardList: React.FC = () => {
  const cards = [
    { image: "https://via.placeholder.com/300",  date: "22 Jan 2022", progress: 70, description: "" },
    { image: "https://via.placeholder.com/300", date: "22 Jan 2022", progress: 30, description: "" },
    { image: "https://via.placeholder.com/300",  date: "22 Jan 2022", progress: 0, description: "" },
    { image: "https://via.placeholder.com/300",  date: "22 Jan 2022", progress: 50, description: "" },
    { image: "https://via.placeholder.com/300",  date: "22 Jan 2022", progress: 90, description: "" },
    { image: "https://via.placeholder.com/300",  date: "22 Jan 2022", progress: 10, description: "" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-1 bg-gray-100 min-h-screen">
      {cards.map((card, index) => (
        <InfoCard title={""} key={index} {...card} />
      ))}
    </div>
  );
};

export default CardList;



