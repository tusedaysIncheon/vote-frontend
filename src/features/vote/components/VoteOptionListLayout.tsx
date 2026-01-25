import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VoteOption } from "@/types/vote";

interface VoteOptionListLayoutProps {
    options: VoteOption[];
    totalVotes: number;
    votedOptionId: number | null;
    isVoted: boolean;
    selectedOptionId: number | null;
    onVote: (optionId: number, e?: React.MouseEvent) => void;
}

export function VoteOptionListLayout({
    options,
    totalVotes,
    votedOptionId,
    isVoted,
    selectedOptionId,
    onVote,
}: VoteOptionListLayoutProps) {
    return (
        <div className="flex flex-col gap-1.5 mt-1">
            {options.map((option) => {
                const currentCount =
                    option.count +
                    (selectedOptionId === option.id && votedOptionId === null ? 1 : 0);
                const percentage =
                    totalVotes > 0 ? Math.round((currentCount / totalVotes) * 100) : 0;
                const isSelected = selectedOptionId === option.id;

                return (
                    <button
                        key={option.id}
                        onClick={(e) => onVote(option.id, e)}
                        className={cn(
                            "relative w-full overflow-hidden rounded-lg border transition-all duration-200",
                            "group min-h-[40px] px-3 py-2 flex items-center justify-between",
                            !isVoted &&
                            "border-input bg-background hover:bg-accent hover:text-accent-foreground",
                            isVoted && "border-transparent",
                            isVoted && !isSelected && "bg-muted/50 text-muted-foreground",
                            isVoted &&
                            isSelected &&
                            "ring-1 ring-primary bg-primary/5 text-primary font-medium"
                        )}
                    >
                        {/* Result Bar */}
                        {isVoted && (
                            <div
                                className={cn(
                                    "absolute inset-y-0 left-0 transition-all duration-500 ease-out opacity-20",
                                    isSelected ? "bg-primary" : "bg-muted-foreground"
                                )}
                                style={{ width: `${percentage}%` }}
                            />
                        )}

                        {/* Text and Check */}
                        <div className="relative z-10 flex items-center gap-2 text-left mr-2">
                            <span className="text-sm">{option.text}</span>
                            {isVoted && isSelected && (
                                <Check className="w-3.5 h-3.5 text-primary" />
                            )}
                        </div>

                        {/* Percentage */}
                        {isVoted && (
                            <span className="relative z-10 text-xs font-semibold">
                                {percentage}%
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
