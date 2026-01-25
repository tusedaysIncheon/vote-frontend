import { useMemo } from "react";
import type { VoteData } from "@/types/vote";

interface UseVoteDemographicsProps {
    data: VoteData;
    votedOptionId: number | null;
    selectedOptionId: number | null;
}

interface AnalysisData {
    age: { name: string; value: number; fill: string }[];
    relationship: { status: string; percentage: number; icon: "heart" | "user" | "users" }[];
    mbti: {
        dimensions: {
            leftLabel: string;
            rightLabel: string;
            leftValue: number;
            rightValue: number;
            color: string;
        }[];
    };
    regions: { name: string; value: number }[];
}

const generateMockAnalysis = (): AnalysisData => {
    return {
        age: [
            { name: "20대", value: 55, fill: "#3b82f6" }, // Blue-500
            { name: "40대", value: 45, fill: "#e5e7eb" }, // Gray-200
        ],
        relationship: [
            { status: "미혼/싱글", percentage: 45, icon: "user" },
            { status: "연애 중", percentage: 30, icon: "heart" },
            { status: "기혼", percentage: 25, icon: "users" },
        ],
        mbti: {
            dimensions: [
                { leftLabel: "E", rightLabel: "I", leftValue: 62, rightValue: 38, color: "#3b82f6" },
                { leftLabel: "S", rightLabel: "N", leftValue: 45, rightValue: 55, color: "#8b5cf6" },
                { leftLabel: "T", rightLabel: "F", leftValue: 28, rightValue: 72, color: "#10b981" },
                { leftLabel: "J", rightLabel: "P", leftValue: 53, rightValue: 47, color: "#f59e0b" },
            ]
        },
        regions: [
            { name: "서울", value: 35 },
            { name: "부산", value: 20 },
            { name: "경기", value: 15 },
            { name: "인천", value: 12 },
            { name: "대구", value: 8 },
            { name: "광주", value: 5 },
            { name: "제주", value: 5 },
        ],
    };
};

export function useVoteDemographics({ data, votedOptionId, selectedOptionId }: UseVoteDemographicsProps) {
    const anchorId = votedOptionId ?? null;
    // Use selectedOptionId from parent, or fallback to anchor/first option
    const viewingOptionId = selectedOptionId || anchorId || (data.options.length > 0 ? data.options[0].id : 0);

    const isPremium = false;
    const isLocked = !isPremium && anchorId !== null && viewingOptionId !== anchorId;

    const analysis = useMemo(() => generateMockAnalysis(), [viewingOptionId, data.totalVotes]);

    return {
        analysis,
        isLocked,
        viewingOptionId
    };
}
