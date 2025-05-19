import axios from "axios";

const API_KEY = "58a1f49d9b24a50a62643b06dae0cca0";
const BASE_URL = "https://api.themoviedb.org/3";

export const loadMovieList = (category, page) => {
  return fetch(`${BASE_URL}/movie/${category}?&page=${page}&api_key=${API_KEY}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((data) => {
      return data;
    });
};

export const loadMovieDetail = (movieId) => {
  return fetch(`${BASE_URL}/${movieId}?api_key=${API_KEY}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((data) => {
      return data;
    });
};

export const login = async (username, password) => {
  try {
    const tokenResponse = await axios.get(
      `${BASE_URL}/authentication/token/new`,
      { params: { api_key: API_KEY } }
    );
    const requestToken = tokenResponse.data.request_token;

    await axios.post(
      `${BASE_URL}/authentication/token/validate_with_login`,
      {
        username,
        password,
        request_token: requestToken,
      },
      {
        params: { api_key: API_KEY },
      }
    );

    const sessionResponse = await axios.post(
      `${BASE_URL}/authentication/session/new`,
      {
        request_token: requestToken,
      },
      {
        params: { api_key: API_KEY },
      }
    );
    const sessionId = sessionResponse.data.session_id;

    const accountResponse = await axios.get(`${BASE_URL}/account`, {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    });
    const accountId = accountResponse.data.id;

    return {
      sessionId,
      accountId,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.response?.data?.status_message || "Failed to login");
  }
};

export const getFavoriteMovies = async (accountId, sessionId) => {
  const response = await axios.get(
    `${BASE_URL}/account/${accountId}/favorite/movies`,
    {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    }
  );
  return response.data.results;
};

export const getRatedMovies = async (accountId, sessionId) => {
  const response = await axios.get(
    `${BASE_URL}/account/${accountId}/rated/movies`,
    {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    }
  );
  return response.data.results;
};

export const markAsFavorite = async (
  accountId,
  sessionId,
  movieId,
  isFavorite
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          favorite: isFavorite,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking favorite:", error);
    return null;
  }
};

