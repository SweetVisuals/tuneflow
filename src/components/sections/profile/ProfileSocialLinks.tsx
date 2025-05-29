import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ProfileSocialLink } from "./types";

interface ProfileSocialLinksProps {
  socialLinks: ProfileSocialLink[];
}

export function ProfileSocialLinks({ socialLinks }: ProfileSocialLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Social Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto py-4 flex flex-col items-center gap-2"
                onClick={() => window.open(link.url, '_blank')}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm">{link.platform}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}