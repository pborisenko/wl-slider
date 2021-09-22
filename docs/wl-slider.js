/**
 * 
 * @param {*} userOptions 
 */
function WLSlider(userOptions) {
    const urlStyle = './wl-slider.css';
    
    this.slider = document.getElementsByClassName('wl-slider')[0];
    this.options = this.setOptions(userOptions);
    
    this.addStyle(urlStyle);
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
}

/**
 * 
 */
WLSlider.prototype.init = function() {
    let contentArea = this.getContentArea('wl-slider_content flex');
    let leftControlButton = this.getControlButton('wl-slider_control previous', this.options.get('controlButtons')['previous']);
    let rightControlButton = this.getControlButton('wl-slider_control next', this.options.get('controlButtons')['next']);

    this.slider.insertAdjacentElement('beforeend', leftControlButton);
    this.slider.insertAdjacentElement('beforeend', contentArea);
    this.slider.insertAdjacentElement('beforeend', rightControlButton);

    for(let i = 0; i < this.options.get('content').length; i++) {
        if (i == 0)
            contentArea.insertAdjacentElement('beforeend', this.getSlide('#', 'wl-slider_slide visible', i, this.options.get('content')[i]));
        else
            contentArea.insertAdjacentElement('beforeend', this.getSlide('#', 'wl-slider_slide invisible', i, this.options.get('content')[i]));
    }

    leftControlButton.addEventListener('click', this.previousAction);
    rightControlButton.addEventListener('click', this.nextAction);

    setInterval(this.nextAction, this.options.get('speed'));
}

/**
 * 
 */
WLSlider.prototype.previousAction = function() {
    let slides = document.getElementsByClassName('wl-slider_slide');
    let currSlide = document.getElementsByClassName('wl-slider_slide visible')[0];
    let position = parseInt(currSlide.getAttribute('position')) - 1;

    if(position < 0) position = slides.length - 1;
    currSlide.classList.remove('visible');
    currSlide.classList.add('invisible');
    slides[position].classList.remove('invisible');
    slides[position].classList.add('visible');
}

/**
 * 
 */
WLSlider.prototype.nextAction = function() {
    let slides = document.getElementsByClassName('wl-slider_slide');
    let currSlide = document.getElementsByClassName('wl-slider_slide visible')[0];
    let position = parseInt(currSlide.getAttribute('position')) + 1;

    if(position >= slides.length) position = 0;
    currSlide.classList.remove('visible');
    currSlide.classList.add('invisible');
    slides[position].classList.remove('invisible');
    slides[position].classList.add('visible');
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
    let element = document.createElement('a');
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
    let element = document.createElement('div');
    element.setAttribute('class', className);

    let img = document.createElement('img');
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
    let element = document.createElement('div');
    element.setAttribute('class', className);
    return element;
}

/**
 * 
 * @param {*} url 
 */
WLSlider.prototype.addStyle = function(url) {
    let linkSetted = false;
    
    let links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.indexOf(url.slice(2)) != -1) linkSetted = true;
    };

    if (linkSetted == false) {
        let style = document.createElement('link'); 
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
    let map = new Map();

    /** Перечисление опцию поумолчанию; */
    map.set('content', [
        'https://chistopiter.com/wp-content/uploads/2020/10/interesnye-fakty-o-koshkah-i-kotah-40.jpg',
        'https://chistopiter.com/wp-content/uploads/2020/10/355890-admin.jpg',
        'https://chistopiter.com/wp-content/uploads/2020/10/e34f2c5689589f6f4c53.jpg'
    ]);
    map.set('speed', 7000);
    map.set('controlButtons', {
        'previous': 'https://chistopiter.com/wp-content/uploads/2020/10/left-arrow.png',
        'next': 'https://chistopiter.com/wp-content/uploads/2020/10/next.png'
    })
    /** map.set('optionName': optionValue); */

    /** Установка пользователских опций; */
    if (userOptions) {
        for (key in userOptions) {
            if (map.has(key)){
                map.set(key, userOptions[key]);
            }
        }
    }
    
    return map;
}
