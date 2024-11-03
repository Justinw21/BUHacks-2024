import React from "react";

type CardProps = {
  title: string;
  description: string;
  image: string;
  link?: string;
  color?: string;
};

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace("#", "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

const Card: React.FC<CardProps> = ({ title, description, image, link, color }) => {
  const [r, g, b] = color ? hexToRgb(color) : [229, 246, 245];

  return (
    <div
      className="w-full max-w-screen-lg mx-auto my-4 p-4 rounded-lg flex items-center shadow-md cursor-pointer"
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
      }}
      
      onClick={() => {
        if(link){
          window.open(link, "_blank");
        }
      }}
    >
      <img className="w-10 h-10 mr-4" src={image} alt={title} />

      <div className="text-left">
        <h2 className="text-gray-800 font-semibold text-sm">{title}</h2>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default Card;