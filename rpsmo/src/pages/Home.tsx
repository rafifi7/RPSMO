import { useNavigate } from 'react-router-dom';
import ActionBoxButton from '../components/ActionBoxButton';
const Home: React.FC = () => {
    const navigate = useNavigate(); // Get the navigation function


    return (
        <div className="min-h-screen flex flex-col  ">
            <div className="flex flex-col items-center py-16 px-10  mx-4">
                <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl">

                    <h1 className="
                        text-3xl 
                        sm:text-4xl
                        lg:text-5xl
                        font-bold
                        text-sg-pink
                        tracking-wider 
                        mb-6
                        text-glow-black
                        text-shadow-pink
                        whitespace-nowrap 
                    ">
                        Rock Paper Scissors
                    </h1>
                    <h2 className="
                        text-3xl 
                        sm:text-4xl
                        lg:text-5xl
                        font-extrabold
                        text-white
                        tracking-wider 
                        mb-48
                        text-shadow-white
                        text-glow-black
                        whitespace-nowrap 
                    ">
                        Minus One
                    </h2>

                    <div className="flex flex-col space-y-28 items-center w-full">
                        <ActionBoxButton
                            label="Singleplayer"
                            onClick={() => navigate('/singleplayer')}
                            // variant="primary"
                            variant="secondary"
                        />
                        <ActionBoxButton
                            label="Multiplayer"
                            onClick={() => navigate('/multiplayer')}
                            variant="secondary"
                        />
                        <ActionBoxButton
                            label="View Rules"
                            onClick={() => navigate('/rules')}
                            variant="secondary"
                        />
                    </div>
                </main>
            </div>
        </div>

    );
};

export default Home;