interface RoundCounterProps {
    round: number;
}

const RoundCounter: React.FC<RoundCounterProps> = ({ round }) => {
    return (
        <div className="fixed z-50 bg-sg-dark-teal/90 border-2 border-sg-teal rounded-lg px-6 py-3 backdrop-blur-sm" style={{
            top: '2.5%',
            right: '17.5%',
        }}>
            <p className="text-white text-3xl font-black text-shadow-black">
                ROUND {round}
            </p>
        </div>
    );
};

export default RoundCounter;