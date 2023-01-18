"use strict";

document.addEventListener("click", function (event) {
    const targetItem = event.target;
    if (targetItem.closest("[data-ripple]")) {
        const button = targetItem.closest("[data-ripple]");
        const ripple = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${
            event.pageX -
            (button.getBoundingClientRect().left + scrollX) -
            radius
        }px`;
        ripple.style.top = `${
            event.pageY -
            (button.getBoundingClientRect().top + scrollY) -
            radius
        }px`;
        ripple.classList.add("ripple");

        button.dataset.ripple === "once" && button.querySelector(".ripple")
            ? button.querySelector(".ripple").remove()
            : null;

        button.appendChild(ripple);

        const timeOut = getAnimationDuration(ripple);

        setTimeout(() => {
            ripple ? ripple.remove() : null;
        }, timeOut);

        function getAnimationDuration() {
            const aDuration = window.getComputedStyle(ripple).animationDuration;
            return aDuration.includes("ms")
                ? aDuration.replace("ms", "")
                : aDuration.replace("s", "") * 1000;
        }
    }
});
