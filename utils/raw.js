const projects = {
  2024: [
    {
      title: 'Hackapura',
      description: 'Indie hacker meetups in SG',
      status: 'active',
      link: 'https://hackapura.com',
    },
    {
      title: 'Tannomba',
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
  ],
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
    },
    {
      title: 'How To Win Friends And Influence People',
      author: 'Dale Carnegie',
    },
    {
      title: 'Think & Grow Rich',
      author: 'Napoleon Hill',
    },
    {
      title: 'The Magic of Thinking Big',
      author: 'David J. Schwartz',
    },
    {
      title: 'Surrounded by Idiots',
      author: 'Viktor E. Frankl',
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
    },
    {
      title: 'Zero To One',
      author: 'Peter Thiel',
    },
  ],
  2022: [
    {
      title: 'MAKE',
      author: 'Pieter Levels',
    },
    {
      title: '4 Hour Work Week',
      author: 'Tim Ferriss',
    },
    {
      title: 'Siddhartha',
      author: 'Herman Hesse',
    },
    {
      title: 'Deep Work',
      author: 'Cal Newport',
    },
    {
      title: 'Ikigai',
      author: 'Hector Garcia',
      favorite: true,
    },
    {
      title: '5 Love Languages',
      author: 'Gary Chapman',
    },
    {
      title: 'Almanac of Naval Ravikant',
      author: 'Eric Jorgenson',
    },
  ],
  2023: [
    {
      title: '80/20 Rule',
      author: 'Richard Koch',
    },
    {
      title: 'Never Split The Difference',
      author: 'Chris Voss',
    },
    {
      title: 'How To Fail At Everything and Still Win Big',
      author: 'Scott Adams',
    },
    {
      title: 'It’s called breakup because it’s broken',
      author: 'Greg Behrendt',
    },
    {
      title: 'Art of Seduction',
      author: 'Robert Greene',
    },
    {
      title: 'The Mom Test',
      author: 'Rob Fitzpatrick',
      favorite: true,
    },
    {
      title: 'Metamorphosis',
      author: 'Franz Kafka',
    },
    {
      title: 'Give and Take',
      author: 'Adam Grant',
    },
    {
      title: 'Rework',
      author: 'DHH',
    },
    {
      title: 'Factfulness',
      author: 'Hans Rosling',
    },
    {
      title: 'David & Goliath',
      author: 'Malcolm Gladwell',
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
    },
    {
      title: 'The SAAS Playbook',
      author: 'Dan Martell',
    },
  ],
  2024: [
    {
      title: 'The subtle art of not giving a fuck',
      author: 'Mark Manson',
      completed: true,
    },
    {
      title: 'Digital Minimalism',
      author: 'Cal Newport',
    },
    {
      title: 'Convenience Store Woman',
      author: 'Sayaka Murata',
    },
    {
      title: 'Feel Good Productivity',
      author: 'Rashelle Isip',
    },
    {
      title: 'The War of Art',
      author: 'Steven Pressfield',
    },
    {
      title: 'Win Your Inner Battles',
      author: 'Adam Smith',
    },
  ],
};

console.log(books);

export { projects, articles, books };
