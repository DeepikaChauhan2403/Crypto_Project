export const isAdded = (id) => {
  console.log("id", id)
    const watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
      let arr = JSON.parse(watchlist);
      if (arr.includes(id)) {
        return true;
      } 
    }
    return false;
  };

  // export const isAdded = (id) => {
  //   console.log("id", id)
  //     const watchlist = localStorage.getItem("watchlist");
  //     if (watchlist) {
  //       let arr = JSON.parse(watchlist);
  //       if (arr.includes(id)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //     return false;
  //   };