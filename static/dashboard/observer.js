export const observer = new MutationObserver(function (mutationsList) {
  console.log(mutationsList);

  //   for (let mutation of mutationsList) {
  //     if (mutation.type === "childList") {
  //       console.log("Child nodes have been added or removed.");
  //     }
  //   }
});
