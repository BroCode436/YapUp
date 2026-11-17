// Client-side fallback store when running on static hosts without a backend (e.g. GitHub Pages)

type Row = { id: string; [key: string]: any };

const STORAGE_KEY = 'yapup_demo_data_v1';

function getInitialData() {
  const now = Date.now();
  return {
    me: {
      id: 'user_aarav',
      campus: 'kiet.edu',
      verified_email: 'aarav@kiet.edu',
      name: 'Aarav Sharma',
      bio: 'Coffee, code, and conversations. ☕💻',
      course: 'B.Tech · CSE',
      year: '2nd year',
      interests: 'Coding, Music, Photography',
      created: now - 86400000 * 5,
    },
    colleges: [
      { domain: 'kiet.edu', name: 'KIET Group of Institutions' },
      { domain: 'iitd.ac.in', name: 'IIT Delhi' },
      { domain: 'iitb.ac.in', name: 'IIT Bombay' },
      { domain: 'bits-pilani.ac.in', name: 'BITS Pilani' },
      { domain: 'vit.ac.in', name: 'VIT' },
    ],
    posts: [
      {
        id: 'post_1',
        campus: 'kiet.edu',
        author: 'user_meera',
        name: 'Meera Kapoor',
        course: 'B.Tech · IT',
        body: 'Anyone up for a little golden-hour photo walk around campus this Friday? Bring a camera, or just your phone. Good company is the only requirement. ☀️📸',
        category: 'Campus life',
        image: null,
        likes: 12,
        liked: false,
        comments: 3,
        created: now - 3600000 * 2,
      },
      {
        id: 'post_2',
        campus: 'kiet.edu',
        author: 'user_kabir',
        name: 'Kabir Singh',
        course: 'B.Tech · CSE',
        body: 'Putting together a small study group for the next DSA test. No question is too basic. Who’s in? We can grab the corner tables at the library. 📚',
        category: 'Academics',
        image: null,
        likes: 18,
        liked: true,
        comments: 7,
        created: now - 3600000 * 5,
      },
      {
        id: 'post_3',
        campus: 'kiet.edu',
        author: 'user_ananya',
        name: 'Ananya Verma',
        course: 'B.Tech · ECE',
        body: 'Has anyone tried the new sandwiches at the south campus cafeteria? Asking for a very hungry friend 👀🥪',
        category: 'Questions',
        image: null,
        likes: 9,
        liked: false,
        comments: 4,
        created: now - 3600000 * 12,
      },
    ],
    events: [
      {
        id: 'ev_1',
        campus: 'kiet.edu',
        author: 'user_aarav',
        title: 'Chai & absolutely no agenda ☕',
        description: 'A little break from the usual lectures. Come as you are, grab a chai, and let’s talk about life.',
        category: 'Hangout',
        location: 'The Campus Canteen',
        starts: now + 86400000 * 2,
        capacity: 25,
        attending: 14,
        joined: true,
        host: 'Aarav Sharma',
      },
      {
        id: 'ev_2',
        campus: 'kiet.edu',
        author: 'user_kabir',
        title: 'Build something tiny 🛠️',
        description: 'Casual hack afternoon. Bring your laptop, hack on a side project or solve some fun problems together.',
        category: 'Workshop',
        location: 'Innovation Lab, 2nd Floor',
        starts: now + 86400000 * 4,
        capacity: 20,
        attending: 9,
        joined: false,
        host: 'Kabir Singh',
      },
    ],
    clubs: [
      {
        id: 'club_1',
        campus: 'kiet.edu',
        name: 'Code & Coffee',
        category: 'Tech & coding',
        description: 'Build together. Break things. Learn something new every weekend. All skill levels welcome!',
        members: 64,
        founder: 'Kabir Singh',
        joined: true,
      },
      {
        id: 'club_2',
        campus: 'kiet.edu',
        name: 'The Creative Corner',
        category: 'Arts & culture',
        description: 'For people who find a little art in everything. Photography, sketches, design, and aesthetics.',
        members: 42,
        founder: 'Meera Kapoor',
        joined: false,
      },
      {
        id: 'club_3',
        campus: 'kiet.edu',
        name: 'Badminton Buddies',
        category: 'Sports',
        description: 'Casual rallies every weekday after 5 PM at the sports complex.',
        members: 28,
        founder: 'Ananya Verma',
        joined: false,
      },
    ],
    members: [
      {
        id: 'user_aarav',
        name: 'Aarav Sharma',
        campus: 'kiet.edu',
        course: 'B.Tech · CSE',
        year: '2nd year',
        bio: 'Coffee, code, and conversations.',
        interests: 'Coding, Music, Photography',
      },
      {
        id: 'user_meera',
        name: 'Meera Kapoor',
        campus: 'kiet.edu',
        course: 'B.Tech · IT',
        year: '3rd year',
        bio: 'Finding light in small moments.',
        interests: 'Photography, Design, Chai',
      },
      {
        id: 'user_kabir',
        name: 'Kabir Singh',
        campus: 'kiet.edu',
        course: 'B.Tech · CSE',
        year: '2nd year',
        bio: 'Algorithms by day, guitar by night.',
        interests: 'DSA, Web3, Guitar',
      },
      {
        id: 'user_ananya',
        name: 'Ananya Verma',
        campus: 'kiet.edu',
        course: 'B.Tech · ECE',
        year: '1st year',
        bio: 'Always curious, always hungry.',
        interests: 'Robotics, Badminton, Food',
      },
    ],
    messages: [
      {
        id: 'msg_1',
        name: 'Meera Kapoor',
        author: 'user_meera',
        body: 'Hey everyone! Welcome to YapUp 🎉',
        channel: 'general',
        created: now - 3600000 * 4,
      },
      {
        id: 'msg_2',
        name: 'Kabir Singh',
        author: 'user_kabir',
        body: 'Loving the vibe here. Don’t forget about the meetup this Saturday!',
        channel: 'general',
        created: now - 3600000 * 2,
      },
      {
        id: 'msg_3',
        name: 'Aarav Sharma',
        author: 'user_aarav',
        body: 'Hey guys! Ready for the week? 🚀',
        channel: 'general',
        created: now - 1800000,
      },
    ],
    comments: {
      post_1: [
        {
          id: 'c_1',
          name: 'Kabir Singh',
          body: 'Count me in! Golden hour light by the library is unreal.',
          created: now - 3600000,
        },
      ],
      post_2: [
        {
          id: 'c_2',
          name: 'Aarav Sharma',
          body: 'Let’s do it. Tree traversal is giving me a headache haha.',
          created: now - 7200000,
        },
      ],
    } as Record<string, Row[]>,
    notifications: [
      {
        id: 'notif_1',
        title: 'New RSVP',
        body: 'Meera Kapoor joined your meetup Chai & absolutely no agenda!',
        created: now - 3600000,
      },
    ],
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const init = getInitialData();
  saveData(init);
  return init;
}

function saveData(data: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export async function handleMockRequest(
  path: string,
  method = 'GET',
  data?: any,
  scope = 'campus'
): Promise<any> {
  const store = loadData();
  const cleanPath = path.split('?')[0];

  // GET /api/bootstrap
  if (cleanPath === 'bootstrap' && method === 'GET') {
    return {
      signedIn: true,
      eligible: true,
      email: store.me.verified_email,
      domain: store.me.campus,
      me: store.me,
      campus: {
        id: store.me.campus,
        name: 'KIET Group of Institutions',
        domain: store.me.campus,
      },
      colleges: store.colleges,
      otpAvailable: false,
      stats: {
        members: store.members.length,
        events: store.events.length,
        clubs: store.clubs.length,
      },
    };
  }

  // GET /api/posts
  if (cleanPath === 'posts' && method === 'GET') {
    return store.posts;
  }

  // POST /api/posts
  if (cleanPath === 'posts' && method === 'POST') {
    let body = '';
    let category = 'Campus life';
    if (data instanceof FormData) {
      body = String(data.get('body') || '');
      category = String(data.get('category') || 'Campus life');
    } else if (data) {
      body = data.body || '';
      category = data.category || 'Campus life';
    }
    const newPost = {
      id: 'post_' + Date.now(),
      campus: scope === 'global' ? 'global' : store.me.campus,
      author: store.me.id,
      name: store.me.name,
      course: store.me.course,
      body,
      category,
      image: null,
      likes: 0,
      liked: false,
      comments: 0,
      created: Date.now(),
    };
    store.posts.unshift(newPost);
    saveData(store);
    return { id: newPost.id };
  }

  // DELETE /api/posts/:id
  const postMatch = cleanPath.match(/^posts\/([^/]+)$/);
  if (postMatch && method === 'DELETE') {
    store.posts = store.posts.filter((p: Row) => p.id !== postMatch[1]);
    saveData(store);
    return { ok: true };
  }

  // PUT /api/posts/:id/like
  const likeMatch = cleanPath.match(/^posts\/([^/]+)\/like$/);
  if (likeMatch && method === 'PUT') {
    const post = store.posts.find((p: Row) => p.id === likeMatch[1]);
    if (post) {
      post.liked = !post.liked;
      post.likes = Math.max(0, post.likes + (post.liked ? 1 : -1));
      saveData(store);
    }
    return { ok: true };
  }

  // GET /api/posts/:id/comments
  const commentMatch = cleanPath.match(/^posts\/([^/]+)\/comments$/);
  if (commentMatch && method === 'GET') {
    return store.comments[commentMatch[1]] || [];
  }

  // POST /api/posts/:id/comments
  if (commentMatch && method === 'POST') {
    const postId = commentMatch[1];
    if (!store.comments[postId]) store.comments[postId] = [];
    const newComment = {
      id: 'c_' + Date.now(),
      name: store.me.name,
      body: data?.body || '',
      created: Date.now(),
    };
    store.comments[postId].push(newComment);
    const post = store.posts.find((p: Row) => p.id === postId);
    if (post) post.comments = (post.comments || 0) + 1;
    saveData(store);
    return { ok: true };
  }

  // GET /api/events
  if (cleanPath === 'events' && method === 'GET') {
    return store.events;
  }

  // POST /api/events
  if (cleanPath === 'events' && method === 'POST') {
    const newEvent = {
      id: 'ev_' + Date.now(),
      campus: store.me.campus,
      author: store.me.id,
      title: data.title,
      description: data.description,
      category: data.category || 'Hangout',
      location: data.location || 'Campus',
      starts: Number(data.starts) || Date.now() + 86400000,
      capacity: Number(data.capacity) || 20,
      attending: 1,
      joined: true,
      host: store.me.name,
    };
    store.events.unshift(newEvent);
    saveData(store);
    return { id: newEvent.id };
  }

  // PUT /api/events/:id/rsvp
  const rsvpMatch = cleanPath.match(/^events\/([^/]+)\/rsvp$/);
  if (rsvpMatch && method === 'PUT') {
    const ev = store.events.find((e: Row) => e.id === rsvpMatch[1]);
    if (ev) {
      ev.joined = !ev.joined;
      ev.attending = Math.max(1, ev.attending + (ev.joined ? 1 : -1));
      saveData(store);
    }
    return { ok: true };
  }

  // DELETE /api/events/:id
  const eventDeleteMatch = cleanPath.match(/^events\/([^/]+)$/);
  if (eventDeleteMatch && method === 'DELETE') {
    store.events = store.events.filter((e: Row) => e.id !== eventDeleteMatch[1]);
    saveData(store);
    return { ok: true };
  }

  // GET /api/clubs
  if (cleanPath === 'clubs' && method === 'GET') {
    return store.clubs;
  }

  // POST /api/clubs
  if (cleanPath === 'clubs' && method === 'POST') {
    const newClub = {
      id: 'club_' + Date.now(),
      campus: store.me.campus,
      name: data.name,
      category: data.category || 'General',
      description: data.description || '',
      members: 1,
      founder: store.me.name,
      joined: true,
    };
    store.clubs.unshift(newClub);
    saveData(store);
    return { id: newClub.id };
  }

  // PUT /api/clubs/:id/join
  const clubJoinMatch = cleanPath.match(/^clubs\/([^/]+)\/join$/);
  if (clubJoinMatch && method === 'PUT') {
    const club = store.clubs.find((c: Row) => c.id === clubJoinMatch[1]);
    if (club) {
      club.joined = !club.joined;
      club.members = Math.max(1, club.members + (club.joined ? 1 : -1));
      saveData(store);
    }
    return { ok: true };
  }

  // GET /api/members
  if (cleanPath === 'members' && method === 'GET') {
    return store.members;
  }

  // GET /api/messages
  if (cleanPath === 'messages' && method === 'GET') {
    const urlParams = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
    const ch = urlParams.get('channel') || 'general';
    return store.messages.filter((m: Row) => (m.channel || 'general') === ch);
  }

  // POST /api/messages
  if (cleanPath === 'messages' && method === 'POST') {
    const urlParams = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
    const ch = urlParams.get('channel') || 'general';
    const newMsg = {
      id: 'msg_' + Date.now(),
      name: store.me.name,
      author: store.me.id,
      body: data?.body || '',
      channel: ch,
      created: Date.now(),
    };
    store.messages.push(newMsg);
    saveData(store);
    return { ok: true };
  }

  // DELETE /api/messages/:id
  const msgDeleteMatch = cleanPath.match(/^messages\/([^/]+)$/);
  if (msgDeleteMatch && method === 'DELETE') {
    store.messages = store.messages.filter((m: Row) => m.id !== msgDeleteMatch[1]);
    saveData(store);
    return { ok: true };
  }

  // POST /api/profile
  if (cleanPath === 'profile' && method === 'POST') {
    store.me = {
      ...store.me,
      name: data.name || store.me.name,
      bio: data.bio || store.me.bio,
      course: data.course || store.me.course,
      year: data.year || store.me.year,
      interests: data.interests || store.me.interests,
      campus: data.campus || store.me.campus,
    };
    saveData(store);
    return { ok: true };
  }

  // GET /api/notifications
  if (cleanPath === 'notifications' && method === 'GET') {
    return store.notifications || [];
  }

  // POST /api/reports
  if (cleanPath === 'reports' && method === 'POST') {
    return { ok: true };
  }

  return { ok: true };
}
