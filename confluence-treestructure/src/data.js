const LINK = "www.google.com";

const IOS_ARTICLES = {
  id: 6,
  label: "iOS Articles",
  link: LINK,
  children: [
    { id: 23, label: "VPN with iOS", link: LINK },
    { id: 24, label: "Upgrade iOS", link: LINK },
  ],
};

const MAC_ARTICLES = {
  id: 12,
  label: "Mac Articles",
  link: LINK,
  children: [
    { id: 29, label: "Fix MacOS", link: LINK },
    { id: 30, label: "Do something with Mac", link: LINK },
  ],
};

const data = [
  {
    id: 1001,
    label: "Knowledge Base Articles",
    link: LINK,
    children: [IOS_ARTICLES, MAC_ARTICLES],
  },
  {
    id: 201,
    label: "Dev tools",
    link: LINK,
  },
];

export default data;
