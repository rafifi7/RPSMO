import { useNavigate } from 'react-router-dom';
// import ActionBoxButton from '../components/ActionBoxButton';
import HandDisplay from '../components/HandDisplay';
import SingleRulesCard from '../components/SingleRulesCard'
import RoundCounter from '../components/RoundCounter';
import { useEffect, useState } from 'react';
import HandCard from '../components/HandCard';

const Singleplayer = ({ setIsGameActive }: { setIsGameActive: (active: boolean) => void }) => {
    const navigate = useNavigate();
    const [play, setPlay] = useState(false);
    const [round, setRound] = useState(1);
    const [timeLeft, setTimeLeft] = useState(6);
    const [leftHand, setLeftHand] = useState('');
    const [rightHand, setRightHand] = useState('');
    const [computerLeftHand, setComputerLeftHand] = useState('');
    const [computerRightHand, setComputerRightHand] = useState('');
    const [showHands, setShowHands] = useState(false);

    const [minusOnePhase, setMinusOnePhase] = useState(false);
    const [evaluationPhase, setEvaluationPhase] = useState(false);

    const [minusOneTimer, setMinusOneTimer] = useState(3);

    const [canChooseRemoval, setCanChooseRemoval] = useState(true);

    const [playerDisqualified, setPlayerDisqualified] = useState(false);
    const [playerRemovedHand, setPlayerRemovedHand] = useState('');
    const [playerSelectedToRemove, setPlayerSelectedToRemove] = useState(''); // Add this new state
    const [computerRemovedHand, setComputerRemovedHand] = useState('');

    const handlePlayClick = () => {
        setPlay(true);
        setIsGameActive(true);
    };

    const getCompHand = () => {
        if (computerRemovedHand == "left")
            return computerRightHand;
        else
            return computerLeftHand;
    }

    const getUserHand = () => {
        if (playerRemovedHand == "left") {
            return rightHand;
        } else {
            return leftHand;
        }
    }

    const winsAgainst: Map<string, string> = new Map([
        ["Rock", "Scissors"],
        ["Paper", "Rock"],
        ["Scissors", "Paper"],
    ])

    // returns int of whether player lost or not
    // -1 loss 0 tie 1 win
    const playerLossFunction = () => {
        const comp = getCompHand();
        const user = getUserHand();
        console.log(`Comp, ${comp}`);
        console.log(`User, ${user}`);
        
        if (winsAgainst.get(user) == comp)
            return 1;
        else if (winsAgainst.get(comp) == user)
            return -1;
        else
            return 0;
    }


    // Timer effect for initial hand selection
    useEffect(() => {
        if (play && !showHands && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (play && !showHands && timeLeft === 0) {
            const vals = ["Rock", "Paper", "Scissors"];
            const left = vals[Math.floor(Math.random() * 3)];
            const right = vals[Math.floor(Math.random() * 3)];

            setComputerLeftHand(left);
            setComputerRightHand(right);

            setTimeout(() => {
                setShowHands(true);
                // After 2 seconds, start minus one phase
                setTimeout(() => {
                    setMinusOnePhase(true);
                }, 10);
            }, 1000);
        }
    }, [play, timeLeft, showHands]);


    // Timer for minus one phase
    useEffect(() => {
        if (minusOnePhase && minusOneTimer > 0) {
            const timer = setTimeout(() => {
                setMinusOneTimer(minusOneTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (minusOnePhase && minusOneTimer === 0) {
            // Time's up - finalize removal
            if (playerSelectedToRemove) {
                setPlayerRemovedHand(playerSelectedToRemove); // Use the selected hand
            } else {
                // Auto-remove random hand if player didn't select one
                setCanChooseRemoval(false);
                const randomHand = Math.random() < 0.5 ? 'left' : 'right';
                setPlayerRemovedHand(randomHand);
                console.log("Auto-removed player's", randomHand, "hand");
            }

            // Computer also removes a random hand
            const computerRemoves = Math.random() < 0.5 ? 'left' : 'right';
            setComputerRemovedHand(computerRemoves);
            console.log("Computer removed", computerRemoves, "hand");


            setTimeout(() => {
                console.log("Round complete! Determine winner...");
            }, 2000);
            setEvaluationPhase(true);

        }
    }, [minusOnePhase, minusOneTimer, playerSelectedToRemove]);


    return (
        <>
            {play && (
                <div className="relative w-full h-full min-h-screen" style={{
                    animation: 'fadeIn 0.7s ease-in-out',
                }}>
                    <RoundCounter round={round} />

                    {!showHands ? (
                        <>
                            {/* Timer - Center of screen */}
                            <div className="fixed z-50 rounded-lg px-8 py-4 text-center" style={{
                                top: '15%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <p className="text-white text-5xl font-black text-shadow-black">
                                    Select Your Hands
                                </p>
                                <p className="text-white text-8xl font-black text-shadow-black">
                                    {timeLeft}
                                </p>
                            </div>

                            <HandCard
                                side="left"
                                selectedHand={leftHand}
                                onSelectHand={setLeftHand}
                            />

                            <HandCard
                                side="right"
                                selectedHand={rightHand}
                                onSelectHand={setRightHand}
                            />
                        </>
                    ) : (
                        <>
                            {minusOnePhase && (
                                <>
                                    <div className="fixed z-50 text-center" style={{
                                        top: '15%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        {!evaluationPhase && (
                                            <>
                                                <p className="text-white text-7xl font-black text-shadow-black">
                                                    Minus One!
                                                </p>
                                                <p className="text-white text-8xl font-black text-shadow-black">
                                                    {minusOneTimer}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className="fixed z-40 flex flex-col items-center justify-center gap-8" style={{
                                        top: '60%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        <HandDisplay
                                            title="COMPUTER"
                                            leftHand={computerLeftHand}
                                            rightHand={computerRightHand}
                                            variant="computer"
                                            removedHand={computerRemovedHand} // Add this
                                        />
                                        <HandDisplay
                                            title="YOU"
                                            leftHand={leftHand}
                                            rightHand={rightHand}
                                            variant="player"
                                            showRemoveButtons={canChooseRemoval}
                                            onRemoveHand={setPlayerSelectedToRemove} // Use the selection state
                                            removedHand={playerRemovedHand}
                                            selectedToRemove={playerSelectedToRemove} // Add this new prop
                                        />
                                    </div>
                                </>
                            )}

                            {evaluationPhase && (() => {
                                const result = playerLossFunction();
                                if (result === 1) return <p className="text-green-500 text-6xl">You Win</p>;
                                if (result === -1) return <p className="text-red-500 text-6xl">You Lose</p>;
                                return <p className="text-yellow-400 text-6xl">Tie</p>;
                            })()}


                        </>
                    )}
                </div>
            )}

            <div key={play ? "game" : "rules"} className="animate-in fade-in duration-700">
                {!play && (
                    <SingleRulesCard
                        onPlay={handlePlayClick}
                        onBack={() => {
                            setIsGameActive(false);
                            navigate('/');
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Singleplayer;