async function fetchMemes() {
  const memes = await fetch("https://api.imgflip.com/get_memes");
  console.log(memes);
}

const results = await fetchMemes()

console.log(results)