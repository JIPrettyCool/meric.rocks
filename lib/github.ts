export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  language: string | null;
  languageColor?: string;
  languages_url: string;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export async function getPinnedRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          user(login: "${username}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  homepageUrl
                  primaryLanguage {
                    name
                    color
                  }
                  languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                    nodes {
                      name
                      color
                    }
                  }
                  stargazerCount
                  forkCount
                  repositoryTopics(first: 10) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }`
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return await getFallbackRepos(username);
    }
    
    const pinnedRepos = data.data.user.pinnedItems.nodes.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: `${username}/${repo.name}`,
      html_url: repo.url,
      description: repo.description,
      homepage: repo.homepageUrl,
      language: repo.primaryLanguage?.name,
      languageColor: repo.primaryLanguage?.color,
      stargazers_count: repo.stargazerCount,
      topics: repo.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
      created_at: "",
      updated_at: ""
    }));

    return pinnedRepos;
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return await getFallbackRepos(username);
  }
}

async function getFallbackRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    const repos = await response.json();
    const languageColors: Record<string, string> = {
      "JavaScript": "#f1e05a",
      "TypeScript": "#3178c6",
      "HTML": "#e34c26",
      "CSS": "#563d7c",
      "Python": "#3572A5",
      "Java": "#b07219",
      "C#": "#178600",
      "PHP": "#4F5D95",
      "Go": "#00ADD8"
    };
    
    return repos.map((repo: any) => ({
      ...repo,
      languageColor: repo.language ? languageColors[repo.language] || "#6e6e6e" : null
    }));
  } catch (error) {
    console.error("Error fetching fallback repos:", error);
    return [];
  }
}