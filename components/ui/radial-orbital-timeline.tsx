"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedBeamMultipleOutputDemo } from "../AnimatedBeam";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;

    // 🔥 responsive radius
    const radius =
      typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 200;

    const rad = (angle * Math.PI) / 180;

    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);

    const zIndex = Math.round(100 + 50 * Math.cos(rad));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)),
    );

    return { x, y, zIndex, opacity };
  };

  // const getRelatedItems = (id: number) => {
  //   return timelineData.find((i) => i.id === id)?.relatedIds || [];
  // };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
  return "text-white bg-black border-white drak:border-black dark:text-black";

case "in-progress":
  return "text-black bg-white border-black dark:text-white dark:bg-black/40 dark:border-white/50";

case "pending":
  return "text-black bg-gray-100 border-gray-300 dark:text-white dark:bg-black/40 dark:border-white/50";

default:
  return "text-black bg-gray-100 border-gray-300 dark:text-white dark:bg-black/40 dark:border-white/50";
    }
  };

  return (
    <section className="my-20 pb-40 md:pb-64 lg:pb-0 container mx-auto px-4 lg:px-0 lg:h-screen overflow-hidden">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          A New Dimension of Intelligent Interaction
        </h2>

        <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 max-w-[55ch] mx-auto">
          Dive into a next-generation interface where AI nodes orbit around a
          powerful core, revealing relationships, energy levels, and real-time
          system activity in a visually stunning way.
        </p>
      </div>
      <div
        className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black mt-8 lg:mt-24 space-y-50 lg:space-y-0"
        ref={containerRef}
        onClick={handleContainerClick}
      >
        <AnimatedBeamMultipleOutputDemo />
        <div className="relative w-full max-w-4xl mx-auto h-full flex items-center justify-center">
          <div
            className="absolute w-full h-full flex items-center justify-center"
            ref={orbitRef}
            style={{
              perspective: "1000px",
              transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
            }}
          >
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse flex items-center justify-center z-10 shadow-lg">
              <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
              <div
                className="absolute w-20 h-20 rounded-full border border-indigo-500/20 animate-ping opacity-70"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30"></div>
            </div>

            <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-slate-200 dark:border-white/10"></div>

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(
                index,
                timelineData.length,
              );
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    nodeRefs.current[item.id] = el;
                  }}
                  className="absolute transition-all duration-700 cursor-pointer"
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  <div
                    className={`absolute rounded-full -inset-1 ${
                      isPulsing ? "animate-pulse duration-1000" : ""
                    }`}
                    style={{
                      background: `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)`,
                      width: `${item.energy * 0.5 + 40}px`,
                      height: `${item.energy * 0.5 + 40}px`,
                      left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                      top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    }}
                  ></div>

                  <div
                      className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-indigo-600 text-white dark:bg-white dark:text-slate-900"
                      : isRelated
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300"
                        : "bg-white text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }
                  border 
                  ${
                    isExpanded
                      ? "border-indigo-400 dark:border-whiteshadow-white shadow-lg shadow-indigo-500/30"
                      : isRelated
                        ? "border-indigo-500 animate-pulse"
                        : "border-slate-200 dark:border-white/20"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                  >
                    <Icon size={14} />
                  </div>

                  <div
                    className={`
                  absolute top-12 whitespace-nowrap
                  text-xs ffont-bold uppercase tracking-widest
                  transition-all duration-300
                  ${isExpanded ? "text-slate-900 dark:text-white scale-110" : "text-slate-400 dark:text-slate-500"}
                `}
                  >
                    {item.title}
                  </div>

                  {isExpanded && (
                    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-52 md:w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-slate-200 dark:border-white/20 shadow-2xl overflow-visible">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-slate-300 dark:bg-white/30"></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`px-2 text-xs ${getStatusStyles(
                              item.status,
                            )}`}
                          >
                            {item.status === "completed"
                              ? "COMPLETE"
                              : item.status === "in-progress"
                                ? "IN PROGRESS"
                                : "PENDING"}
                          </Badge>
                          <span className="text-xs font-mono text-slate-400 dark:text-white/50">
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="text-sm mt-2 text-slate-900 dark:text-white">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs text-slate-600 dark:text-white/80">
                        <p>{item.content}</p>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="flex items-center text-slate-400 dark:text-white/50">
                              <Zap size={10} className="mr-1" />
                              Energy Level
                            </span>
                            <span className="text-slate-900 dark:text-white">
                              {item.energy}%
                            </span>
                          </div>
                          <div className="w-full h-1 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                              style={{ width: `${item.energy}%` }}
                            ></div>
                          </div>
                        </div>

                        {item.relatedIds.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10">
                            <div className="flex items-center mb-2">
                              <Link
                                size={10}
                                className="text-slate-400 dark:text-white/70 mr-1"
                              />
                              <h4 className="text-xs uppercase tracking-widest font-medium text-slate-400 dark:text-white/70">
                                Connected Nodes
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find(
                                  (i) => i.id === relatedId,
                                );
                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center h-6 px-2 py-0 text-[10px] rounded-none border-slate-200 dark:border-white/20 bg-transparent hover:bg-slate-50 dark:hover:bg-white/10 text-slate-600 dark:text-white/80 hover:text-indigo-600 dark:hover:text-white transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title}
                                    <ArrowRight
                                      size={8}
                                      className="ml-1 opacity-50"
                                    />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}