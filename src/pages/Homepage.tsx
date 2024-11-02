import { logOut } from "@/services/authServices";
import { useNavigate} from 'react-router-dom';

import BottomNavbar from '@/components/ui/navbar';


function Homepage() {
    const navigate = useNavigate();

  const handleSignOut = async () => {
    await logOut();
    navigate('/signin');
  };
    return (
        <div>
            <h2>Home Page</h2>


            <button onClick={handleSignOut}>
      Sign Out
    </button>

            <BottomNavbar />

        </div>
    );
}

export default Homepage;
