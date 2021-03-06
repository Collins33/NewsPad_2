import React, { Component } from "react";
import { connect } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { getNewsArticles } from "../../redux/actions/newsAction";
import { searchNewsArticles } from "../../redux/actions/searchNewsActions";
import { saveNewsArticles } from "../../redux/actions/saveNewsAction";
import { NewsArticle } from "./newsArticles";
import { SelectBar } from "../selectBar/index";
import { NetworkError } from "../networkError/index";
import Paginator from "./paginator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./news.scss";
import checkNewsArticles from "../../utils/news";

toast.configure();
class News extends Component {
  state = {
    currentPage: 1,
    newsPerPage: 4,
    categories: [
      { value: "business" },
      { value: "bitcoin" },
      { value: "politics" },
      { value: "sports" },
      { value: "cars" },
      { value: "technology" },
      { value: "entertainment" },
      { value: "education" },
      { value: "health" },
      { value: "science" },
      { value: "general" }
    ]
  };
  componentDidMount() {
    const { getNewsArticles } = this.props;
    getNewsArticles();
  }

  /**
   * handle click of paginator
   */
  handlePaginatorClick = event => {
    window.scrollTo(0, 0);
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  /**
   * handle click of select bar
   */
  handleSelectBarClick = event => {
    const { searchNewsArticles } = this.props;
    const selectBarValue = event.target.value;
    searchNewsArticles(selectBarValue);
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

  /**
   * Check if the image is null
   */
  checkNewsImage = imageUrl => {
    return imageUrl == null;
  };

  getSingleNewsArticle = ({
    author,
    title,
    description,
    url,
    urlToImage,
    source
  }) => {
    const dataSave = {
      author,
      title,
      description,
      url,
      urlToImage,
      source: source.name
    };
    const { saveNewsArticles } = this.props;
    saveNewsArticles(dataSave);
  };

  /**
   * Check for network issue
   */
  checkNetworkIssue = () => {
    const { error } = this.props;
    return error;
  };

  render() {
    const { news, isLoading, userLoginEmail } = this.props;
    const { currentPage, newsPerPage, categories } = this.state;
    // logic for displaying news
    const indexOfTheLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfTheLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfTheLastNews);
    const width = 500;
    const height = 500;
    const email = localStorage.getItem("email");
    return (
      <div>
        <ToastContainer />
        {isLoading ? (
          <div className="loader">
            <Loader type="Puff" color="#00BFFF" height={height} width={width} />
          </div>
        ) : (
          <div>
            {this.checkNetworkIssue() ? (
              <NetworkError />
            ) : (
              <div>
                <SelectBar
                  handleSelectBarClick={this.handleSelectBarClick}
                  categories={categories}
                />
                <div>
                  {checkNewsArticles(news) ? (
                    <>
                      <NewsArticle
                        news={currentNews}
                        checkNewsImage={this.checkNewsImage}
                        email={email}
                        getSingleNewsArticle={this.getSingleNewsArticle}
                        userLoginEmail={userLoginEmail}
                      />
                      <Paginator
                        currentNews={currentNews}
                        news={news}
                        handlePaginatorClick={this.handlePaginatorClick}
                      />
                    </>
                  ) : (
                    <div>
                      <h1 className="loading_text">
                        No news matching your search
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ news, saveNews, userLogin }) => ({
  news: news.news,
  isLoading: news.isLoading,
  error: news.error,
  saveNewsLoading: saveNews.isLoading,
  saveNewsError: saveNews.error,
  saveNewsSuccess: saveNews.success,
  userLoginEmail: userLogin.email
});
const actionCreators = {
  getNewsArticles,
  searchNewsArticles,
  saveNewsArticles
};

export default connect(
  mapStateToProps,
  actionCreators
)(News);

// allow us to test the render of the component
export { News };
