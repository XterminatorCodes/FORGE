document.addEventListener("DOMContentLoaded", function () {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.8)";
    overlay.style.transition = "background 0.5s ease";
    document.body.appendChild(overlay);

    function updateOverlayTransparency() {
        const scrollPosition = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const transparency = 0.8 - (scrollPosition / maxScroll) * 0.8;
        overlay.style.background = `rgba(0, 0, 0, ${transparency})`;
    }

    window.addEventListener("scroll", updateOverlayTransparency);
    updateOverlayTransparency();

    function getRandomWithinRange(base, range) {
        return base + Math.random() * range - range / 2;
    }

    function autoScroll() {
        var totalScrollDistance = 1600;
        var scrollDuration = 2000;
        var numSteps = 200;
        var pixelsPerStep = totalScrollDistance / numSteps;
        var stepInterval = scrollDuration / numSteps;

        function step(currentStep) {
            if (currentStep < numSteps) {
                window.scrollBy(0, pixelsPerStep);
                currentStep++;
                requestAnimationFrame(function() {
                    step(currentStep);
                });
            }
        }

        step(0);
    }

    window.onload = function() {
        autoScroll();
    };

    function getRandomSize() {
        return Math.floor(Math.random() * 100) + 150;
    }

    function getRandomLargeCirclePosition(size, existingCircles) {
        const maxX = window.innerWidth - size;
        const maxY = window.innerWidth - size + 400;
        const minY = window.innerWidth - size;
        let attempt = 0;
        let posX, posY;

        do {
            posX = Math.floor(Math.random() * maxX);
            posY = Math.floor(Math.random() * (maxY - minY)) + minY;
            attempt++;
        } while (circleCollidesWithExisting(posX, posY, size, existingCircles) && attempt < 1000);

        return { x: posX, y: posY };
    }

    function getRandomSmallCirclePosition(size, existingCircles) {
        const maxX = window.innerWidth - size;
        const maxY = window.innerWidth - size + 4400;
        const minY = window.innerWidth - size + 4000;
        let attempt = 0;
        let posX, posY;

        do {
            posX = Math.floor(Math.random() * maxX);
            posY = Math.floor(Math.random() * (maxY - minY)) + minY;
            attempt++;
        } while (circleCollidesWithExisting(posX, posY, size, existingCircles) && attempt < 1000);

        return { x: posX, y: posY };
    }

    function circleCollidesWithExisting(posX, posY, size, existingCircles) {
        for (const circle of existingCircles) {
            const distance = Math.sqrt(
                Math.pow(posX - circle.x, 2) + Math.pow(posY - circle.y, 2)
            );
            const minDistance = size + circle.size + 20;

            if (distance < minDistance) {
                return true;
            }
        }
        return false;
    }

    function parallaxScrollingEffect(circle, speedMultiplier) {
        window.addEventListener("scroll", function () {
            const scrollSpeed = window.scrollY * speedMultiplier;
            const translateY = `translateY(-${scrollSpeed}px)`;
            circle.style.transform = translateY;
        });
    }

    for (let i = 1; i <= 8; i++) {
        const smallCircle = document.getElementById(`smallCircle${i}`);
        parallaxScrollingEffect(smallCircle, 4);
    }

    for (let i = 1; i <= 4; i++) {
        const circle = document.getElementById(`circle${i}`);
        parallaxScrollingEffect(circle, 0.1);
    }

    function addContinuousHoverEffect(circle, speed, range) {
        const initialX = parseFloat(circle.style.left);
        const initialY = parseFloat(circle.style.top);
        const initialSize = parseFloat(circle.style.width);
        const initialBrightness = getRandomWithinRange(1, 0.2);

        let lastTimestamp = 0;

        function animate(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;

            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            const offsetX = Math.sin(timestamp * speed) * range;
            const offsetY = Math.cos(timestamp * speed) * range;
            const newSize = initialSize + Math.sin(timestamp * speed) * 10;
            const newBrightness = getRandomWithinRange(initialBrightness, 0.04);

            const period = 2000;
            const colorChange = (timestamp % period) / period;

            circle.style.transition = "none";
            circle.style.left = `${initialX + offsetX}px`;
            circle.style.top = `${initialY + offsetY}px`;
            circle.style.width = `${newSize}px`;
            circle.style.height = `${newSize}px`;
            circle.style.filter = `brightness(${colorChange * newBrightness + (1 - colorChange)})`;

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    const largerCircles = [];
    for (let i = 1; i <= 4; i++) {
        const size = getRandomSize();
        const position = getRandomLargeCirclePosition(size, largerCircles);

        const circle = document.getElementById(`circle${i}`);
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${position.x}px`;
        circle.style.top = `${position.y}px`;

        largerCircles.push({ x: position.x, y: position.y, size: size });

        const speed = getRandomWithinRange(0.004, 0.002);
        const hoverRange = getRandomWithinRange(3, 3);
        addContinuousHoverEffect(circle, speed, hoverRange);
    }

    function getRandomSmallSize() {
        return Math.floor(Math.random() * 50) + 50;
    }

    function addSmallContinuousHoverEffect(smallCircle, speed, range) {
        const initialX = parseFloat(smallCircle.style.left);
        const initialY = parseFloat(smallCircle.style.top);
        const initialSize = parseFloat(smallCircle.style.width);
        const initialBrightness = getRandomWithinRange(1, 0.2);

        let lastTimestamp = 0;

        function animate(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;

            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            const offsetX = Math.sin(timestamp * speed) * range;
            const offsetY = Math.cos(timestamp * speed) * range;
            const newSize = initialSize + Math.sin(timestamp * speed) * 10;
            const newBrightness = getRandomWithinRange(initialBrightness, 0.04);

            const period = 2000;
            const sizeChange = (timestamp % period) / period;

            smallCircle.style.transition = "none";
            smallCircle.style.left = `${initialX + offsetX}px`;
            smallCircle.style.top = `${initialY + offsetY}px`;
            smallCircle.style.width = `${newSize}px`;
            smallCircle.style.height = `${newSize}px`;
            smallCircle.style.filter = `brightness(${newBrightness})`;

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    const smallerCircles = [];
    for (let i = 1; i <= 8; i++) {
        const smallSize = getRandomSmallSize();
        const position = getRandomSmallCirclePosition(smallSize, [...largerCircles, ...smallerCircles]);

        const smallCircle = document.getElementById(`smallCircle${i}`);
        smallCircle.style.width = `${smallSize}px`;
        smallCircle.style.height = `${smallSize}px`;
        smallCircle.style.left = `${position.x}px`;
        smallCircle.style.top = `${position.y}px`;
        smallCircle.style.backgroundColor = "darkorange";
        smallCircle.style.position = "absolute";
        smallCircle.style.zIndex = "-1";

        smallerCircles.push({ x: position.x, y: position.y, size: smallSize });

        const speed = getRandomWithinRange(0.004, 0.006);
        const hoverRange = getRandomWithinRange(6, 6);
        addSmallContinuousHoverEffect(smallCircle, speed, hoverRange);
    }

    function updateBackgroundColor() {
        const scrollPosition = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / maxScroll;

        const r = Math.floor(0 + scrollPercentage * (128 - 0));
        const g = Math.floor(0 + scrollPercentage * (128 - 0));
        const b = Math.floor(0 + scrollPercentage * (128 - 0));

        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    window.addEventListener("scroll", updateBackgroundColor);
    updateBackgroundColor();
});

setTimeout(function () {
    const typewriterContainer = document.getElementById("typewriter-container");
    const typewriterTextElement = document.getElementById("typewriter-text");

    typewriterTextElement.textContent = "";

    const initialTypewriterText = "CommunityCraft Makerspace";
    const newTypewriterText = "A TSA Production";

    function typeWriter(text, index, callback) {
        if (index < text.length) {
            typewriterTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(function () {
                typeWriter(text, index, callback);
            }, 50);
        } else {
            setTimeout(function () {
                backspaceEffect(text, index, callback);
            }, 1000);
        }
    }

    function backspaceEffect(text, index, callback) {
        if (index > 0) {
            typewriterTextElement.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(function () {
                backspaceEffect(text, index, callback);
            }, 50);
        } else {
            callback();
        }
    }

    setTimeout(function () {
        typeWriter(initialTypewriterText, 0, function () {
            typeWriter(newTypewriterText, 0, function () {
                console.log("Typewriter effect complete!");
            });
        });
    }, 10);
}, 2000);