import { Discover } from './sections/discover';
import { FileManager } from './sections/file-manager';
import { Connect } from './sections/connect';
import { Videos } from './sections/videos';
import { Audio } from './sections/audio';
import { Create } from './sections/create';
import { Profile } from './sections/profile';
import { Recent } from './sections/recent';
import { Liked } from './sections/liked';
import { Analytics } from './sections/analytics';
import JobsPage from '../pages/jobs';

interface DashboardProps {
  activeTab: string;
}

export function Dashboard({ activeTab }: DashboardProps) {
  return (
    <div className="w-full transition-all duration-300">
      {activeTab === 'discover' && <Discover />}
      {activeTab === 'files' && <FileManager />}
      {activeTab === 'connect' && <Connect />}
      {activeTab === 'videos' && <Videos />}
      {activeTab === 'audio' && <Audio />}
      {activeTab === 'create' && <Create />}
      {activeTab === 'profile' && <Profile />}
      {activeTab === 'recent' && <Recent />}
      {activeTab === 'liked' && <Liked />}
      {activeTab === 'analytics' && <Analytics />}
      {activeTab === 'jobs' && <JobsPage />}
    </div>
  );
}