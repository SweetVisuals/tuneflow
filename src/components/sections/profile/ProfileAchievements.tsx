import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ProfileAchievement } from "./types";

interface ProfileAchievementsProps {
  achievements: ProfileAchievement[];
}

export function ProfileAchievements({ achievements }: ProfileAchievementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col items-center p-4 rounded-lg ${
                achievement.unlockedAt ? 'bg-primary/10' : 'bg-muted/50 opacity-50'
              }`}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">{achievement.icon}</span>
                      <span className="font-medium text-sm text-center">{achievement.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-muted-foreground">
                          Unlocked {format(achievement.unlockedAt, 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}