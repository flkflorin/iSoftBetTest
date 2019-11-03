window.addEventListener('load', () => {
    const mainDiv = document.getElementById('main');
    mainDiv.onclick = (event) => {
        // console.log(event.clientX);
        // console.log(event.clientY);
        //console.log(window.innerWidth);
        //console.log(window.innerHeight);
        // console.log(topLeftX);
        // console.log(topLeftY);

        if(isSecondDivClicked(event)){
            changeDivs();
        }
    }

    const changeDivs = () => {
        const bigFrame = document.getElementsByClassName('full-screen')[0];
        const smallFrame = document.getElementsByClassName('second-game')[0];
        
        const aux = bigFrame.src;
        bigFrame.src = smallFrame.src;
        smallFrame.src = aux;
    }

    const isSecondDivClicked = (event) => {
        const topLeftX = (100-16) * window.innerWidth / 100.0; // 16% is small screen width
        const topLeftY = (100-9) * window.innerHeight / 100.0; // 9% is small screen height
        return event.clientX >= topLeftX && event.clientY >= topLeftY;
    }
});