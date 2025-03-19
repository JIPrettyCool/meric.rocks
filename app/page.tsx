import Image from 'next/image'
import DiscordStatus from '../components/DiscordStatus'
import LevelSystem from '../components/LevelSystem'
import { getPinnedRepos } from '../lib/github'

export default async function Home() {
  const repos = await getPinnedRepos('jiprettycool');

  const getPlaceholderColor = (index: number) => {
    const colors = ['#3178c6', '#f1e05a', '#e34c26', '#563d7c', '#2b7489', '#89e051'];
    return colors[index % colors.length];
  };
  
  const getEmojiFromDescription = (description: string | null) => {
    if (!description) return '📁';
    
    const emojiRegex = /[\p{Emoji}\u200d]+/u;
    const match = description.match(emojiRegex);
    
    return match ? match[0] : '📁';
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
            </div>
            <div className="flex gap-4 pt-6">
              <a href="https://github.com/jiprettycool" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://twitter.com/iamrealji" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl absolute"></div>
            <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-30 animate-[pulse_4s_ease-in-out_infinite]"></div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => {
              const emoji = getEmojiFromDescription(repo.description);
              return (
                <div 
                  key={repo.id} 
                  className="card border border-foreground/5 hover:border-foreground/10 group bg-secondary/30 backdrop-blur-sm p-6"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ 
                        backgroundColor: repo.languageColor ? `${repo.languageColor}20` : `#6e6e6e20`,
                        border: `1px solid ${repo.languageColor || '#6e6e6e'}40`
                      }}
                    >
                      {emoji}
                    </div>
                    
                    <h3 className="text-xl font-bold">{repo.name}</h3>
                  </div>
                  
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
                    
                    {repo.topics && repo.topics.slice(0, 2).map(topic => (
                      <span key={topic} className="px-3 py-1 bg-background/50 rounded-full text-xs font-mono">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
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
