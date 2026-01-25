import { useState } from "react";
import { Lock, Heart, User, Users, ChevronDown, ChevronUp } from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import type { VoteData } from "@/types/vote";
import { Button } from "@/shared/ui/button";
import { useVoteDemographics } from "../hooks/useVoteDemographics";

// 🔒 LOCKED OVERLAY
function AnalysisLockOverlay() {
    return (
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-background/50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300 rounded-2xl">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">상세 분석 잠금</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                무료 회원은 <span className="text-primary font-bold">최초 선택한 항목</span>의<br />
                분석 리포트만 확인할 수 있습니다.
            </p>
            <Button className="w-full max-w-xs rounded-full font-bold shadow-lg shadow-primary/20">
                멤버십 가입하고 모든 분석 보기
            </Button>
        </div>
    );
}

// 📊 MAIN COMPONENT
interface VoteDemographicsProps {
    data?: VoteData;
    votedOptionId: number | null;
    selectedOptionId: number | null;
}

export function VoteDemographics({ data, votedOptionId, selectedOptionId }: VoteDemographicsProps) {
    if (!data) return null;

    const { analysis, isLocked } = useVoteDemographics({
        data,
        votedOptionId,
        selectedOptionId
    });

    const [isRegionExpanded, setIsRegionExpanded] = useState(false);
    // Show top 3 by default, or all if expanded
    const visibleRegions = isRegionExpanded ? analysis.regions : analysis.regions.slice(0, 3);

    return (
        <div className="px-5 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-foreground/90 font-display">투표 참여자 분석</h3>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-extrabold rounded-full tracking-wide shadow-sm border border-blue-100">
                    분석 완료
                </span>
            </div>

            <div className={cn("relative transition-all duration-300", isLocked && "select-none")}>
                {/* Lock Overlay */}
                {isLocked && <AnalysisLockOverlay />}

                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-2 gap-4", // Mobile: 1 col, Desktop: 2 col
                    isLocked && "blur-md opacity-50 pointer-events-none grayscale-[0.2]"
                )}>

                    {/* A. Age Group (Donut) */}
                    <div className="bg-white/80 dark:bg-card/50 rounded-[24px] p-6 border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm flex flex-col items-center justify-center min-h-[220px]">
                        <h4 className="w-full text-left text-sm font-bold text-muted-foreground mb-4">연령대</h4>
                        <div className="relative w-32 h-32 my-auto flex-shrink-0">
                            <PieChart width={128} height={128}>
                                <Pie
                                    data={analysis.age}
                                    innerRadius={45}
                                    outerRadius={60}
                                    paddingAngle={4}
                                    cornerRadius={4}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                    stroke="none"
                                >
                                    {analysis.age.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-extrabold text-foreground">55%</span>
                                <span className="text-xs font-semibold text-muted-foreground">20대</span>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            {analysis.age.map(item => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full ring-2 ring-background" style={{ backgroundColor: item.fill }} />
                                    <span className="text-xs font-bold text-muted-foreground">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* B. Relationship (List) */}
                    <div className="bg-white/80 dark:bg-card/50 rounded-[24px] p-6 border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm flex flex-col justify-center min-h-[220px]">
                        <h4 className="w-full text-left text-sm font-bold text-muted-foreground mb-6">연애 상태</h4>
                        <div className="space-y-6">
                            {analysis.relationship.map((item) => (
                                <div key={item.status} className="flex items-center gap-4 group">
                                    <div className={cn(
                                        "w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-300",
                                        item.icon === "heart" ? "bg-pink-50 text-pink-500 group-hover:bg-pink-100" :
                                            item.icon === "users" ? "bg-purple-50 text-purple-500 group-hover:bg-purple-100" :
                                                "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                                    )}>
                                        {item.icon === "heart" ? <Heart className={cn("w-5 h-5", "fill-current")} /> :
                                            item.icon === "users" ? <Users className="w-5 h-5" /> :
                                                <User className="w-5 h-5" />
                                        }
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-semibold text-muted-foreground mb-1">{item.status}</div>
                                        <div className="text-xl font-extrabold text-foreground">{item.percentage}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* C. MBTI (Bar) */}
                    <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-white/90 to-white/50 dark:from-card/90 dark:to-card/50 rounded-[24px] p-6 border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h4 className="text-sm font-bold text-muted-foreground mb-5">MBTI 성향</h4>
                        <div className="space-y-4">
                            {analysis.mbti.dimensions.map((dim, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className={cn("text-lg font-black w-6 text-center", i === 0 || dim.leftValue > 50 ? "text-blue-500" : "text-muted-foreground")}>
                                        {dim.leftLabel}
                                    </span>
                                    <div className="flex-1 h-7 bg-gray-100 dark:bg-gray-800 rounded-xl relative overflow-hidden flex items-center shadow-inner">
                                        <div
                                            className="h-full flex items-center justify-start pl-3 text-xs font-bold text-white z-10 shadow-md transition-all duration-1000 ease-out"
                                            style={{ width: `${dim.leftValue}%`, backgroundColor: dim.color, borderRadius: "0.75rem 0 0 0.75rem" }}
                                        >
                                            {dim.leftValue}%
                                        </div>
                                        <div className="flex-1 flex items-center justify-end pr-3 text-xs font-bold text-gray-400">
                                            {dim.rightValue}%
                                        </div>
                                        {/* Slanted Divider */}
                                        <div
                                            className="absolute top-0 bottom-0 w-2 bg-white/30 transform skew-x-[-15deg] backdrop-blur-sm"
                                            style={{ left: `calc(${dim.leftValue}% - 4px)` }}
                                        />
                                    </div>
                                    <span className={cn("text-lg font-black w-6 text-center", dim.rightValue > 50 ? "text-blue-500" : "text-muted-foreground")}>
                                        {dim.rightLabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* D. Top Regions (Progress List) */}
                    <div className="col-span-1 md:col-span-2 bg-white/80 dark:bg-card/50 rounded-[24px] p-6 border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex items-center justify-between mb-5">
                            <h4 className="text-sm font-bold text-muted-foreground">지역별 순위</h4>
                            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Top {analysis.regions.length}</span>
                        </div>
                        <div className="space-y-4">
                            {visibleRegions.map((region, i) => (
                                <div key={region.name} className="flex items-center gap-4 animate-in fade-in slide-in-from-top-1 duration-300">
                                    <span className="w-16 font-bold text-foreground text-sm shrink-0">{region.name}</span>
                                    <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all duration-1000 ease-out shadow-sm",
                                                i === 0 ? "bg-blue-500" : i === 1 ? "bg-blue-400" : "bg-blue-300"
                                            )}
                                            style={{ width: `${region.value}%` }}
                                        />
                                    </div>
                                    <span className="w-10 text-right font-extrabold text-foreground text-sm">{region.value}%</span>
                                </div>
                            ))}
                        </div>

                        {/* Show More Button */}
                        {analysis.regions.length > 3 && (
                            <button
                                onClick={() => setIsRegionExpanded(!isRegionExpanded)}
                                className="w-full mt-5 py-2 flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
                            >
                                {isRegionExpanded ? (
                                    <>접기 <ChevronUp className="w-3 h-3" /></>
                                ) : (
                                    <>더보기 <ChevronDown className="w-3 h-3" /></>
                                )}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
