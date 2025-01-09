const projects = {
  2023: [
    {
      title: 'sidepod',
      description: 'Spotify widget for macOS',
      revenue: '$0',
      status: 'inactive',
    },
    {
      title: 'resync',
      description: 'Async meetings for your team',
      revenue: '$0',
      status: 'inactive',
    },
    {
      title: 'wardrobe AI',
      description: 'Try on clothes with AI',
      revenue: '$0',
      status: 'inactive',
    },
    {
      title: 'harmonize',
      description: 'A spotlight-like app for your music',
      revenue: '$840 revenue',
      lfg: true,
      status: 'active',
      link: 'https://getharmonize.app',
    },
    {
      title: 'docktopus',
      description: 'A macOS dock replacement',
      revenue: '$0',
      status: 'inactive',
    },
  ],
  2024: [
    {
      title: 'Hacka Lumpur',
      description: 'Indie hacker meetups in KL, Malaysia',
      status: 'active',
      link: 'https://hackalumpur.com',
    },
    {
      title: 'Hackapura',
      description: 'Indie hacker meetups in Singapore',
      status: 'active',
      link: 'https://hackapura.com',
    },
    {
      title: 'Tanoomba',
      description: 'AI Influencer',
      revenue: '$0',
      status: 'inactive',
      link: 'https://tanoomba.com',
    },
    {
      title: 'Rent a GF',
      description: 'AI girlfriend',
      revenue: '$0',
      status: 'inactive',
      link: 'https://rentagf.com',
    },
    {
      title: 'gitscreen',
      description: 'Turn your github commits into beautiful wallpapers',
      revenue: '$0',
      status: 'inactive',
      link: 'https://gitscreen.com',
    },
    {
      title: 'calorieasy',
      description: 'Track calories with AI',
      revenue: '$1200 MRR',
      lfg: true,
      status: 'active',
      link: 'https://calorieasy.app',
    },
    {
      title: 'Commit Everyday',
      description: 'Your GitHub Activity, Visualized In Cards',
      revenue: '$0',
      lfg: false,
      status: 'active',
      link: 'https://commiteveryday.com',
    },
  ],
  2025: [
    {
      title: 'By End of the year',
      description: 'Pledge your goals or pay $5',
      status: 'active',
      link: 'https://byendoftheyear.com',
    },
    {
      title: 'Taroternity',
      description: 'AI Powered Tarot Readings',
      status: 'active',
      link: 'https://taroternity.com',
    },
  ],
};

const articles = [
  {
    title: 'Tech Interviews Are Broken',
    link: 'https://t31k.medium.com/tech-interviews-are-broken-1ac377c7ec23',
    award: true,
  },
  {
    title: 'Indie Hacking Year 1 Review',
    link: 'https://medium.com/@t31k/indie-hacking-year-1-review-0d695880ebfb',
    award: false,
  },
  {
    title: 'Reflecting on Bali: Embracing the Dualities and Moving Forward',
    link: 'https://t31k.medium.com/balancing-bali-escaping-reality-or-losing-yourself-5afecda90a35',
    award: false,
  },
  {
    title: 'Coding Bootcamps vs Comp Science Grads',
    link: 'https://medium.com/geekculture/coding-bootcamps-vs-comp-science-grads-e16b5a246aaa',
    award: false,
  },
  {
    title: 'How to Create a Kick-ass Portfolio Site that will WOW Your Next Employer',
    link: 'https://javascript.plainenglish.io/how-to-create-a-kick-ass-portfolio-site-that-will-wow-your-next-employer-5e5e2009222',
    award: true,
  },
  {
    title: 'I Attended a $20 Bootcamp and Became a Full Stack Developer',
    link: 'https://javascript.plainenglish.io/i-became-a-developer-with-a-20-bootcamp-32c776eaba13',
    award: false,
  },
];

const books = {
  2021: [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      favorite: true,
      rating: 5,
    },
    {
      title: 'How To Win Friends And Influence People',
      author: 'Dale Carnegie',
      rating: 4,
    },
    {
      title: 'Think & Grow Rich',
      author: 'Napoleon Hill',
      rating: 4,
    },
    {
      title: 'The Magic of Thinking Big',
      author: 'David J. Schwartz',
      rating: 4,
    },
    {
      title: 'Surrounded by Idiots',
      author: 'Viktor E. Frankl',
      rating: 4,
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      rating: 5,
      rating: 4,
    },
    {
      title: 'Zero To One',
      author: 'Peter Thiel',
      rating: 3,
    },
  ],
  2022: [
    {
      title: 'MAKE',
      author: 'Pieter Levels',
      rating: 4,
    },
    {
      title: '4 Hour Work Week',
      author: 'Tim Ferriss',
      rating: 4,
    },
    {
      title: 'Siddhartha',
      author: 'Herman Hesse',
      rating: 3,
    },
    {
      title: 'Deep Work',
      author: 'Cal Newport',
      rating: 4,
    },
    {
      title: 'Ikigai',
      author: 'Hector Garcia',
      favorite: true,
      rating: 5,
    },
    {
      title: '5 Love Languages',
      author: 'Gary Chapman',
      rating: 4,
    },
    {
      title: 'Almanac of Naval Ravikant',
      author: 'Eric Jorgenson',
      rating: 5,
    },
  ],
  2023: [
    {
      title: '80/20 Rule',
      author: 'Richard Koch',
      rating: 4,
    },
    {
      title: 'Never Split The Difference',
      author: 'Chris Voss',
      rating: 4,
    },
    {
      title: 'How To Fail At Everything and Still Win Big',
      author: 'Scott Adams',
      rating: 4,
    },
    {
      title: 'It’s called breakup because it’s broken',
      author: 'Greg Behrendt',
      rating: 4,
    },
    {
      title: 'Art of Seduction',
      author: 'Robert Greene',
      rating: 4,
    },
    {
      title: 'The Mom Test',
      author: 'Rob Fitzpatrick',
      rating: 4,
    },
    {
      title: 'Metamorphosis',
      author: 'Franz Kafka',
      rating: 4,
    },
    {
      title: 'Give and Take',
      author: 'Adam Grant',
      rating: 4,
    },
    {
      title: 'Rework',
      author: 'DHH',
      rating: 4,
    },
    {
      title: 'Factfulness',
      author: 'Hans Rosling',
      rating: 3,
    },
    {
      title: 'David & Goliath',
      author: 'Malcolm Gladwell',
      rating: 4,
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      rating: 5,
    },
    {
      title: 'The SAAS Playbook',
      author: 'Dan Martell',
      rating: 3,
    },
  ],
  2024: [
    {
      title: 'The subtle art of not giving a fuck',
      author: 'Mark Manson',
      rating: 4,
    },
    {
      title: 'Digital Minimalism',
      author: 'Cal Newport',
      rating: 4,
    },
    {
      title: 'Convenience Store Woman',
      author: 'Sayaka Murata',
      rating: 4,
    },
    {
      title: 'Feel Good Productivity',
      author: 'Rashelle Isip',
      rating: 4,
    },
    {
      title: 'The War of Art',
      author: 'Steven Pressfield',
      rating: 3,
    },
    {
      title: 'Win Your Inner Battles',
      author: 'Adam Smith',
      rating: 4,
    },
    {
      title: 'Finish What You Started',
      author: 'Peter Hollins',
      rating: 4,
    },
    {
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      rating: 4,
    },
    {
      title: 'Read People Like a Book',
      author: 'Patrick King',
      rating: 4,
    },
    {
      title: 'This Is How You Heal',
      author: 'Brianna Wiest',
      favorite: true,
      rating: 5,
    },
  ],
  2025: [
    {
      title: 'The Mountain Is You',
      author: 'Brianna Wiest',
      favorite: true,
      rating: 5,
    },
    {
      title: 'The Midnight Library',
      author: 'Matt Haig',
      favorite: true,
      reading: true,
      rating: null,
    },
  ],
};

export { projects, articles, books };
