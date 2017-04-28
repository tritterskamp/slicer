import store from './init/store.js'
/** Take in the new publish urls and give us our markup back */
export function getMarkupOutput(resultFromServer) {
  console.log(resultFromServer);

  const slices = {
    ...store.getState().app.slices,
  };

  return resultFromServer.map(result => {

    const model = slices[result.sliceId];

    if (model.linkHref.match(/\.aspx$/i)) {
      model.linkHref = model.linkHref + "?var=ccmp";
    }

    if (model.hasLink) {
      return getTableMarkupWithLink(
        result.publishedUrl,
        model.altText,
        model.linkHref
      )
    }
    //default to no link
    return getTableMarkupWithJustImage(
      result.publishedUrl,
      model.altText,
    )
  }).join("");



}

/////////////////////
function getTableMarkupWithLink(imgPath, altText, linkHref) {
 return (
   `<table style="border-collapse:collapse;" width="100%"><tr><td style="padding:0;" width="100%">
    <a href="${linkHref}" target="_blank" style="text-decoration:none;">
        <img src="${imgPath}" alt="${altText}" style="display:block;" border="0">
    </a></td></tr></table>`
 )
}


function getTableMarkupWithJustImage(imgPath, altText) {
  return (
    `<table style="border-collapse:collapse;" width="100%"><tr><td style="padding:0;" width="100%">
        <img src="${imgPath}" alt="${altText}" style="display:block;" border="0">
    </td></tr></table>`
  )
}








//////////////////////

/* Open a new browser window with inner text */
export function launchNewBrowserTab(text) {
  let w = window.open();
  w.document.write(`<pre id="markup-output"></pre>`);
  w.document.getElementById("markup-output").textContent = text;
}
