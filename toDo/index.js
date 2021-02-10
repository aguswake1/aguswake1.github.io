$(document).ready(function () {
    $("#list-items").html(localStorage.getItem("listItems"));

    $(".add-items").submit(function (event) {
        event.preventDefault();
        var item = $("#todo-list-item").val();
        if (item.trim() != "") {
            console.log($(this));
            $("#list-items").fadeIn("default", function () {
                $(this).append("<li class='listItem'><input type='checkbox' class='checkbox'>" + item + "<a class='remove'>x</a><hr></li>")
                localStorage.setItem("listItems", $("#list-items").html());
                $("#todo-list-item").val("");
            });

        }
    });

    $(document).on("change", ".checkbox", function () {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked", "checked");
        }

        $(this).parent().toggleClass("completed");
        localStorage.setItem("listItems", $("#list-items").html());

    });
    $(document).on("click", ".remove", function () {
        $(this).parent().fadeOut("slow", function () {
            $(this).remove();
            localStorage.setItem("listItems", $("#list-items").html());
        });
    });
});