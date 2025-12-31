import rockImg from '../images/rock.png';
import paperImg from '../images/paper.png';
import scissorsImg from '../images/scissors.png';
import ActionBoxButton from './ActionBoxButton';

interface HandDisplayProps {
    title: string;
    leftHand: string;
    rightHand: string;
    variant: 'player' | 'computer';
    showRemoveButtons?: boolean;
    onRemoveHand?: (hand: 'left' | 'right') => void;
    removedHand?: string;
    selectedToRemove?: string;
}

const HandDisplay: React.FC<HandDisplayProps> = ({
    title,
    leftHand,
    rightHand,
    variant,
    showRemoveButtons = false,
    onRemoveHand,
    removedHand = '',
    selectedToRemove = ''
}) => {
    const bgColor = variant === 'computer' ? 'bg-sg-dark-teal/90' : 'bg-sg-dark-teal/80';
    const borderColor = variant === 'computer' ? 'border-sg-teal' : 'border-sg-teal';

    const handImages: { [key: string]: string } = {
        'Rock': rockImg,
        'Paper': paperImg,
        'Scissors': scissorsImg
    };

    return (
        <div className={`${bgColor} border-2 ${borderColor} rounded-lg px-12 py-6 backdrop-blur-sm w-[600px]`}>
            <h3 className="text-4xl font-black text-white mb-6 text-shadow-black text-center">
                {title}
            </h3>
            <div className="flex flex-row justify-center items-center gap-32">
                {/* Left Hand */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white text-2xl font-bold text-shadow-black">Left</p>
                    {leftHand && removedHand !== 'left' ? (
                        <div className={selectedToRemove === 'left' ? 'opacity-50 border-4 border-yellow-400 rounded-lg' : ''}>
                            <img src={handImages[leftHand]} alt={leftHand} className="w-24 h-24 image-shadow-black" />
                        </div>
                    ) : removedHand === 'left' ? (
                        <div className="w-24 h-24 flex items-center justify-center">
                            <p className="text-white text-5xl text-shadow-black">❌</p>
                        </div>
                    ) : (
                        <div className="w-24 h-24 flex items-center justify-center">
                            <p className="text-white text-xl text-shadow-black">None</p>
                        </div>
                    )}
                    {showRemoveButtons && variant === 'player' && !selectedToRemove && (
                        <ActionBoxButton
                            label="Remove"
                            onClick={() => onRemoveHand?.('left')}
                            variant="secondary"
                        />
                    )}
                </div>

                {/* Right Hand */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white text-2xl font-bold text-shadow-black">Right</p>
                    {rightHand && removedHand !== 'right' ? (
                        <div className={selectedToRemove === 'right' ? 'opacity-50 border-4 border-black-400 rounded-lg' : ''}>
                            <img src={handImages[rightHand]} alt={rightHand} className="w-24 h-24 image-shadow-black" />
                        </div>
                    ) : removedHand === 'right' ? (
                        <div className="w-24 h-24 flex items-center justify-center">
                            <p className="text-white text-5xl text-shadow-black">❌</p>
                        </div>
                    ) : (
                        <div className="w-24 h-24 flex items-center justify-center">
                            <p className="text-white text-xl text-shadow-black">None</p>
                        </div>
                    )}
                    {showRemoveButtons && variant === 'player' && !selectedToRemove && (
                        <ActionBoxButton
                            label="Remove"
                            onClick={() => onRemoveHand?.('right')}
                            variant="secondary"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HandDisplay;