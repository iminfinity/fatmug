import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { auth, storage } from "../firebase/utils";

const UserContext = createContext();

export const useUserData = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [articles, setArticles] = useState([]);
  const [popularArticlesInfo, setPopularArticlesInfo] = useState([]);

  const alert = useAlert();
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
        if (userId === "") {
          getUserData(user.uid);
          getPopularArticlesInfo();
        }
      }
    });
  }, [userId]);

  const getUserData = (uid) => {
    axios
      .get(`https://floating-bayou-25144.herokuapp.com/get-user-data/${uid}`)
      .then((response) => {
        const data = response.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUserId(data.userId);
        setArticles(data.articles);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getUserArticles = () => {
    axios
      .get(
        `https://floating-bayou-25144.herokuapp.com/get-user-articles//${userId}`
      )
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addNewArticle = (title, description, articleId) => {
    const article = {
      heading: title,
      content: description,
      writer: userId,
      articleId: articleId,
    };
    axios
      .post(
        `https://floating-bayou-25144.herokuapp.com/add-article/${userId}`,
        article
      )
      .then(() => {
        getUserArticles();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateArticle = (title, description, articleIndex) => {
    const articleId = articles[parseInt(articleIndex)].articleId;
    let updatedArticle = articles[articleIndex];
    updatedArticle.heading = title;
    updatedArticle.content = description;

    axios
      .post(
        `https://floating-bayou-25144.herokuapp.com/update-article/${userId}/${articleId}`,
        updatedArticle
      )
      .then(() => {
        getUserArticles();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteArticle = (articleId) => {
    axios
      .delete(
        `https://floating-bayou-25144.herokuapp.com/remove-article/${userId}/${articleId}`,
        {}
      )
      .then(() => {
        alert.show("Deleted");
        getUserArticles();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const uploadImage = (source, articleId) => {
    storage
      .ref(`${userId}/${articleId}`)
      .put(source)
      .then(() => {
        console.log("Image uploaded");
      })
      .catch((error) => console.log(error.message));
  };

  const getPopularArticlesInfo = () => {
    axios
      .get(`https://floating-bayou-25144.herokuapp.com/get-popular-articles`)
      .then((response) => {
        setPopularArticlesInfo(response.data.currentArticles);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const value = {
    signedIn,
    firstName,
    lastName,
    userId,
    articles,
    popularArticlesInfo,
    addNewArticle,
    updateArticle,
    deleteArticle,
    getUserArticles,
    uploadImage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
