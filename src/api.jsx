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

export const toggleFavoriteStatus = async (
  accountId,
  sessionId,
  movieId,
  isFavorite
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/account/${accountId}/favorite`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: isFavorite,
      },
      {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite:", error.response?.data || error);
    return null;
  }
};

export const getMovieDetail = async (movieId) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return await res.json();
};

export const getMovieRating = async (accountId, sessionId, movieId) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/account_states?api_key=${API_KEY}&session_id=${sessionId}`
  );
  const data = await res.json();
  return data.rated ? data.rated.value : null;
};

export const rateMovie = async (sessionId, movieId, value) => {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/movie/${movieId}/rating`,
      { value },
      {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to rate movie:",
      error.response?.data || error.message
    );
    return null;
  }
};

