window.addEventListener("load", function () {
  const song = document.querySelector("#song");
  const playButton = document.querySelector(".player-play");
  const prevButton = document.querySelector(".player-prev");
  const nextButton = document.querySelector(".player-next");
  const playerDuration = document.querySelector(".player-duration");
  const remaining = document.querySelector(".player-remaining");
  const progressBar = document.querySelector("#progress-bar");
  const playerImage = document.querySelector(".player-image");
  const wrapTime = document.querySelector(".wrap-time");
  const songTitle = document.querySelector(".song-title");
  const barTime = document.createElement("div");
  const songItems = [...document.querySelectorAll(".song-item")];
  const playerRandom = document.querySelector(".player-random");
  const singerImgs = [...document.querySelectorAll(".singer-img")];
  barTime.className = "bar-time";
  wrapTime.appendChild(barTime);

  let playing = true;
  const list = [
    "thaylong.mp3",
    "roitoiluon.mp3",
    "damcuoinha.mp3",
    "muonemla.mp3",
    "saulunganhcoaikia.mp3",
  ];

  const listTitle = [
    "Thay Lòng",
    "Rồi Tới Luôn",
    "Đám Cưới Nha",
    "Muốn Em Là",
    "Sau lưng anh có ai kìa",
  ];

  let songIndex = 0;
  playButton.addEventListener("click", handleMusicPlay);
  function handleMusicPlay() {
    if (playing) {
      song.play();
      playerImage.classList.add("is-playing");
      playButton.classList.add("fa-pause");
      playButton.classList.remove("fa-play");
      playing = false;
    } else {
      song.pause();
      playerImage.classList.remove("is-playing");
      playButton.classList.remove("fa-pause");
      playButton.classList.remove("fa-pause");
      playButton.classList.add("fa-play");
      playerImage.style.animation = `rotateReverse 0.3s forwards ease-out`;
      playing = true;
    }
  }

  nextButton.addEventListener("click", function () {
    handleChangeMusic(1);
  });
  prevButton.addEventListener("click", function () {
    handleChangeMusic(-1);
  });

  //song.duration -> fulltime of song
  function handleChangeMusic(dir) {
    if (dir === 1) {
      songIndex++;
      if (songIndex >= list.length) {
        songIndex = 0;
      }

      handleSongandImage(songIndex);
    } else if (dir === -1) {
      songIndex--;
      if (songIndex < 0) {
        songIndex = list.length - 1;
      }

      handleSongandImage(songIndex);
    }
    playing = true;
    handleMusicPlay();
  }
  //nhạc kết thúc thì nhạc tip
  song.addEventListener("ended", function () {
    handleChangeMusic(1);
  });

  function displayTimer() {
    let { duration, currentTime } = song;
    progressBar.max = duration;
    progressBar.value = currentTime;
    barTime.style = ` width: ${(progressBar.value / progressBar.max) * 100}%`;

    let gap = parseInt(duration - currentTime);
    if (!duration) {
      playerDuration.textContent = "00:00";
    } else {
      playerDuration.textContent = format(gap);
    }

    remaining.textContent = format(currentTime);
  }
  setInterval(displayTimer, 500);

  function format(time) {
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time - minutes * 60);
    return `${("0" + minutes.toString()).slice(
      -2
    )}:${("0" + seconds.toString()).slice(-2)}`;
  }

  progressBar.addEventListener("change", handleDragProgressBar);
  function handleDragProgressBar() {
    song.currentTime = progressBar.value;
    barTime.style = ` width: ${(progressBar.value / progressBar.max) * 100}%`;
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === " ") {
      playButton.classList.toggle("fa-pause");
      playButton.classList.toggle("fa-play");
      handleMusicPlay();
    }
    if (e.key === "ArrowRight") {
      song.currentTime += 10;
      playing = true;
      handleMusicPlay();
    }
    if (e.key === "ArrowLeft") {
      song.currentTime -= 10;
      playing = true;
      handleMusicPlay();
    }
  });

  progressBar.addEventListener("mousedown", handleMouseMove);

  function handleMouseMove() {
    progressBar.addEventListener("mousemove", handleMoveValue);
    playing = false;
    handleMusicPlay();
  }

  function handleMoveValue(e) {
    progressBar.value = (e.offsetX / progressBar.offsetWidth) * song.duration;
    song.currentTime = progressBar.value;
    barTime.style = ` width: ${(progressBar.value / progressBar.max) * 100}%`;
  }
  progressBar.addEventListener("mouseup", function (e) {
    progressBar.removeEventListener("mousemove", handleMoveValue);
    playing = true;
    handleMusicPlay();
  });

  songItems.forEach((item) =>
    item.addEventListener("click", function (e) {
      songIndex = songItems.indexOf(this);
      handleSongandImage(songIndex);
      playing = true;
      handleMusicPlay();
    })
  );

  let value;
  playerRandom.addEventListener("click", function (e) {
    songIndex = Math.floor(Math.random() * listTitle.length);
    if(value !== songIndex){
      handleSongandImage(songIndex);
    }
    value = songIndex;
    playing = true;
    handleMusicPlay();
  });

  function handleSongandImage(index) {
    const link = singerImgs[index].getAttribute("src");
    playerImage.setAttribute("src", link);
    song.setAttribute("src", `./assets/music/${list[index]}`);
    songTitle.textContent = listTitle[index];
  }
});
