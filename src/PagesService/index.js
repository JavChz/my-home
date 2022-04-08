let PagesService = {
  get: function () {
    let Pages = [
      { name: "Platzi", url: "https://platzi.com" },
      { name: "Crehana", url: "https://crehana.com" },
      { name: "Notion", url: "https://notion.so" },
      { name: "Clockify", url: "https://app.clockify.me/tracker" },
      { name: "ProductHunt", url: "https://www.producthunt.com" },
    ];

    if (localStorage.hasOwnProperty("PagesService_V1")) {
      Pages = JSON.parse(localStorage.getItem("PagesService_V1"));
    }
    return Pages;
  },
  set: function (Pages) {
    console.log(Pages)
    localStorage.setItem("PagesService_V1",  JSON.stringify(Pages));
  }
};

export { PagesService };
