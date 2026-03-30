import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Lucy",
  lastName: "Lu",
  name: `Lucy Lu`,
  role: "Business Professional",
  avatar: "/images/avatar.jpg",
  email: "lucyfeilu@outlook.com",
  location: "America/Los_Angeles", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Chinese"], // optional: Leave the array empty if you don't want to display languages
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
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Dedicated professional with a passion for service and communication</>,
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
    I'm Lucy, a San Francisco-based business professional with experience in <Text as="span" size="xl" weight="strong">sales</Text>, <Text as="span" size="xl" weight="strong">education</Text>, and <Text as="span" size="xl" weight="strong">customer service</Text>. I bring patience, communication skills, and a global perspective to everything I do.
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
        Lucy is a San Francisco-based business professional with a Bachelor of Arts in Business.
        With diverse experience spanning sales, education, childcare, and customer service across
        both the US and China, she brings strong communication skills, patience, and a collaborative
        spirit to every role.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
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
        timeframe: "Sep 2021 - Jan 2022",
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
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Henan University of Animal Husbandry and Economy",
        description: <>Bachelor of Arts in Business – Graduated Jul. 2023. Football (Soccer) and Marathon Club Member.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills & Interests",
    skills: [
      {
        title: "Professional Skills",
        description: (
          <>Customer Service, Communication, Cooperation, Patience</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Interests",
        description: (
          <>Soccer, Pop Music, Anime</>
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
  title: "Writing about my experiences...",
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
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
