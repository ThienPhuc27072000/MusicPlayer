const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Mucsic-Player';

const player = $('.player');
const playlist = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const volumeProgress = $('#volume-progress');
const valueVolumeProgress = $('.volume-value');
const slashVolumeBtn = $('.btn-volume-slash');
const downVolumeBtn = $('.btn-volume-down');
const volumeBtn = $('.btn-volume');
const upVolumeBtn = $('.btn-volume-up');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMuted: false,
    currentVolume: 1,
    volumeBeforeMuted: 0,
    listRandomSongs: [],
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: '6h Chill',
            singer: 'Bạn Có Tài Mà',
            path: './assets/music/song1.mp3',
            image: './assets/image/picture1.png'
        },
        {
            name: 'Chưa Bao Giờ',
            singer: 'DSK',
            path: './assets/music/song2.mp3',
            image: './assets/image/picture2.png'
        },
        {
            name: 'Trốn Tìm',
            singer: 'Đen Vâu ft. MTV band',
            path: './assets/music/song3.mp3',
            image: './assets/image/picture3.png'
        },
        {
            name: 'Điếu Thuốc Cuối',
            singer: 'DSK',
            path: './assets/music/song4.mp3',
            image: './assets/image/picture4.png'
        },
        {
            name: 'Em À',
            singer: 'Xám - Ngọc Doli',
            path: './assets/music/song5.mp3',
            image: './assets/image/picture5.png'
        },
        {
            name: 'Vài Người Bạn',
            singer: 'Bạn Có Tài Mà',
            path: './assets/music/song6.mp3',
            image: './assets/image/picture6.png'
        },
        {
            name: 'Giọt Sương Trên Mí Mắt',
            singer: 'Đen Vâu',
            path: './assets/music/song7.mp3',
            image: './assets/image/picture7.png'
        },
        {
            name: 'Con Trai Cưng - Piano Version',
            singer: 'Bray',
            path: './assets/music/song8.mp3',
            image: './assets/image/picture8.png'
        },
        {
            name: 'Anh Đã Lớn Hơn Thế Nhiều',
            singer: 'Dick ft. Michelle Ngn',
            path: './assets/music/song9.mp3',
            image: './assets/image/picture9.png'
        },
        {
            name: 'Tình Nhân Ơi',
            singer: 'Karik - Superbrothers - Orange',
            path: './assets/music/song10.mp3',
            image: './assets/image/picture10.png'
        },
        {
            name: 'Tình Yêu Là Thế',
            singer: 'Dick - 2Can - Ngắn',
            path: './assets/music/song11.mp3',
            image: './assets/image/picture11.png'
        },
        {
            name: 'Anh Đếch Cần Gì Nhiều Ngoài Em',
            singer: 'Đen ft Vũ - Thành Đồng',
            path: './assets/music/song12.mp3',
            image: './assets/image/picture12.png'
        },
        {
            name: 'Mười Năm',
            singer: 'Đen ft Ngọc Linh',
            path: './assets/music/song13.mp3',
            image: './assets/image/picture13.png'
        },
        {
            name: 'Lộn Xộn 2',
            singer: 'Đen Vâu',
            path: './assets/music/song14.mp3',
            image: './assets/image/picture14.png'
        },
        {
            name: 'Rapcoustic 2',
            singer: 'Đen - Kimmese - LynkLee',
            path: './assets/music/song15.mp3',
            image: './assets/image/picture15.png'
        },
        {
            name: 'Rapcoustic 3',
            singer: 'Đen - Kimmese - LynkLee',
            path: './assets/music/song16.mp3',
            image: './assets/image/picture16.png'
        },
        {
            name: 'Rapcoustic 4',
            singer: 'Đen - Kimmese - LynkLee',
            path: './assets/music/song17.mp3',
            image: './assets/image/picture17.png'
        },
        {
            name: 'Phán Xét',
            singer: 'Rhymastic',
            path: './assets/music/song18.mp3',
            image: './assets/image/picture18.png'
        },
        {
            name: 'Nếu Như Là Định Mệnh',
            singer: 'Hoài Lâm ft Binz',
            path: './assets/music/song19.mp3',
            image: './assets/image/picture19.png'
        },
        {
            name: 'Đi Qua Thương Nhớ',
            singer: 'Tây Nguyên Sound',
            path: './assets/music/song20.mp3',
            image: './assets/image/picture20.png'
        }
    ],
    
    // Hàm cấu hình trên ứng dụng
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div data-index="${index}" class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });
        playlist.innerHTML = htmls.join('');
    },
    
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    
    handleEvents: function() {
        const _this = this;
        
        // Xử lý CD quay tròn / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });
        cdThumbAnimate.pause();
        
        // Xử lý phóng to / thu nhỏ CDThumb
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop; // documentElement là element của thẻ <html></html>
            const newCdWidth = cdWidth - scrollTop;
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };
        
        // Xử lý khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        
        // Bắt sự kiện khi bài hát được play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };
        
        // Bắt sự kiện khi bài hát bị pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };
        
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) { // Kiểm tra lần chạy đầu tiên không phải là NaN
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent; // Gán lại giá trị cho attribute của element progress
            }
        };
        
        // Xử lý khi tua bài hát
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value; // e.target.value: % trên thanh progress tại vị trí bấm tua
            audio.currentTime = seekTime;
        };
        
        // Khi next bài hát
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.scrollToActiveSong();
        };
        
        // Khi prev bài hát
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.scrollToActiveSong();
        };
        
        // Xử lý khi bật / tắt random bài hát
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        };
        
        // Xử lý khi bật / tắt repeat bài hát
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        };
        
        // Xử lý next hoặc repeat bài hát khi kết thúc
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play(); // Tự động play lại khi hết bài
            } else {
                nextBtn.click(); // click phương thức tự động click vào một element
            }
        };
        
        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            const optionNode = e.target.closest('.option');
            
            if (songNode || optionNode) {
                // Xử lý khi nhấn vào song option
                if (optionNode) {
                    alert('Chức năng đang được update. Vui lòng thử lại sau !!!');
                } else { 
                    // Xử lý khi click vào một bài hát trên playlist
                    _this.currentIndex = Number(songNode.dataset.index); // Ép chuỗi về số
                    _this.loadCurrentSong();
                    audio.play();
                }
            }
        };
        
        // Xử lý khi thay đổi âm lượng
        volumeProgress.oninput = function(e) {
            audio.muted = false;
            audio.volume = e.target.value / 100;
            _this.currentVolume = audio.volume;
            valueVolumeProgress.textContent = Math.round(e.target.value);
            _this.changeStyleVolume();
            _this.setConfig('currentVolume', _this.currentVolume);
        };
        
        // Xử lý khi tắt / mở tiếng
        upVolumeBtn.onclick = function() {
            _this.muteOrUnmuteVolume();
        };
        
        downVolumeBtn.onclick = function() {
            _this.muteOrUnmuteVolume();
        };
        
        volumeBtn.onclick = function() {
            _this.muteOrUnmuteVolume();
        };
        
        slashVolumeBtn.onclick = function() {
            _this.muteOrUnmuteVolume();
        };
    },
    
    scrollToActiveSong: function() {
        setTimeout(() => { 
            if (this.currentIndex <= 3) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            } else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 300);
    },
    
    // Xử lý khi active song không load list song
    noLoadListSong: function() {
        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
            if (song.dataset.index == this.currentIndex) {
                song.classList.add('active');
            }
        });
    },
    
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        
        this.noLoadListSong();
        
        this.setConfig('currentIndex', this.currentIndex);
    },
    
    loadConfig: function() {
        this.isRandom = this.config.isRandom || this.isRandom;
        this.isRepeat = this.config.isRepeat || this.isRepeat;
        this.isMuted = this.config.isMuted || this.isMuted;
        this.currentIndex = this.config.currentIndex || this.currentIndex;
        this.currentVolume = this.config.currentVolume >= 0 ? this.config.currentVolume : this.currentVolume;
        this.volumeBeforeMuted = this.config.volumeBeforeMuted >= 0 ? this.config.volumeBeforeMuted : this.volumeBeforeMuted;
    },
    
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    
    playRandomSong: function() {
        let songsIndex = [];
        if(this.listRandomSongs.length === 0) {
            for(let i = this.songs.length -1; i >= 0; i--) {
                songsIndex.push(i);
            }
            this.listRandomSongs = songsIndex.sort(() => { return 0.5 - Math.random()}); // 0.5 - Math.random() dùng để sắp xếp các số trong mảng một cách ngẫu nhiên
        }
        // console.log(this.listRandomSongs);
        
        if(this.listRandomSongs.length > 0) {
            this.currentIndex = this.listRandomSongs.shift();
        }
        
        this.loadCurrentSong();
    },
    
    changeStyleVolume: function() {
        if (this.currentVolume === 0) {
            slashVolumeBtn.style.display = 'flex'
            downVolumeBtn.style.display = 'none'
            volumeBtn.style.display = 'none'
            upVolumeBtn.style.display = 'none'
        } else if (this.currentVolume > 0 && this.currentVolume <= 0.4) {
            slashVolumeBtn.style.display = 'none'
            downVolumeBtn.style.display = 'flex'
            volumeBtn.style.display = 'none'
            upVolumeBtn.style.display = 'none'
        } else if (this.currentVolume > 0.4 && this.currentVolume <= 0.7) {
            slashVolumeBtn.style.display = 'none'
            downVolumeBtn.style.display = 'none'
            volumeBtn.style.display = 'flex'
            upVolumeBtn.style.display = 'none'
        } else {
            slashVolumeBtn.style.display = 'none'
            downVolumeBtn.style.display = 'none'
            volumeBtn.style.display = 'none'
            upVolumeBtn.style.display = 'flex'
        }
    },
    
    muteOrUnmuteVolume: function() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.volumeBeforeMuted = this.currentVolume;
            audio.muted = true;
            volumeProgress.value = 0;
            audio.volume = 0;
            this.currentVolume = 0;
        } else {
            audio.muted = false;
            this.currentVolume = this.volumeBeforeMuted;
            volumeProgress.value = this.currentVolume * 100;
            audio.volume = this.currentVolume;
        }
        valueVolumeProgress.textContent = Math.round(this.currentVolume * 100);
        this.setConfig('volumeBeforeMuted', this.volumeBeforeMuted);
        this.setConfig('isMuted', this.isMuted);
        this.setConfig('currentVolume', this.currentVolume);
        this.changeStyleVolume();
    },
    
    start: function() {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();
        
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties();
        
        // Lắng nghe / xử lý các sự kiện (DOM Event)
        this.handleEvents();
        
        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        
        // Render Playlist
        this.render();
        
        // Hiển thị trạng thái ban đầu của button repeat và random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
        volumeProgress.value = (this.currentVolume * 100);
        audio.volume = this.currentVolume;
        valueVolumeProgress.textContent =  Math.round(volumeProgress.value);
        
        this.changeStyleVolume();
    }
}

app.start();

/**
 * 1. Bấm bôi đen element trên mobile, lỗi CSS
 * 2. Active trên prev/next/random/repeat button  --> OK
 * 3. Xử lý random tránh lặp lại nhiều lần một bài hát  --> OK
 * 4. Xử lý không bị load lại list song khi active song  --> OK
 * 5. Fix lỗi khi next/prev tới bài 1,2,3 không scroll to view  --> OK
 * 6. Tiến trình progress chạy background khi bài hát chạy  --> OK
 * 7. Lưu lại vị trí bài hát đang nghe, F5 vẫn ở đó ko về bài đầu  --> OK
 * 8. Thêm thanh âm lượng --> OK
 * 9. Lưu mức âm thanh người dùng chọn. Mặc định là 100%  --> OK
 */

// nextBtn.onmousedown = function() {
//     nextBtn.classList.add('active');
// };
// nextBtn.onmouseup = function() {
//     nextBtn.classList.remove('active');
// };