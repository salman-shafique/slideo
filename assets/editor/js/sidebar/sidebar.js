
$("#mainMenuTrigger").on("click", function () {
    if ($(this).hasClass("is-active")) {
        $(this).removeClass("is-active");
        $("#mainMenu").removeClass("open");
        $("#pageBackdrop").addClass("collapse");
    }

    else {
        $(this).addClass("is-active");
        $("#mainMenu").addClass("open");
        $("#pageBackdrop").removeClass("collapse");
    }
});

