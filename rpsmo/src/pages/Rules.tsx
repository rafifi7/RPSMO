import { useNavigate } from 'react-router-dom';
import ActionBoxButton from '../components/ActionBoxButton';

const Rules = () => {
    const navigate = useNavigate();
    
    return (
        /* Remove bg-black and min-h-screen so the App.tsx background shows through */
        <>
        <div className="card-rules mb-24">
            {/* Title */}
            <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tighter text-shadow-black">
                Rules of Minus One
            </h2>

            {/* Rules List */}
            <div className="space-y-4 text-white font-medium mb-8 text-2xl text-shadow-black">

                <p>1. Both players show <span className="font-black">two</span> hands.</p>
                <p>2. Look at your opponent's hands and yours.</p>
                <p>3. On "Minus One", hide your <span className="font-black">losing</span> hand.</p>
                <p>4. The remaining hands determine the loser of the round.</p>
                <p>5. The round loser then has a 5/6 chance of suriving. </p>
                <p>6. Survive to continue the game, or else you lose </p>

            </div>

            
        </div>

        <ActionBoxButton
            label="Back to Menu"
            onClick={() => navigate('/')}
            variant="primary"
        />
        </>
    );
};

export default Rules;