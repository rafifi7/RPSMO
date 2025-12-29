import { useNavigate } from 'react-router-dom';
import ActionBoxButton from '../components/ActionBoxButton';
import { useEffect, useState } from 'react';

const Singleplayer = ({ setIsGameActive }: { setIsGameActive: (active: boolean) => void }) => {
    const navigate = useNavigate();
    const [play, setPlay] = useState(false);
    const [round, setRound] = useState(1); // Track the round number
    const [timeLeft, setTimeLeft] = useState(6); // 5 seconds for hand selection
    const [leftHand, setLeftHand] = useState(''); // 5 seconds for hand selection
    const [rightHand, setRightHand] = useState(''); // 5 seconds for hand selection

    const handlePlayClick = () => {
        setPlay(true);
        // changes background in app.tsx
        setIsGameActive(true);
    };

    // Timer effect
    useEffect(() => {
        if (play && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (play && timeLeft === 0) {
            // Timer hit 0 - handle what happens next
            console.log("Time's up!");
            // You can add logic here for what happens when timer ends
        }
    }, [play, timeLeft]);


    // when timer hits 0 show computer

    const generateComputerHands = () => {
        const vals = ["Rock", "Paper", "Scissors"]
        // return two hands of random values between rock paper scissors
        const left = vals[Math.floor(Math.random() * 3)];
        const right = vals[Math.floor(Math.random() * 3)];
        return [left, right]

    };


    return (
        <>
            {play && (
                <div className="relative w-full h-full min-h-screen" style={{
                    animation: 'fadeIn 0.7s ease-in-out',
                }}>
                    {/* Round Number Counter - Top Right */}
                    <div className="fixed z-50 bg-sg-dark-teal/90 border-2 border-sg-teal rounded-lg px-6 py-3 backdrop-blur-sm" style={{
                        top: '2.5%',
                        right: '17.5%',
                    }}>
                        <p className="text-white text-3xl font-black text-shadow-black">
                            ROUND {round}
                        </p>
                    </div>

                    {/* Timer - Center of screen */}
                    <div className="fixed z-50 rounded-lg px-8 py-4 text-center" style={{
                        top: '15%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <p className="text-white text-5xl font-black text-shadow-black ">
                            Select your hands
                        </p>
                        <p className="text-white text-8xl font-black text-shadow-black ">
                            {timeLeft}
                        </p>
                    </div>

                    {/* left Hand Card */}
                    <div className="fixed z-40 flex flex-row gap-6 items-center justify-center" style={{
                        top: '75%',
                        left: '32.5%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <div className="bg-sg-dark-teal/70 border-2 border-sg-teal rounded-lg px-6 py-3 backdrop-blur-sm flex flex-col items-center justify-center">
                            <h3 className="text-3xl font-black text-white mb-2 text-shadow-black">
                                LEFT HAND
                            </h3>
                            {/* Hand choices will go here */}
                            <div className="flex flex-row gap-4">
                                <ActionBoxButton
                                    label="Rock"
                                    onClick={() => setLeftHand("Rock")}
                                    variant='primary'
                                />
                                <ActionBoxButton
                                    label="Paper"
                                    onClick={() => setLeftHand("Paper")}
                                    variant='primary'
                                />
                                <ActionBoxButton
                                    label="Scissors"
                                    onClick={() => setLeftHand("Scissors")}
                                    variant='primary'
                                />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 mt-3 text-shadow-black">
                                Selected: {leftHand}
                            </h3>
                        </div>




                    </div>
                    {/* put 3 choices */}
                    {/* Right Hand Card */}
                    <div className="fixed z-40 flex flex-row gap-6 items-center justify-center" style={{
                        top: '75%',
                        left: '67.5%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <div className="bg-sg-dark-teal/70 border-2 border-sg-teal rounded-lg px-6 py-3 backdrop-blur-sm flex flex-col items-center justify-center">
                            <h3 className="text-3xl font-black text-white mb-2 text-shadow-black">
                                RIGHT HAND
                            </h3>
                            {/* Hand choices will go here */}
                            <div className="flex flex-row gap-4">
                                <ActionBoxButton
                                    label="Rock"
                                    onClick={() => setRightHand("Rock")}
                                    variant='primary'
                                />
                                <ActionBoxButton
                                    label="Paper"
                                    onClick={() => setRightHand("Paper")}
                                    variant='primary'
                                />
                                <ActionBoxButton
                                    label="Scissors"
                                    onClick={() => setRightHand("Scissors")}
                                    variant='primary'
                                />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 mt-3 text-shadow-black">
                                Selected: {rightHand}
                            </h3>
                        </div>
                    </div>


                                        
                    {/* When timer hits 0 show computer hands */}
                    {/* then set a timer for two seconds */}
                    {/* when timer hits 0 remove a random hand if one is not selected */}







                </div>

                

            )}

            <div
                key={play ? "game" : "rules"}
                className="animate-in fade-in duration-700"
            >
                {!play ? (
                    <div className="flex flex-col space-y-24 items-center w-full">
                        {/* Card with some single player rules */}
                        {/* change to teal if it looks better */}
                        <div className="card-rules bg-sg-dark-teal/90 border-sg-teal">
                            {/* Title */}
                            <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tighter text-shadow-black">
                                Singleplayer
                            </h2>
                            {/* Rules List */}
                            <div className="space-y-4 text-white font-medium mb-8 text-2xl text-shadow-black">
                                <p>1. You are against a computer</p>
                                <p>2. Each round, you have <span className="font-black">5</span> seconds to select both of your hands </p>
                                <p>3. On "Minus One", you will have <span className="font-black">2</span> seconds to select a hand to remove</p>
                                <p>4. If you are unable to select in time, you will lose the round</p>
                                <p>5. Good Luck!</p>
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex flex-row space-x-8 items-center justify-center w-full">
                            {/* Ask if ready */}
                            <ActionBoxButton
                                label="Play Minus One"
                                onClick={() => {
                                    handlePlayClick();
                                }}
                                variant="primary"
                            />
                            {/* Back to menu */}
                            <ActionBoxButton
                                label="Back to Menu"
                                onClick={() => {
                                    setIsGameActive(false);
                                    navigate('/')
                                }}
                                variant="primary"
                            />
                        </div>
                    </div>

                ) : (
                    <div className="relative w-full h-full min-h-screen">
                        {/* Round Number Counter - Top Right */}



                    </div>
                )}
            </div>
        </>
    );
};

export default Singleplayer;