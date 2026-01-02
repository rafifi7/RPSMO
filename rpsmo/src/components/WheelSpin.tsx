import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Bullet from '../images/bullet.png'

interface WheelSpinProps {
    onComplete: (survived: boolean) => void;
    variant: 'player' | 'computer';
}

const WheelSpin: React.FC<WheelSpinProps> = ({ onComplete, variant }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    // Define wheel segments - 5 safe, 1 bullet (1/6 chance of death)
    const data = [
        { option: 'SAFE', style: { backgroundColor: '#249f9c', textColor: 'white' } },
        { option: 'SAFE', style: { backgroundColor: '#ed1b76', textColor: 'white' } },
        { option: 'SAFE', style: { backgroundColor: '#249f9c', textColor: 'white' } },
        { option: 'SAFE', style: { backgroundColor: '#ed1b76', textColor: 'white' } },
        { option: 'SAFE', style: { backgroundColor: '#249f9c', textColor: 'white' } },
        {
            option: 'DEATH',
            image: {
                uri: Bullet,
                offsetY: 180,
                sizeMultiplier: 0.8,
                landscape: false
            },
            style: { backgroundColor: '#000000', textColor: 'white' }
        },
    ];

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSpinClick();
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleStopSpinning = () => {
        setMustSpin(false);
        const survived = data[prizeNumber].option !== 'DEATH';

        // Delay showing result
        setTimeout(() => {
            onComplete(survived);
        }, 2000);
    };

    return (
        <div className="fixed z-50 flex flex-col items-center justify-center" style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div className="bg-black/70 border-4 border-sg-teal rounded-lg px-16 py-12">
                <h2 className="text-white text-5xl font-black text-shadow-black mb-6 text-center">
                    {variant === 'player' ? 'YOUR FATE' : 'COMPUTER\'S FATE'}
                </h2>

                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={handleStopSpinning}
                    backgroundColors={['#037A76', '#E74694']}
                    textColors={['white']}
                    outerBorderColor="#037A76"
                    outerBorderWidth={5}
                    innerBorderColor="#E74694"
                    innerBorderWidth={5}
                    radiusLineColor="#000000"
                    radiusLineWidth={2}
                    fontSize={20}
                    perpendicularText={true}
                />




            </div>
        </div>
    );
};

export default WheelSpin;