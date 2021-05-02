let canvas = document.getElementById("circle");
let ctx = canvas.getContext('2d');


let loadImage = (src, callback) => {
    let image = document.createElement("img");
    image.onload = () => callback(image);
    image.src = src;
};

let frames = {
    backward: [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6],
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
};

let imagePath = (animation, frameNumber) => {
    return "Photo_file/"+ animation + "/" + frameNumber + ".png";
};

let loadImages = (callback) => {
    let images = {
        backward: [],
        block: [],
        forward: [],
        idle: [],
        kick: [],
        punch: [],
    };
    let imagesToLoad = 0;

    ["backward", "block", "forward", "idle", "kick", "punch"].forEach(
        (animation) => {
            let animationFrames = frames[animation];
            imagesToLoad += animationFrames.length;

            animationFrames.forEach((frameNumber) => {
                let path = imagePath(animation, frameNumber);

                loadImage(path, (image) => {
                    images[animation][frameNumber - 1] = image;
                    imagesToLoad--;
                    imagesToLoad === 0 && callback(images);
                });
            });
        }
    );
};

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 600, 600);
            ctx.drawImage(image, 90, 30, 500, 520);

        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let queuedAnimation = [];

    let aux = () => {
        let selectedAnimation =
            queuedAnimation.length === 0 ? "idle" : queuedAnimation.shift();
        animate(ctx, images, selectedAnimation, aux);
    };

    document.getElementById("backward").onclick = () => {
        queuedAnimation.push("backward");
    };
    document.getElementById("block").onclick = () => {
        queuedAnimation.push("block");
    };
    document.getElementById("forward").onclick = () => {
        queuedAnimation.push("forward");
    };
    document.getElementById("kick").onclick = () => {
        queuedAnimation.push("kick");
    };
    document.getElementById("punch").onclick = () => {
        queuedAnimation.push("punch");
    };
    aux();

    document.addEventListener("keyup", (event) => {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (event.key) {
            case "ArrowLeft":
                queuedAnimation.push("backward");
                break;
            case "ArrowRight":
                queuedAnimation.push("forward");
                break;
            case "ArrowUp":
                queuedAnimation.push("kick");
                break;
            case "ArrowDown":
                queuedAnimation.push("punch");
                break;
            case "b":
                queuedAnimation.push("block");
                break;
        }
    });
});
