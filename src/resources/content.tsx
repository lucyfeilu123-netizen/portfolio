import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Lucy",
  lastName: "Lu",
  name: `Lucy Lu`,
  role: "Sales & Marketing Specialist",
  avatar: "/portfolio/images/avatar.jpg",
  email: "lucyfeilu@outlook.com",
  location: "America/Los_Angeles",
  languages: ["English", "Chinese"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on my latest work and experiences</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/lucyfeilu123-netizen",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/lucyfeilu",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/portfolio/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Bilingual sales professional bridging cultures and building connections</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
    I'm Lucy, a San Francisco-based <Text as="span" size="xl" weight="strong">Sales & Marketing Specialist</Text> with a global perspective. From international e-commerce to building websites and automation tools, I bring <Text as="span" size="xl" weight="strong">creativity</Text>, <Text as="span" size="xl" weight="strong">problem-solving</Text>, and a passion for connecting with people.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from San Francisco, CA`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Lucy is a kind and easy-going professional who moved from China to the United States,
        bringing a bilingual skill set and a global perspective. She's a fast learner who thrives
        on multitasking and solving problems in creative ways. Whether it's closing international
        sales deals, building websites, or learning culinary arts, Lucy stays focused and brings
        energy to everything she does. When she's not working, you'll find her meditating in the
        morning, walking her adorable dog Gabri, or exploring the cultural differences between
        East and West.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Job Corps",
        timeframe: "Jan 2026 - Present",
        role: "Culinary Art Student – San Francisco, CA",
        achievements: [
          <>
            Enrolled in the Culinary Art program, rapidly completing training targets as a fast learner.
          </>,
          <>
            Developing professional culinary skills while balancing self-study in coding and personal projects.
          </>,
        ],
        images: [],
      },
      {
        company: "Self-Employed / Freelance",
        timeframe: "Jan 2025 - Dec 2025",
        role: "Student & Self-Taught Developer – San Francisco, CA",
        achievements: [
          <>
            Focused on earning GED and attending courses at City College of San Francisco (CCSF).
          </>,
          <>
            Self-studied coding and completed Decode Academy courses, building websites and automation tools.
          </>,
          <>
            Attended daily morning meditation classes to maintain focus and well-being.
          </>,
        ],
        images: [],
      },
      {
        company: "Babysitter / Caretaker",
        timeframe: "Oct 2024 - Jan 2025",
        role: "Childcare Provider – San Francisco, CA",
        achievements: [
          <>
            Took care of 3 children (ages 2, 6, and 7) every weekday, managing school transportation,
            meals, activities, and bedtime routines.
          </>,
          <>
            Maintained organized and clean living spaces while ensuring the children's safety and well-being.
          </>,
        ],
        images: [],
      },
      {
        company: "CKF Technology Company",
        timeframe: "Oct 2022 - Jul 2024",
        role: "Sales Representative – Shenzhen, China",
        achievements: [
          <>
            Sold electronics products on online retail storefronts, providing comprehensive pre- and
            after-sales services with a focus on customer satisfaction.
          </>,
          <>
            Promoted products across social media platforms including WhatsApp, WeChat, and Telegram,
            tracking click-through rates and adjusting listings based on customer trends.
          </>,
          <>
            Negotiated shipping and handling services through customs clearance for international orders.
          </>,
        ],
        images: [],
      },
      {
        company: "Henan University of Economics and Law",
        timeframe: "Sep 2019 - Jul 2023",
        role: "Server – Zhengzhou, China",
        achievements: [
          <>
            Served pre-made hotpot for over 100 college students daily during lunch and dinner rushes.
          </>,
          <>
            Took customer orders and operated the register efficiently during peak hours.
          </>,
        ],
        images: [],
      },
      {
        company: "Sibo Education",
        timeframe: "May 2020 - Aug 2020",
        role: "Teacher – Guangzhou, China",
        achievements: [
          <>
            Taught 20–30 students: Chinese for 2nd and 3rd grade levels, and English for 8th and 9th
            grade levels, focusing on grammar, pronunciation, and vocabulary.
          </>,
          <>
            Led field trips where students learned English through practical activities, and managed
            students during lunch, recess, and field trips.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Job Corps – Culinary Art Program",
        description: <>Currently enrolled since early 2026. Fast-tracking training completion.</>,
      },
      {
        name: "Decode Academy",
        description: <>Completed coding courses in web development and automation tools.</>,
      },
      {
        name: "City College of San Francisco (CCSF)",
        description: <>Attended courses while preparing for GED (2025).</>,
      },
      {
        name: "Henan University of Animal Husbandry and Economy",
        description: <>Bachelor of Arts in Business – Sep. 2019 to Jul. 2023. Football (Soccer) and Marathon Club Member.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills & Interests",
    skills: [
      {
        title: "Sales & Marketing",
        description: (
          <>International e-commerce, social media marketing, customer relationship management, product listing optimization, and customs negotiation.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Digital Tools",
        description: (
          <>Excel, Photoshop, Canva, social media platforms (Instagram, WeChat, WhatsApp, Telegram), website building, and automation tools.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Soft Skills",
        description: (
          <>Bilingual (English & Chinese), multitasking, creative problem-solving, patience, fast learner, strong focus and dedication.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Interests",
        description: (
          <>Soccer, Pop Music, Anime, Meditation, Cooking, Dogs (proud mom of Gabri!)</>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Lucy's Blog",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Projects and experiences by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    // Left column (indices 0, 3, 6, 9, 12)
    // Center sticky column (indices 1, 4, 7, 10, 13) — best face/subject shots here
    // Right column (indices 2, 5, 8, 11, 14)
    {
      src: "/portfolio/images/gallery/horizontal-1.jpg",
      alt: "Lucy at SFMOMA in San Francisco",
      orientation: "horizontal",
    },
    {
      src: "/portfolio/images/gallery/vertical-3.jpg",
      alt: "Lucy at the Golden Gate Bridge up close",
      orientation: "vertical",
    },
    {
      src: "/portfolio/images/gallery/horizontal-2.jpg",
      alt: "Lucy at the Unconditional Surrender statue in San Diego",
      orientation: "horizontal",
    },
    {
      src: "/portfolio/images/gallery/vertical-1.jpg",
      alt: "Fun photo with a skeleton on a park bench",
      orientation: "vertical",
    },
    {
      src: "/portfolio/images/gallery/vertical-8.jpg",
      alt: "Lucy in a pink jacket",
      orientation: "vertical",
    },
    {
      src: "/portfolio/images/gallery/horizontal-4.jpg",
      alt: "Christmas morning by the tree",
      orientation: "horizontal",
    },
    {
      src: "/portfolio/images/gallery/vertical-2.jpg",
      alt: "Lucy wearing a beret and headphones at the park",
      orientation: "vertical",
    },
    {
      src: "/portfolio/images/gallery/horizontal-6.jpg",
      alt: "Gabri the dog relaxing on the bed",
      orientation: "horizontal",
    },
    {
      src: "/portfolio/images/gallery/horizontal-3.jpg",
      alt: "Lucy by the bay with the Golden Gate Bridge",
      orientation: "horizontal",
    },
    {
      src: "/portfolio/images/gallery/vertical-4.jpg",
      alt: "Lucy at the ocean cliff with sunset",
      orientation: "vertical",
    },
    {
      src: "/portfolio/images/gallery/horizontal-7.jpg",
      alt: "Gabri walking through autumn leaves",
      orientation: "horizontal",
    },
    {
      src: "/portfolio/images/gallery/vertical-5.jpg",
      alt: "Lucy with Charlie Brown at the Schulz Museum",
      orientation: "vertical",
    },
    {
      src: "/portfolio/images/gallery/horizontal-5.jpg",
      alt: "Lucy at the Snoopy book wall at Schulz Museum",
      orientation: "horizontal",
    },
    {
      src: "/portfolio/images/gallery/vertical-6.jpg",
      alt: "Mirror selfie in an elegant outfit",
      orientation: "vertical",
    },
    {
      src: "/portfolio/images/gallery/vertical-7.jpg",
      alt: "Gabri the dog lounging on the floor",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
