import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { auth, storage } from "../firabase/utils";
import { v4 as uuidv4 } from "uuid";
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
  const alert = useAlert();
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
        if (userId === "") {
          getUserData(user.uid);
        }
      }
    });
  }, [userId]);

  const getUserData = (uid) => {
    axios
      .get(`https://floating-bayou-25144.herokuapp.com/get-user-data//${uid}`)
      .then((response) => {
        const data = response.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUserId(data.userId);
        setArticles(data.articles);
      });
  };

  const getUserArticles = () => {
    axios
      .get(
        `https://floating-bayou-25144.herokuapp.com/get-user-articles//${userId}`
      )
      .then((response) => {
        setArticles(response.data);
      });
  };

  const addNewArticle = (title, description, articleId) => {
    const article = {
      heading: title,
      content: description,
      writer: userId,
      articleId: articleId,
    };
    axios.post(
      `https://floating-bayou-25144.herokuapp.com/add-article/${userId}`,
      article
    );

    getUserArticles();
  };

  const updateArticle = (title, description, articleIndex) => {
    const articleId = articles[parseInt(articleIndex)].articleId;
    let updatedArticle = articles[articleIndex];
    updatedArticle.heading = title;
    updatedArticle.content = description;

    axios.post(
      `https://floating-bayou-25144.herokuapp.com/update-article/${userId}/${articleId}`,
      updatedArticle
    );

    getUserArticles();
  };

  const deleteArticle = (articleId) => {
    axios
      .delete(
        `https://floating-bayou-25144.herokuapp.com/remove-article/${userId}/${articleId}`,
        {}
      )
      .then(() => {
        alert.show("Deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });

    getUserArticles();
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

  const value = {
    signedIn,
    firstName,
    lastName,
    userId,
    articles,
    addNewArticle,
    updateArticle,
    deleteArticle,
    getUserArticles,
    uploadImage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
