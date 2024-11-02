import BottomNavbar from "@/components/ui/navbar";
import Card from "@/components/ui/card";

function Friends() {
  const data = [
    {
      title: "1",
      description: "1",
      image: "./vite.svg",
      link: "https://github.com/Justinw21/BUHacks-2024",
    },
    {
      title: "2",
      description: "2",
      image: "./vite.svg",
      link: "https://github.com/Justinw21/BUHacks-2024",
    },
    {
      title: "3",
      description: "3",
      image: "./vite.svg",
      link: "https://github.com/Justinw21/BUHacks-2024",
    },
  ];

  return (
    <div>
      <h2>Friends Page</h2>
      <div className="flex flex-col w-full px-3 gap-y-4">
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Friends;
