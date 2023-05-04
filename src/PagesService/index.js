let PagesService = {
  get: function () {
    let Pages = [
      { name: "ComfyRead", url: "https://javchz.github.io/ComfyRead/" },
      { name: "TaskTracker", url: "https://javchz.github.io/tasktracker/" },
      { name: "Hacker News", url: "https://news.ycombinator.com/news" },
      { name: "ProductHunt", url: "https://www.producthunt.com" },
    ];

    if (localStorage.hasOwnProperty("PagesService_V1")) {
      Pages = JSON.parse(localStorage.getItem("PagesService_V1"));
    }
    return Pages;
  },
  set: function (Pages) {
    localStorage.setItem("PagesService_V1",  JSON.stringify(Pages));
  }
};

export { PagesService };
