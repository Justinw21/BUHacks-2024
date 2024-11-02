const Card = ({ title, description, image, link }: { title: string, description: string, image: string, link: string }) => {
  return (
    <div
      className="w-full max-w-screen-lg mx-auto my-4 p-4 rounded-lg bg-[#e5f6f5] flex items-center shadow-md cursor-pointer"
      onClick={() => {
        window.open(link, "_blank");
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