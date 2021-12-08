import { API, cPrint } from "../../backend";

export const signup = async (user) => {
  // cPrint(JSON.stringify(user));
  try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // cPrint(await response.json());
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (user) => {
  cPrint(JSON.stringify(user));
  try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = async (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();

    try {
      await fetch(`${API}/signout`, {
        method: "GET",
      });
    } catch (err) {
      return console.log(err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
