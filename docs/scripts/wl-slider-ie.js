/**
 * 
 * @param {*} userOptions 
 */
function WLSlider(userOptions) {
    var urlStyle = './styles/wl-slider.css';
    
    this.slider = document.getElementsByClassName('wl-slider')[0];
    this.options = this.setOptions(userOptions);
    
    this.addStyle(urlStyle);
    this.slider.classList.add('flex');
    
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
}

/**
 * 
 */
WLSlider.prototype.init = function() {
    try{
        var contentArea = this.getContentArea('wl-slider_content flex');
        var leftControlButton = this.getControlButton('wl-slider_control previous', this.options['controlButtons']['previous']);
        var rightControlButton = this.getControlButton('wl-slider_control next', this.options['controlButtons']['next']);
    
        this.slider.insertAdjacentElement('beforeend', leftControlButton);
        this.slider.insertAdjacentElement('beforeend', contentArea);
        this.slider.insertAdjacentElement('beforeend', rightControlButton);
    
        for(var i = 0; i < this.options['content'].length; i++) {
            if (i == 0)
                contentArea.insertAdjacentElement('beforeend', this.getSlide('#', 'wl-slider_slide visible', i, this.options['content'][i]));
            else
                contentArea.insertAdjacentElement('beforeend', this.getSlide('#', 'wl-slider_slide invisible', i, this.options['content'][i]));
        }
    
        leftControlButton.addEventListener('click', this.previousAction.bind(this));
        rightControlButton.addEventListener('click', this.nextAction.bind(this));
        
        this.interval = setTimeout(this.nextAction.bind(this), this.options['speed']);
    } catch(error){
        console.log('WLSlider error: ' + error);
    }
}

/**
 * 
 */
WLSlider.prototype.previousAction = function() {
    var slides = document.getElementsByClassName('wl-slider_slide');
    var currSlide = document.getElementsByClassName('wl-slider_slide visible')[0];
    var position = parseInt(currSlide.getAttribute('position')) - 1;

    if(position < 0) position = slides.length - 1;
    currSlide.classList.remove('visible');
    currSlide.classList.add('invisible');
    slides[position].classList.remove('invisible');
    slides[position].classList.add('visible');

    clearTimeout(this.interval);
    this.interval = setTimeout(this.nextAction.bind(this), this.options['speed']);
}

/**
 * 
 */
WLSlider.prototype.nextAction = function() {
    var slides = document.getElementsByClassName('wl-slider_slide');
    var currSlide = document.getElementsByClassName('wl-slider_slide visible')[0];
    var position = parseInt(currSlide.getAttribute('position')) + 1;

    if(position >= slides.length) position = 0;
    currSlide.classList.remove('visible');
    currSlide.classList.add('invisible');
    slides[position].classList.remove('invisible');
    slides[position].classList.add('visible');

    clearTimeout(this.interval);
    this.interval = setTimeout(this.nextAction.bind(this), this.options['speed']);
}

/**
 * 
 * @param {*} href 
 * @param {*} className 
 * @param {*} position 
 * @param {*} imgUrl 
 * @returns 
 */
WLSlider.prototype.getSlide = function(href, className, position, imgUrl) {
    var element = document.createElement('a');
    element.setAttribute('href', href);
    element.setAttribute('class', className);
    element.setAttribute('style', 'background: url("'+imgUrl+'");');
    element.setAttribute('position', position);
    return element;
}

/**
 * 
 * @param {*} className 
 * @param {*} imgUrl 
 * @returns 
 */
WLSlider.prototype.getControlButton = function(className, imgUrl) {
    var element = document.createElement('div');
    element.setAttribute('class', className);

    var img = document.createElement('img');
    img.setAttribute('src', imgUrl);

    element.insertAdjacentElement('beforeend', img);
    return element;
}

/**
 * 
 * @param {*} className 
 * @returns 
 */
WLSlider.prototype.getContentArea = function(className) {
    var element = document.createElement('div');
    element.setAttribute('class', className);
    return element;
}

/**
 * 
 * @param {*} url 
 */
WLSlider.prototype.addStyle = function(url) {
    var linkSetted = false;
    
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.indexOf(url.slice(2)) != -1) linkSetted = true;
    };

    if (linkSetted == false) {
        var style = document.createElement('link'); 
        style.rel = 'stylesheet'; 
        style.type = 'text/css'; 
        style.href = url; 
        document.head.appendChild(style); 
    };
}

/**
 * 
 * @param {*} userOptions 
 * @returns 
 */
WLSlider.prototype.setOptions = function(userOptions) {
    var map = {};

    /** Перечисление опцию поумолчанию; */
    map = {
        'content': [
            './images/demo-content-1.jpg',
            './images/demo-content-2.jpg',
            './images/demo-content-3.jpg', 
        ],
        'speed': 7000,
        'controlButtons': {
            'previous': './images/previous.png',
            'next': './images/next.png'
        }
        /* 'optName': optValue */
    }


    /** Установка пользователских опций; */
    if (userOptions) {
        for (key in userOptions) {
            if (key in map) map[key] = userOptions[key];
        }
    }
    
    return map;
}
