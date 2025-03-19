import Image from 'next/image'
import DiscordStatus from '../components/DiscordStatus'
import LevelSystem from '../components/LevelSystem'
import { getPinnedRepos } from '../lib/github'

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
        <div className="section grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <DiscordStatus />
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I&apos;m <span className="text-primary">Meriç</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-md">
              Software Developer student based in Istanbul, Turkey.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#projects" className="btn">View Projects</a>
              <a href="#about" className="btn-outline">About Me</a>
            </div>
            <div className="flex gap-4 pt-6">
              <a href="https://github.com/jiprettycool" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://twitter.com/iamrealji" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
              <div className="rounded-full overflow-hidden h-80 w-80 border-2 border-foreground/10">
                <Image 
                  src="https://github.com/jiprettycool.png" 
                  alt="Meriç" 
                  width={400} 
                  height={400}
                  className="rounded-full object-cover filter brightness-75 contrast-125 saturate-75"
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
              const isLunaTransfer = repo.name === "LunaTransfer";
              
              return (
                <div 
                  key={repo.id} 
                  className={`card border ${isLunaTransfer ? 'rainbow-border p-5' : 'border-foreground/5 hover:border-foreground/10 p-6'} group bg-secondary/30 flex flex-col h-full`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl"
                      style={{ 
                        backgroundColor: repo.languageColor ? `${repo.languageColor}20` : `#6e6e6e20`,
                        border: `1px solid ${repo.languageColor || '#6e6e6e'}40`
                      }}
                    >
                      {emoji}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold">{repo.name}</h3>
                      {isLunaTransfer && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary mt-1">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Constantly Updating
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
                        <span className="px-3 py-1 bg-background/50 rounded-full text-xs font-mono">
                          <span 
                            className="inline-block w-2 h-2 rounded-full mr-1" 
                            style={{ backgroundColor: repo.languageColor || getPlaceholderColor(index) }}
                          ></span>
                          {repo.language}
                        </span>
                      )}
                      {repo.topics && repo.topics.slice(0, 3).map(topic => (
                        <span key={topic} className="px-3 py-1 bg-background/50 rounded-full text-xs font-mono">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom links - always at the bottom with mt-auto */}
                  <div className="flex gap-4 mt-auto pt-2">
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors group/link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        <span className="relative">
                          Live Demo
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover/link:w-full"></span>
                        </span>
                      </a>
                    )}
                    
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors group/link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span className="relative">
                        Source Code
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover/link:w-full"></span>
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="bg-secondary/80 py-24 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        <div className="section">
          <div className="mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-wider text-primary/80 uppercase mb-2">About</span>
            <h2 className="text-4xl font-bold">About Me</h2>
          </div>
          <div className="max-w-2xl mx-auto animate-slide-up">
            <LevelSystem />
          </div>
        </div>
      </section>
    </main>
  )
}
