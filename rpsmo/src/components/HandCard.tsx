import rockImg from '../images/rock.png'; // Adjust path to your images
import paperImg from '../images/paper.png';
import scissorsImg from '../images/scissors.png';

interface HandCardProps {
    side: 'left' | 'right';
    selectedHand: string;
    onSelectHand: (hand: string) => void;
}

const HandCard: React.FC<HandCardProps> = ({ side, selectedHand, onSelectHand }) => {
    const position = side === 'left' ? '32.5%' : '67.5%';

    const handImages: { [key: string]: string } = {
        'Rock': rockImg,
        'Paper': paperImg,
        'Scissors': scissorsImg
    };

    return (
        <div className="fixed z-40 flex flex-row gap-6 items-center justify-center" style={{
            top: '75%',
            left: position,
            transform: 'translate(-50%, -50%)'
        }}>
            <div className="bg-sg-dark-teal/70 border-2 border-sg-teal rounded-lg px-8 py-6 backdrop-blur-sm flex flex-col items-center justify-center">
                <h3 className="text-4xl font-black text-white mb-4 text-shadow-black">
                    {side.toUpperCase()} HAND
                </h3>
                <div className="flex flex-row gap-6">
                    <button
                        onClick={() => onSelectHand("Rock")}
                        className="hover:scale-110 transition-transform"
                    >
                        <img src={rockImg} alt="Rock" className="w-28 h-28 image-shadow-black" />
                    </button>
                    <button
                        onClick={() => onSelectHand("Paper")}
                        className="hover:scale-110 transition-transform"
                    >
                        <img src={paperImg} alt="Paper" className="w-28 h-28 image-shadow-black" />
                    </button>
                    <button
                        onClick={() => onSelectHand("Scissors")}
                        className="hover:scale-110 transition-transform"
                    >
                        <img src={scissorsImg} alt="Scissors" className="w-28 h-28 image-shadow-black" />
                    </button>
                </div>

                {/* Show selected image */}
                <div className="mt-4 flex flex-col items-center">
                    <h3 className="text-2xl font-black text-white mb-3 text-shadow-black">
                        Selected:
                    </h3>
                    {selectedHand ? (
                        <img src={handImages[selectedHand]} alt={selectedHand} className="w-24 h-24 image-shadow-black" />
                    ) : (
                        <p className="text-white text-xl">None</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HandCard;