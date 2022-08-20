const cat_result = document.getElementById("cat_result");
const dog_result = document.getElementById("dog_result");
const cat_btn = document.getElementById("cat_btn");
const dog_btn = document.getElementById("dog_btn");

cat_btn.addEventListener("click", getRandomCat);
dog_btn.addEventListener("click", getRandomDog);

async function getRandomCat() {
  await fetch("https://aws.random.cat/meow")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      cat_result.innerHTML = `<img src="${data.file}"/>`;
    });
}

async function getRandomDog() {
  await fetch("https://random.dog/woof.json")
    .then((res) => res.json())
    .then((data) => {
      // 랜덤 도그 api 안에 mp4 파일이나 webm 확장자의 동영상 파일이 첨부되어 있어서
      // fetch로 랜덤 도그 api 가져올 때 동영상 파일이 있으면 다시 getRandomDog()
      // 함수를 호출하도록 설정
      if (data.url.includes(".mp4") || data.url.includes(".webm")) {
        getRandomDog();
      } else {
        dog_result.innerHTML = `<img src="${data.url}"/>`;
      }
    });
}
