import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate(); // Get the navigation function

  const goToAbout = () => {
    navigate('/about'); // Use the function to change the route
  };
  
  return (
    // ... other Home page content
    <button 
      onClick={goToAbout} 
      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
    >
      Go to About Page
    </button>
  );
};

export default About;