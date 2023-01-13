from tech_news.database import db


# Requisito 10
def top_5_news():
    top_list = []
    news = list(db.news.find({}, {"_id": False}))
    sorted_news = sorted(
        news, key=lambda new: new["comments_count"], reverse=1
    )
    for item in sorted_news:
        top_list.append((item["title"], item["url"]))
    return top_list[0:5]


# Requisito 11
def top_5_categories():
    top_list = []
    sorted_categories = list(
        db.news.aggregate(
            [
                {"$group": {"_id": "$category", "popularity": {"$sum": 1}}},
                {"$sort": {"popularity": -1, "_id": 1}},
            ]
        )
    )
    for item in sorted_categories:
        top_list.append((item["_id"]))
    return top_list[0:5]
