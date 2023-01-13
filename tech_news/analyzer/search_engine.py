from tech_news.database import search_news
from datetime import datetime


# Requisito 6
def search_by_title(title):
    list = []
    search = search_news({"title": {"$regex": f"{title.lower()}"}})
    for news in search:
        list.append((news["title"], news["url"]))
    return list


# Requisito 7
def search_by_date(date):
    try:
        list = []
        search = search_news(
            {
                "timestamp": datetime.strptime(date, "%Y-%m-%d").strftime(
                    "%d/%m/%Y"
                )
            }
        )
        for data in search:
            list.append((data["title"], data["url"]))
        return list
    except ValueError:
        raise ValueError("Data inválida")


# Requisito 8
def search_by_tag(tag):
    list = []
    search = search_news({"tags": {"$regex": f"{tag.lower().capitalize()}"}})
    for news in search:
        list.append((news["title"], news["url"]))
    return list


# Requisito 9
def search_by_category(category):
    list = []
    search = search_news(
        {"category": {"$regex": f"{category.lower().capitalize()}"}}
    )
    for news in search:
        list.append((news["title"], news["url"]))
    return list
