import ActionBoxButton from './ActionBoxButton';

interface RulesCardProps {
    onPlay: () => void;
    onBack: () => void;
}

const RulesCard: React.FC<RulesCardProps> = ({ onPlay, onBack }) => {
    return (
        <div className="flex flex-col space-y-24 items-center w-full">
            <div className="card-rules bg-sg-dark-teal/90 border-sg-teal">
                <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tighter text-shadow-black">
                    Singleplayer
                </h2>
                <div className="space-y-4 text-white font-medium mb-8 text-2xl text-shadow-black">
                    <p>1. You are against a computer</p>
                    <p>2. Each round, you have <span className="font-black">5</span> seconds to select both of your hands </p>
                    <p>3. If you are unable to select in time, you will lose the round</p>
                    <p>4. On "Minus One", you will have <span className="font-black">2</span> seconds to select a hand to remove</p>
                    <p>5. Good Luck!</p>
                </div>
            </div>
            <div className="flex flex-row space-x-8 items-center justify-center w-full">
                <ActionBoxButton
                    label="Play Minus One"
                    onClick={onPlay}
                    variant="primary"
                />
                <ActionBoxButton
                    label="Back to Menu"
                    onClick={onBack}
                    variant="primary"
                />
            </div>
        </div>
    );
};

export default RulesCard;