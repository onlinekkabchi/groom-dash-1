export const formFetch = async (BODY) => {
  try {
    await fetch("/dash/writedash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(BODY),
    });
  } catch (err) {
    alert(err);
  } finally {
    window.location.hash = "#home";
  }
};
