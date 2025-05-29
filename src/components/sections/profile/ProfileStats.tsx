import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, Heart, Eye, Award } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileStats as ProfileStatsType } from "./types";

interface ProfileStatsProps {
  stats: ProfileStatsType;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    { label: "Followers", value: stats.followers, icon: Users },
    { label: "Following", value: stats.following, icon: Users },
    { label: "Likes", value: stats.likes, icon: Heart },
    { label: "Views", value: stats.views, icon: Eye },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-xl">{item.value.toLocaleString()}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm text-muted-foreground mt-1">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}