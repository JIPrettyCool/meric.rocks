import Link from 'next/link';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tools | Meriç',
  description: 'Free2Use Tools for everyone(?)',
}

type ToolCardColor = 'blue' | 'purple' | 'green' | 'amber' | 'pink';
interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color?: ToolCardColor;
}

function ToolCard({ title, description, icon, href, color = 'blue' }: ToolCardProps) {
  const colorClasses: Record<ToolCardColor, string> = {
    blue: 'hover:border-blue-500/30 group-hover:text-blue-400 text-blue-500/80',
    purple: 'hover:border-purple-500/30 group-hover:text-purple-400 text-purple-500/80',
    green: 'hover:border-green-500/30 group-hover:text-green-400 text-green-500/80',
    amber: 'hover:border-amber-500/30 group-hover:text-amber-400 text-amber-500/80',
    pink: 'hover:border-pink-500/30 group-hover:text-pink-400 text-pink-500/80',
  };
  
  return (
    <Link href={href}>
      <div className={`group bg-secondary/40 backdrop-blur-md border border-white/10 ${colorClasses[color]} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
        <div className="w-12 h-12 bg-background/40 rounded-xl border border-white/5 flex items-center justify-center shadow-sm mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3">Tools</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            A collection of free web-based tools for everyone (i guess).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard 
            title="UGS Calculator"
            description="Calculates and checks Uçuş Görev Süresi (Flight Duty Period) for pilots"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M8 9h8"></path>
                <path d="M8 15h8"></path>
                <path d="M8 12h8"></path>
              </svg>
            }
            href="/ugs"
            color="blue"
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-foreground/60">
            More tools coming soon!
          </p>
          <div className="mt-6">
            <Link href="https://meric.rocks" className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to homepage.
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}