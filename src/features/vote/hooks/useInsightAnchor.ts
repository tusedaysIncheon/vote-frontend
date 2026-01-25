import { useState, useEffect } from "react";
import type { VoteData } from "@/types/vote";

interface UseInsightAnchorProps {
    data: VoteData;
    isOpen: boolean;
}

export function useInsightAnchor({ data, isOpen }: UseInsightAnchorProps) {
    // const [votedOptionId, setVotedOptionId] = useState<number | null>(data.votedOptionId); // Removed in favor of React Query data
    const [anchorOptionId, setAnchorOptionId] = useState<number | null>(data.votedOptionId);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(data.votedOptionId);

    // Sync state when external data changes (e.g. voted in Feed)
    useEffect(() => {
        if (data.votedOptionId !== null) {
            // If anchor is not set, set it to the current vote (First load or external vote)
            if (anchorOptionId === null) {
                setAnchorOptionId(data.votedOptionId);
            }

            // Force sync selectedOptionId to the new vote.
            // This ensures if user changed vote in Feed, Modal shows the new selection.
            setSelectedOptionId(data.votedOptionId);
        }
    }, [data.votedOptionId, anchorOptionId]);

    // Also sync on open if needed
    useEffect(() => {
        if (isOpen && data.votedOptionId !== null) {
            // Always sync on open
            setSelectedOptionId(data.votedOptionId);
            if (anchorOptionId === null) setAnchorOptionId(data.votedOptionId);
        }
    }, [isOpen, data.votedOptionId, anchorOptionId]);

    return {
        anchorOptionId,
        setAnchorOptionId,
        selectedOptionId,
        setSelectedOptionId,
    };
}
