import Image from 'next/image'
import DiscordStatus from '../components/DiscordStatus'
import LevelSystem from '../components/LevelSystem'
import { getPinnedRepos } from '../lib/github'
import SocialLinks from '../components/SocialLinks'

export const revalidate = 900;
export default async function Home() {
  const repos = await getPinnedRepos('jiprettycool');

  const getPlaceholderColor = (index: number) => {
    const colors = ['#3178c6', '#f1e05a', '#e34c26', '#563d7c', '#2b7489', '#89e051'];
    return colors[index % colors.length];
  };
  
  const getEmojiFromDescription = (description: string | null) => {
    if (!description) return ' ';
    
    const emojiRegex = /[\p{Emoji}\u200d]+/u;
    const match = description.match(emojiRegex);
    
    return match ? match[0] : ' ';
  };

  return (
    <main className="flex min-h-screen flex-col antialiased selection:bg-primary selection:text-background">
      <section id="home" className="min-h-screen flex items-center bg-background pt-20">
        <div className="section grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I&apos;m <span className="text-primary">Meriç</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-md leading-relaxed">
              Software Developer student based in Istanbul, Turkey.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#projects" className="btn px-6 py-3 bg-primary text-gray-900 rounded-full font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all">View Projects</a>
              <a href="#about" className="btn-outline px-6 py-2.5 rounded-full border-2 border-foreground/20 font-medium hover:bg-foreground/5 transition-all backdrop-blur-sm">About Me</a>
            </div>
            <SocialLinks />
            <DiscordStatus />
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
              <div className="rounded-[2rem] overflow-hidden h-80 w-80 border-2 border-white/10 shadow-2xl">
                <Image 
                  src="https://github.com/jiprettycool.png" 
                  alt="Meriç" 
                  width={400} 
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 bg-background relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        <div className="section">
          <div className="mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-wider text-primary/80 uppercase mb-2">Portfolio</span>
            <h2 className="text-4xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {repos.map((repo, index) => {
              const emoji = getEmojiFromDescription(repo.description);
              const isFeaturedRepo = repo.name === "LunaTransfer";
              
              return (
                <div 
                  key={repo.id} 
                  className={`card backdrop-blur-md shadow-xl ${isFeaturedRepo ? 'rainbow-border p-5' : 'border border-white/10 hover:border-white/20 p-6'} group bg-secondary/30 rounded-2xl flex flex-col h-full transition-all`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                      style={{ 
                        backgroundColor: repo.languageColor ? `${repo.languageColor}20` : `#6e6e6e20`,
                        border: `1px solid ${repo.languageColor || '#6e6e6e'}40`
                      }}
                    >
                      {emoji}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold">{repo.name}</h3>
                      {isFeaturedRepo && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary mt-1 backdrop-blur-sm">
                          <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Active Development
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-foreground/70 mb-4 text-sm">
                      {repo.description ? repo.description.replace(emoji, '').trim() : 'No description available'}
                    </p>
                    
                    <div className="flex gap-2 flex-wrap mb-4">
                      {repo.language && (
                        <span className="px-3.5 py-1.5 bg-background/40 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm">
                          <span 
                            className="inline-block w-2 h-2 rounded-full mr-1.5" 
                            style={{ backgroundColor: repo.languageColor || getPlaceholderColor(index) }}
                          ></span>
                          {repo.language}
                        </span>
                      )}
                      {repo.topics && repo.topics.slice(0, 3).map(topic => (
                        <span key={topic} className="px-3.5 py-1.5 bg-background/40 backdrop-blur-sm shadow-sm rounded-full text-xs font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-auto pt-3">
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-1.5 hover:text-primary transition-colors group/link px-3 py-1.5 rounded-full hover:bg-foreground/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                    
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-1.5 hover:text-primary transition-colors group/link px-3 py-1.5 rounded-full hover:bg-foreground/5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="bg-secondary/80 py-24 relative backdrop-blur-lg">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        <div className="section">
          <div className="mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-wider text-primary/80 uppercase mb-2.5">About</span>
            <h2 className="text-4xl font-bold">About Me</h2>
          </div>
          <div className="max-w-2xl mx-auto animate-slide-up p-6 bg-background/20 rounded-2xl backdrop-blur-md shadow-lg border border-white/0">
            <LevelSystem />
          </div>
        </div>
      </section>
    </main>
  )
}
