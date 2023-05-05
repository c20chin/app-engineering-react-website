import { Link } from 'react-router-dom';
import '../ProjectsPage/Projects';

export const homeObjOne = {
  lightBg: false,
  orgText: true,
  bgimage: true,
  lightTextDesc: true,
  button: true,
  topLine: "Exclusive Access",
  headline: "App Engineering Projects",
  description:
    "A module connects UCL MSc Computer Science students and the industry",
  buttonLabel: "View all projects",
  imgStart: "",
  img: "img/bg-crop.png",
  alt: "Credit Card",
  redirect: "/all-projects",
};

export const homeObjTwo = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  button: false,
  topLine: "",
  headline: "Projects",
  description: "",
  imgStart: "",
  img: "images/svg-5.svg",
  alt: "Vault",
  event2Title: "Second Project",
  event2Description: "BLah",
  event2Image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
};

export const homeObjThree = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  button: true,
  topLine: "",
  headline: "Events",
  description: "",
  imgStart: "",
  img: "images/svg-7.svg",
  alt: "Vault",
  // event2Title: "Other Events",
  // event2Description: "BLah",
  // event2Image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
};

export const eventBanner = {
  lightBg: false,
  orgText: true,
  bgimage: true,
  lightTextDesc: true,
  button: true,
  topLine: "Exclusive Access",
  headline: "Events & News",
  buttonLabel: "View all projects",
  imgStart: "",
  img: "img/bg-crop.png",
};

export const eventRecent = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "",
  headline: "Events",
  description: "",
  imgStart: "",
  img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  alt: "Vault",
  linkTo: "/event-details",
};

export const newsRecent = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  button: false,
  topLine: "",
  headline: "News",
  description: "",
  imgStart: "",
  img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  alt: "Vault",
};
