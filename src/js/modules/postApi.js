const postApi = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseLog = await response.json();
    if (response.status == 500 || response.status == 400) window.location.href = "https://buckedup.com";
    if (!response.ok) {
      throw new Error("Api post error.");
    }
    return responseLog;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default postApi;
