import React, { Component } from "react";
import { connect } from "react-redux";
import { getNewsArticles } from "../../redux/actions/newsAction";
import { searchNewsArticles } from "../../redux/actions/searchNewsActions";
import { NewsArticle } from "./newsArticles";
import { SelectBar } from "../selectBar/index";
import Paginator from "./paginator";
import "./news.css";

class News extends Component {
  state = {
    currentPage: 1,
    newsPerPage: 4,
    newsArticles: []
  };
  componentDidMount() {
    const { getNewsArticles } = this.props;
    getNewsArticles();
  }

  /**
   * Check if news
   * articles exist
   * return true
   * if array has dataz
   */
  checkNewsArticles(news) {
    const newsLength = news.length;
    if (newsLength >= 1) {
      return true;
    }
    return false;
  }

  /**
   * handle click of paginator
   */
  handlePaginatorClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  addToArray = currentNews => {
    const { news } = this.props;
    if (news.length >= 1) {
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(news.length / currentNews); i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
  };

  render() {
    const { news, isLoading } = this.props;
    const { currentPage, newsPerPage } = this.state;
    // logic for displaying news
    const indexOfTheLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfTheLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfTheLastNews);

    return (
      <div>
        {isLoading ? (
          <h1 className="loading_text">Fetching News articles ...</h1>
        ) : (
          <div>
            <SelectBar />
            {this.checkNewsArticles(news) ? (
              <div>
                <NewsArticle news={currentNews} />
                <Paginator
                  currentNews={currentNews}
                  news={news}
                  handlePaginatorClick={this.handlePaginatorClick}
                />
              </div>
            ) : (
              <div>
                <h1 className="loading_text">No news matching your search</h1>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ news }) => ({
  news: news.news,
  isLoading: news.isLoading
});
const actionCreators = {
  getNewsArticles,
  searchNewsArticles
};

export default connect(
  mapStateToProps,
  actionCreators
)(News);
