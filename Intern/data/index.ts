import { link } from "fs";

export const navItems = [
  { name: "HOME", link: "/" },
  { name: "ABOUT", link: "/about" },
  {
    name: "TYPE OF PARK",
    link: "/park",
    dropdown: true,
    items: [
      { name: "National Parks", link: "/parks/national" },
      { name: "State Parks", link: "/parks/state" },
      { name: "Local Parks", link: "/parks/local" },
    ],
  },
  { name: "NURSERY", link: "/nursery" },
  { name: "LOCATION", link: "/location" },
];

export const projects = [
  {
    id: 1,
    title: "3D Solar System Planets to Explore",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "/ui.earth.com",
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "/ui.yoom.com",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "/ui.aiimg.com",
  },
  {
    id: 4,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "/ui.apple.com",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Adopt Park",
    className: "md:col-span-2",
    thumbnail: "/plant.png",
  },
  {
    id: 2,
    title: "Book Park",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/booking.png",
  },
  {
    id: 3,
    title: "Lodge Complaint",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/complain.png",
    url: "/Form/",
  },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];

// data/parks.ts

export interface Park {
  id: number;
  title: string;
  description: string;
  image: string; // Background image
  url: string; // Link to park website
  icons: string[]; // Array of icon URLs
}
// data/index.ts

export interface Park {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  icons: string[];
}

export const parks: Park[] = [
  {
    id: 1,
    title: "Central Park",
    description:
      "Central Park is an urban park in Manhattan, New York City, located between the Upper West Side and the Upper East Side. It is the most visited urban park in the United States.",
    image: "/images/parkimage.jpg",
    url: "/parks/central",
    icons: ["/icon1.png", "/icon2.png", "/icon3.png"],
  },
  {
    id: 2,
    title: "Golden Gate Park",
    description:
      "Golden Gate Park is a large urban park consisting of 1,017 acres of public grounds. It is located in San Francisco, California, United States, and is administered by the San Francisco Recreation & Parks Department.",
    image: "/images/parkimage.jpg",
    url: "/parks/golden",
    icons: ["/icon4.png", "/icon5.png", "/icon6.png"],
  },
  {
    id: 3,
    title: "Hyde Park",
    description:
      "Hyde Park is a Grade I-listed major park in Central London. It is the largest of four Royal Parks that form a chain from the entrance of Kensington Palace through Kensington Gardens and Hyde Park, via Hyde Park Corner and Green Park past the main entrance to Buckingham Palace.",
    image: "/images/parkimage.jpg",
    url: "/parks/hyde",
    icons: ["/icon7.png", "/icon8.png", "/icon9.png"],
  },
];

export const recommendedParks: Park[] = [
  {
    id: 1,
    title: "Yosemite National Park",
    description:
      "Yosemite National Park is located in California's Sierra Nevada mountains. It is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more.",
    image: "/images/parkimage.jpg",
    url: "/parks/",
    icons: ["/icon10.png", "/icon11.png", "/icon12.png"],
  },
  {
    id: 2,
    title: "Yellowstone National Park",
    description:
      "Yellowstone National Park is America's first national park. It is known for its wildlife and its many geothermal features, especially Old Faithful Geyser. Yellowstone encompasses 2.2 million acres of wildlands across Wyoming, Montana, and Idaho.",
    image: "/images/parkimage.jpg",
    url: "https://www.nps.gov/yell/index.htm",
    icons: ["/icon13.png", "/icon14.png", "/icon15.png"],
  },
  {
    id: 3,
    title: "Zion National Park",
    description:
      "Zion National Park is located in southwestern Utah near the town of Springdale. It is known for its stunning canyons and red rock cliffs, as well as its diverse plant and animal life. Zion Canyon Scenic Drive cuts through its main section, leading to forest trails along the Virgin River.",
    image: "/images/parkimage.jpg",
    url: "https://www.nps.gov/zion/index.htm",
    icons: ["/icon16.png", "/icon17.png", "/icon18.png"],
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "#",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "#",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "#",
  },
];
