const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function generateArrayLinks(arrayLinks) {
  return arrayLinks.map((objectLink) => Object.values(objectLink).join());
}

function handleError(error) {
  throw new Error(error.message);
}

async function checkLinksStatus(links) {
  try {
    const linksStatus = await Promise.all(
      links.map(async (url) => {
        const res = await fetch(url);
        return `${res.status} - ${res.statusText}`;
      })
    );

    return linksStatus;
  } catch (e) {
    handleError(e);
  }
}

async function validateLinks(links) {
  try {
    const arrayLinks = links
      .filter((item) => typeof item !== "string")
      .map((l) => generateArrayLinks(l));

    const status = [];

    for (const links of arrayLinks) {
      status.push(await checkLinksStatus(links));
    }

    const linksWithStatus = links
      .filter((item) => typeof item !== "string")
      .map((arrLinks, arrIndex) =>
        arrLinks.map((objLink, index) => ({
          ...objLink,
          status: status[arrIndex][index],
        }))
      );

    return linksWithStatus;
  } catch (e) {
    handleError(e);
  }
}

module.exports = validateLinks;
