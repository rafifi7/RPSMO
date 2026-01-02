import ActionBoxButton from './ActionBoxButton';

interface GameOverScreenProps {
    message: string;
    onBackToMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ message, onBackToMenu }) => {
    return (
        <div className="fixed z-50 flex flex-col items-center justify-center image-shadow-black" style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div className="bg-black/70 border-4 border-sg-pink rounded-lg px-20 py-16 text-center">
                <p className="text-white text-8xl font-black text-shadow-black text-glow-black mb-6">
                    GAME OVER
                </p>
                <p className="text-white text-4xl font-bold text-shadow-black mb-24">
                    {message}
                </p>
                <ActionBoxButton
                    label="Back to Menu"
                    onClick={onBackToMenu}
                    variant="secondary"
                />
            </div>
        </div>
    );
};

export default GameOverScreen;