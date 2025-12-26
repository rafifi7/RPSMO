import { useNavigate } from 'react-router-dom';
import ActionBoxButton from '../components/ActionBoxButton';
import { useState } from 'react';

const Singleplayer = ({ setIsGameActive }: { setIsGameActive: (active: boolean) => void }) => {
    const navigate = useNavigate();
    const [play, setPlay] = useState(false);
    const [round, setRound] = useState(1); // Track the round number

    const handlePlayClick = () => {
        setPlay(true);
        // changes background in app.tsx
        setIsGameActive(true);
    };
    return (
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
                            onClick={() =>
                                {
                                    setIsGameActive(false);
                                    navigate('/')
                                }}
                            variant="primary"
                        />
                    </div>

                </div>
            ) : (
                <>

                    {/* Round Number <counter at top right> */}

                    {/* Timer */}


                    {/* left Hand Card */}
                    {/* put 3 choices */}


                    {/* Right Hand Card */}
                    {/* put 3 choices */}



                    {/* When timer hits 0 show computer hands */}

                    {/* then set a timer for two seconds */}
                    {/* when timer hits 0 remove a random hand if one is not selected */}


                    



                </>
            )}
        </div>
    );
};

export default Singleplayer;