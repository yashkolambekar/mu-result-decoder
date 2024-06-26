import { useSelector } from "react-redux";

const MatchTiles = () => {

    const lines = useSelector(state => state.text.lines)

    return (
        <>
            <div className="flex max-w-full flex-wrap">
                {
                    lines.map(line => {

                        const numberOfMatches = Object.keys(line).reduce((acc, cur) => {
                            return acc + line[cur].matches.length;
                        }, 0);

                        return (
                            <>
                                <div className={`p-1 border-2 text-[0.5em] ${numberOfMatches > 0 ? "bg-green-300" : ""}`}>
                                    {
                                numberOfMatches          
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MatchTiles;