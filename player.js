// 1 render songs
// 2 scroll top 
// 3 play/pause/ seek 
// 4 CD rotate 
// 5 next/ prev
// 6 random
// 7 next/repeat wwhen ended 
// 8 active song 
// 9 scroll active song into view 
// 10 play song when click 

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('#now-playing h2')
const audio = $('#audio')
const cdThumb = $('#song-img img')
const playBtn = $('.play-pause')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const backBtn = $('.btn-back')
const randomBtn = $('.btn-random')
const replayBtn = $('.btn-replay')
const active = $('.active')
const playList = $('#songs-list')
const heart = $('.heart')
const btnSongList = $('.song-list')


const app = {
    crIndex: 0,
    songs: [
        {   
            name: 'Ta Đã Từng Yêu Nhau Chưa ?',
            singer: 'Hào',
            path: 'AUDIO/audio_13.mp3',
            image: 'IMG/image_13.jpg'
        },
        {
            name: 'Tại Vì Sao',
            singer: 'MCK',
            path: 'AUDIO/audio_2.mp3',
            image: 'IMG/image_2.jpg'
        },
        {
            name: 'Con Chim Trên Cành',
            singer: 'Tùng',
            path: 'AUDIO/audio_3.mp3',
            image: 'IMG/image_3.jpg'
        },
        {
            name: 'Xin Lỗi',
            singer: 'RPT Orijinn x Ronboogz',
            path: 'AUDIO/audio_4.mp3',
            image: 'IMG/image_4.jpg'
        }, {
            name: 'Cold Dont',
            singer: 'RPT Orijinn x Ronboogz',
            path: 'AUDIO/audio_5.mp3',
            image: 'IMG/image_5.jpg'
        },{
            name: 'Dont Côi',
            singer: 'RPT Orijinn x Ronboogz',
            path: 'AUDIO/audio_6.mp3',
            image: 'IMG/image_6.jpg'
        },{
            name: 'Lan Man',
            singer: 'RPT Orijinn x Ronboogz',
            path: 'AUDIO/audio_7.mp3',
            image: 'IMG/image_7.jpg'
        },{
            name: 'Warking My Way',
            singer: 'Song Tung MTP',
            path: 'AUDIO/audio_8.mp3',
            image: 'IMG/image_8.jpg'
        },{
            name: 'Vì Anh Đâu ...',
            singer: 'Vũ',
            path: 'AUDIO/audio_9.mp3',
            image: 'IMG/image_9.jpg'
        },
        {
            name: 'Không Yêu Xin ...',
            singer: 'Umie',
            path: 'AUDIO/audio_10.mp3',
            image: 'IMG/image_10.jpg'
        },{
            name: 'Reeves',
            singer: 'HieuThuHai',
            path: 'AUDIO/audio_11.mp3',
            image: 'IMG/image_11.jpg'
        },{
            name: 'Có Em',
            singer: 'Madihu',
            path: 'AUDIO/audio_12.mp3',
            image: 'IMG/image_12.jpg'
        },{
            name: 'Anh đã ổn hơn',
            singer: 'MCK',
            path: 'AUDIO/audio_1.mp3',
            image: 'IMG/image_1.jpg'
        }
        
    ],
    render: function () {
        htmls = this.songs.map((song, index) => {
            return `<li class = "${index === this.crIndex ? 'active' : ''} " data-index = "${index}">
            <img src="${song.image}" alt="">
            <div class="song-detail">
                <h3>${song.name}</h3>
                <p>${song.singer}</p>
            </div>
            <i class="fa-solid fa-ellipsis option"></i>    
        </li>`
        })
        playList.innerHTML = htmls.join(` `)

    },
    defineProperties: function () {
        Object.defineProperty(this, 'currenSong', {
            get: function () {
                return this.songs[this.crIndex]
            }
        })
    },
    handleEvent: function () {
        const withImg = cdThumb.offsetWidth
        //click trái tim
        heart.onclick = () => {
            if (heart.classList.contains("fa-regular")) {
                heart.classList.add("fa-solid")
                heart.classList.remove("fa-regular")
                heart.style.color = "red"
            } else {
                heart.classList.add("fa-regular")
                heart.classList.remove("fa-solid")
                heart.style.color = "#ffff"            
            }

        }

        // click để hiện lên list nhạc
        // btnSongList.onclick = () => {
        //     if(playList.classList.contains('show') == false){
        //         btnSongList.style.color = 'black'
        //         playList.classList.add('show')
        //         playList.scrollIntoView
        //     }else{
        //         btnSongList.style.color = '#ffff'

        //         playList.classList.remove('show')
        //     }
            
        // }
        //xử lý CD quay / dừng
        cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // thu phóng IMG SONG
        // document.onscroll = function () {
        //     const scrollTop = window.scrollY || document.documentElement.scrollTop
        //     const newWithImg = withImg - scrollTop
        //     cdThumb.style.width = newWithImg > 0 ? newWithImg + 'px' : 0
        //     cdThumb.style.opacity = newWithImg / withImg
        // }
        // click play
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
        playBtn.onclick = function () {
            if (this.innerHTML == '<i class="fa-solid fa-play"></i>') {
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
                audio.play()
                cdThumbAnimate.play()
            } else {
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
                audio.pause()
                progress.value = 0;
                cdThumbAnimate.pause()
            }

        }
        // thanh kéo bài hát
        audio.ontimeupdate = function () {
            if (audio.duration) {
                let progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                // auto qua bài
                if (progressPercent == 100 && replayBtn.style.color != 'orangered') {
                    app.nextSong()
                    audio.play()
                }
                // phát lại bài
                if (progressPercent == 100 && replayBtn.style.color == 'orangered') {
                    progressPercent = 0
                    audio.play()
                }
            }

        }
        // tua
        progress.onchange = function (e) {
            const seekTime = e.target.value / 100 * audio.duration
            audio.currentTime = seekTime
        }
        // next bài
        nextBtn.onclick = function () {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'

            if (randomBtn.style.color == 'orangered') {
                app.randomNextSong();
            } else {
                app.nextSong()
            }
            console.log(playBtn.innerHTML)


        }
        // back bài
        backBtn.onclick = function () {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
            app.backSong()
        }
        // replay bài
        replayBtn.onclick = function () {
            if (this.style.color != 'orangered') {
                this.style.color = 'orangered'
                console.log(this.style.color)
            } else {
                this.style.color = null
            }

        }
        randomBtn.onclick = function () {
            if (this.style.color != 'orangered') {
                this.style.color = 'orangered'
            } else {
                this.style.color = null
            }

        }
        // click để chuyển bài
        playList.onclick = (e) => {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
            const songNode = e.target.closest('#songs-list li:not(.active)')
            // xử lý khi click vào song
            if (songNode || e.target.closest('.option')) {
                app.crIndex = Number(songNode.dataset.index)
                console.log(app.crIndex)
                app.loadCurrenSong()
                app.render()
                app.scrollToActive()

                audio.play()
            }
        }

    },
    loadCurrenSong: function () {
        heading.textContent = this.currenSong.name
        cdThumb.src = this.currenSong.image
        audio.src = this.currenSong.path
    },
    randomNextSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.crIndex)
        this.crIndex = newIndex
        this.loadCurrenSong()
        this.render()
        this.scrollToActive()
        audio.play()
    },
    nextSong: function () {
        this.crIndex++
        if (this.crIndex >= this.songs.length) {
            this.crIndex = 0
        }
        console.log(this.crIndex)
        this.loadCurrenSong()
        this.render()
        this.scrollToActive()
        audio.play()
        // scroll to the song playing
        //  if (this.crIndex != 0) {
        //     window.scrollTo({
        //         top:  (this.crIndex) * 92 + 200
        //     })
        // }
    },
    backSong: function () {
        this.crIndex--
        if (this.crIndex < 0) {
            this.crIndex = this.songs.length - 1
        }
        this.loadCurrenSong()
        this.render()
        this.scrollToActive()
        audio.play()


        // scroll to the song playing
        // if (this.crIndex == 0) {
        //     window.scrollTo({
        //         top: 0
        //     })
        //     console.log(active.offsetTop0)
        // } else {
        //     window.scrollTo({
        //         top:  (this.crIndex) * 92 + 200
        //     })
        // }

    },
    replaySong: function () {
        this.crIndex
        if (this.crIndex < 0) {
            this.crIndex = this.songs.length
        }
        this.loadCurrenSong()
    },
    scrollToActive: function () {
        // if (this.crIndex == 0) {
        //     $('container-list').scrollTo({
        //         top: 0
        //     })
        // } else {
        //     $('container-list').scrollTo({
        //         top: (this.crIndex) * 92 + 210
        //     })
        // }
        setTimeout(() => { $('.active').scrollIntoView({ behavior: 'smooth', block: 'start', }) }, 100)


    },
    start: function () {
        // this.autoNextSong()
        //định nghĩa các thuộc tính trong object
        this.defineProperties()
        this.loadCurrenSong()
        //render play-list
        this.render()
        //lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvent()



    }
}
app.start()
