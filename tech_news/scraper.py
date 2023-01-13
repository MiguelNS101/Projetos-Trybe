import requests
import time
import parsel
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    time.sleep(1)
    headers = {"user-agent", "Fake user-agent"}
    timeout = 3

    try:
        selector = requests.get(url, headers, timeout)
    except requests.ReadTimeout:
        return None

    if selector.status_code == 200:
        return selector.text
    else:
        return None


# Requisito 2
def scrape_novidades(html_content):
    list = []
    selector = parsel.Selector(text=html_content)
    for page in selector.css("a.cs-overlay-link::attr(href)").getall():
        list.append(page)

    return list


# Requisito 3
def scrape_next_page_link(html_content):
    selector = parsel.Selector(text=html_content)
    result = selector.css("a.next::attr(href)").get()
    return result


# Requisito 4
def scrape_noticia(html_content):
    selector = parsel.Selector(html_content)

    return {
        "url": selector.css("link[rel='canonical']::attr(href)").get(),
        "title": selector.css("h1.entry-title::text").get().strip(),
        "timestamp": selector.css("li.meta-date::text").get(),
        "writer": selector.css("li.meta-author span.author > a::text").get(),
        "comments_count": len(selector.css("ol.comment-list li").getall()),
        "summary": "".join(
            selector.css(
                "div.entry-content > p:nth-of-type(1) *::text"
            ).getall()
        ).strip(),
        "tags": selector.css("a[rel='tag']::text").getall(),
        "category": selector.css("a.category-style span.label::text").get(),
    }


# Requisito 5
def get_tech_news(amount):
    list = []
    url = "https://blog.betrybe.com"

    while len(list) < amount:
        page = fetch(url)
        for link in scrape_novidades(page):
            if len(list) < amount:
                list.append(scrape_noticia(fetch(link)))
        url = scrape_next_page_link(fetch(url))
    create_news(list)

    return list
