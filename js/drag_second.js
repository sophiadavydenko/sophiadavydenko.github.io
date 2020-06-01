const _slider = document.querySelector('.items_2');
let _isDown = false;
let _startX;
let _scrollLeft;

_slider.addEventListener('mousedown', (e) => {
    _isDown = true;
    _slider.classList.add('active');
    _startX = e.pageX - _slider.offsetLeft;
    _scrollLeft = _slider._scrollLeft;
    cancelMomentumTracking();
});


_slider.addEventListener('mouseleave', () => {
    _isDown = false;
    _slider.classList.remove('active');
});


_slider.addEventListener('mouseup', () => {
    _isDown = false;
    _slider.classList.remove('active');
    beginMomentumTracking();
});


_slider.addEventListener('mousemove', (e) => {
    if (!_isDown) return;
    e.preventDefault();
    const x = e.pageX - _slider.offsetLeft;
    const walk = (x - _startX) * 3; //scroll-fast
    var prevScrollLeft = _slider._scrollLeft;
    _slider.scrollLeft = _scrollLeft - walk;
    velX = _slider._scrollLeft - prevScrollLeft;
});

// Momentum

var velX = 0;
var momentumID;

_slider.addEventListener('wheel', (e) => {
    cancelMomentumTracking();
});

function beginMomentumTracking() {
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking() {
    cancelAnimationFrame(momentumID);
}

function momentumLoop() {
    _slider._scrollLeft += velX;
    velX *= 0.95;
    if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
    }
}
