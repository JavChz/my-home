let PagesService;

PagesService = [
  { name: "Platzi", url: "https://platzi.com", number: "1" },
  { name: "Crehana", url: "https://crehana.com", number: "2" },
  { name: "Notion", url: "https://notion.so", number: "3" },
  { name: "Clockify", url: "https://app.clockify.me/tracker", number: "4" },
  { name: "ProductHunt", url: "https://www.producthunt.com", number: "5" },
];

if (localStorage.hasOwnProperty("PagesService_V1")) {
  PagesService = JSON.parse(localStorage.getItem("PagesService_V1"));
}
export { PagesService };
