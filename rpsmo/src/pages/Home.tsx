import { useNavigate } from 'react-router-dom';
import ActionBoxButton from '../components/ActionBoxButton';

const Home: React.FC = () => {
    const navigate = useNavigate(); // Get the navigation function


    return (
        <div className="min-h-screen flex flex-col bg-gray-900 border-l border-r border-sg-pink">
            <div className="flex flex-col items-center py-16 px-10  bg-gray-900 mx-4">
                <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sg-pink tracking-wider mb-32 whitespace-nowrap">
                        Rock Paper Scissors Minus One
                    </h1>

                    <div className="flex flex-col space-y-24 items-center w-full">
                        <ActionBoxButton
                            label="Singleplayer"
                            onClick={() => navigate('/singleplayer')}
                            variant="primary"
                        />
                        <ActionBoxButton
                            label="Multiplayer"
                            onClick={() => navigate('/multiplayer')}
                            variant="primary"
                        />
                        <ActionBoxButton
                            label="View Rules"
                            onClick={() => navigate('/rules')}
                            variant="primary"
                        />
                    </div>
                </main>
            </div>
        </div>

    );
};

export default Home;