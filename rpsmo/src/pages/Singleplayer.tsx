import { useNavigate } from 'react-router-dom';
import HandDisplay from '../components/HandDisplay';
import SingleRulesCard from '../components/SingleRulesCard'
import RoundCounter from '../components/RoundCounter';
import { useEffect, useState } from 'react';
import HandCard from '../components/HandCard';
import WheelSpin from '../components/WheelSpin';
import GameOverScreen from '../components/GameOverScreen';

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

    const [roundResult, setRoundResult] = useState<'win' | 'lose' | 'disqualified' | null>(null);
    const [showWheel, setShowWheel] = useState(false);

    const [gameOver, setGameOver] = useState(false);
    const [gameOverMessage, setGameOverMessage] = useState('');

    const [survive, setSurvive] = useState(true);
    const [surviveMessage, setSurviveMessage] = useState('');

    // essentially reset everything for a new round of rpsmo
    const restartRound = () => {
        setRound(round + 1);
        setLeftHand("");
        setRightHand("");
        setComputerLeftHand("");
        setComputerRightHand("");
        setPlayerSelectedToRemove('');
        setComputerRemovedHand('');
        setPlayerRemovedHand('');


        setTimeLeft(5);
        setMinusOneTimer(3);
        setMinusOnePhase(false);
        setEvaluationPhase(false);
        setCanChooseRemoval(true);
        setPlayerDisqualified(false);
        setShowWheel(false);
        setShowHands(false);
        setRoundResult(null);
    }

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
    // reset round after evaluation phase
    useEffect(() => {
        if (evaluationPhase) {
            const result = playerLossFunction();
            if (result === 0) {
                const timer = setTimeout(() => {
                    restartRound();
                }, 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [evaluationPhase]);

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
        // console.log(`Comp, ${comp}`);
        // console.log(`User, ${user}`);

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
            // Check if player selected both hands
            if (!leftHand || !rightHand) {
                setPlayerDisqualified(true);
                setRoundResult('disqualified');
                // console.log("Player disqualified - didn't select both hands!");

                // Show disqualification message for 3 seconds, then show wheel
                setTimeout(() => {
                    setShowWheel(true);
                }, 4000);
                return;
            }

            // Player selected both hands - continue normally
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
                }, 2000);
            }, 1000);
        }
    }, [play, timeLeft, showHands, leftHand, rightHand]);


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
                // console.log("Auto-removed player's", randomHand, "hand");
            }

            // Computer also removes a random hand
            const computerRemoves = Math.random() < 0.5 ? 'left' : 'right';
            setComputerRemovedHand(computerRemoves);
            // console.log("Computer removed", computerRemoves, "hand");


            setTimeout(() => {
                // console.log("Round complete! Determine winner...");
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

                    {/* Disqualification Display */}
                    {playerDisqualified && !showWheel && (
                        <div className="fixed z-50 text-center" style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <div className="bg-sg-pink/90 border-4 border-sg-magenta rounded-lg px-16 py-12">
                                <p className="text-white text-6xl font-black text-shadow-black text-glow-black mb-4">
                                    DISQUALIFIED!
                                </p>
                                <p className="text-white text-3xl font-bold text-shadow-black">
                                    You didn't select both hands in time!
                                </p>
                            </div>
                        </div>
                    )}

                    {showWheel && !gameOver && (
                        <WheelSpin
                            variant={roundResult === 'win' ? 'computer' : 'player'}
                            onComplete={(survived) => {
                                if (survived) {
                                    // show message first
                                    setSurviveMessage(roundResult === 'win'
                                        ? `Computer survives this round!`
                                        : `You survive this round!`
                                    );
                                    setSurvive(false);

                                    setTimeout(() => {
                                        setSurviveMessage('');
                                        setSurvive(true);
                                        restartRound(); // now restart after message shows
                                    }, 3500); // 1.5s delay to let the message render
                                } else {

                                    // if roundResult is win, player died
                                    // else computer died

                                    // give a second for player to see wheel
                                    setTimeout(() => {
                                    }, 1500);
                                    setGameOver(true);
                                    if (roundResult == 'win') {
                                        if (round == 1)
                                            setGameOverMessage(`Congrats, you won! You beat the computer in ${round} round!`);
                                        else
                                            setGameOverMessage(`Congrats, you won! You beat the computer in ${round} rounds!`);

                                    } else {
                                        if (round == 1)
                                            setGameOverMessage(`You lost! The computer beat you in ${round} round!`);
                                        else
                                            setGameOverMessage(`You lost! The computer beat you in ${round} rounds!`);
                                    }
                                }
                            }}
                        />
                    )}

                    {gameOver && (
                        <GameOverScreen
                            message={gameOverMessage}
                            onBackToMenu={() => {
                                setGameOver(false);
                                setPlay(false);
                                setIsGameActive(false);
                                navigate('/');
                            }}
                        />
                    )}

                    {!survive && (
                        <>
                            <div className="fixed z-50 rounded-lg px-8 py-4 text-center text-glow-black" style={{
                                top: '12.5%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <p className="text-white text-5xl font-bold text-shadow-black text-center">
                                    {surviveMessage}
                                </p>
                            </div>
                        </>
                    )}





                    {!showHands && !showWheel && !gameOver && !playerDisqualified ? (
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
                            {showHands && !minusOnePhase && !evaluationPhase && !showWheel && !gameOver && !playerDisqualified && (
                                <>
                                    {/* Show both hands before minus one */}
                                    <div className="fixed z-50 text-center" style={{
                                        top: '15%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        <p className="text-white text-6xl font-black text-shadow-black">
                                            Hands Revealed!
                                        </p>
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
                                        />
                                        <HandDisplay
                                            title="YOU"
                                            leftHand={leftHand}
                                            rightHand={rightHand}
                                            variant="player"
                                        />
                                    </div>
                                </>
                            )}

                            {minusOnePhase && !gameOver && !showWheel && !playerDisqualified && (
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

                            {evaluationPhase && !showWheel && (
                                <div className="fixed z-50 text-center" style={{
                                    top: '12.5%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}>
                                    {(() => {
                                        const result = playerLossFunction();
                                        if (result === 1) {
                                            // Computer must spin the wheel
                                            setTimeout(() => {
                                                setRoundResult('win');
                                                setShowWheel(true);
                                            }, 3000);
                                            return <p className="text-white text-6xl font-black text-shadow-black text-glow-black">You win round {round}!</p>;
                                        }
                                        if (result === -1) {
                                            // Player must spin the wheel
                                            setTimeout(() => {
                                                setRoundResult('lose');
                                                setShowWheel(true);
                                            }, 3000);
                                            return <p className="text-white text-6xl font-black text-shadow-black text-glow-black">
                                                You lose round {round}!
                                            </p>;
                                        } else {
                                            setTimeout(() => {
                                                restartRound(); //restart on tie
                                            }, 3000);
                                            return <p className="text-white text-6xl font-black text-shadow-black text-glow-black">
                                                Round {round} is a draw!
                                            </p>;
                                        }
                                    })()}
                                </div>
                            )}



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