import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { logOut } from "@/services/authServices";

export default function CompletedActivity() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">You Completed Today's Activity!</h1>
        <p className="mt-4 text-lg">Great job! Come back tomorrow for more.</p>
      </div>
      <Button onClick={handleSignOut} className="mt-6">
        Sign Out
      </Button>
    </div>
  );
}