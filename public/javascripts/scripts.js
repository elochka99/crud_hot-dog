// Get all hotdogs.
function Gethotdogs() {
    $.ajax({
        url: "/list",
        type: "GET",
        contentType: "application/json",
        success: function (hotdogs) {
            let rows = "";
            $.each(hotdogs, function (index, hotdog) {
                // добавляем полученные элементы в таблицу
                rows += row(hotdog);
            });

            $("table tbody").append(rows);
        }
    });
}

// Get one hotdog.
function Gethotdog(id) {
    $.ajax({
        url: "/"+id,
        type: "GET",
        contentType: "application/json",
        success: function (hotdog) {
            let form = document.forms["hotdogForm"];
            form.elements["id"].value = hotdog._id;
            form.elements["name"].value = hotdog.name;
            form.elements["cost"].value = hotdog.cost;
        }
    });
}

// Add new hotdog
function Createhotdog(hotdogName, hotdogCost) {
    $.ajax({
        url: "add",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            name: hotdogName,
            cost: hotdogCost
        }),
        success: function (hotdog) {
            reset();
            $("table tbody").append(row(hotdog));
        }
    })
}


// Update hotdog.
function Edithotdog(hotdogId, hotdogName, hotdogCost) {
    $.ajax({
        url: "update",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: hotdogId,
            name: hotdogName,
            cost: hotdogCost
        }),

        success: function (hotdog) {
            reset();
            console.log(hotdog);
            $("tr[data-rowid='" + hotdog._id + "']").replaceWith(row(hotdog));
        }
    })
}

// Form reset.
function reset() {
    var form = document.forms["hotdogForm"];
    form.reset();
    form.elements["id"].value = 0;
}

// Delete hotdog
function Deletehotdog(id) {
    $.ajax({
        url: "delete/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function (hotdog) {
            console.log(hotdog);
            $("tr[data-rowid='" + hotdog._id + "']").remove();
        }
    })
}
// Add table row
var row = function (hotdog) {
    return "<tr  data-rowid='" + hotdog._id + "'>" +
        "<td>" + hotdog.name + "</td> <td>" + hotdog.cost + "</td>" +
        "<td><div class='row'><div class='col-md-6 text-center'><a class='editLink pointer btn btn-warning' data-id='" + hotdog._id + "'>Update</a></div>" +
        "<div class='col-md-6 text-center'><a class='removeLink pointer btn btn-danger' data-id='" + hotdog._id + "'>Delete</a></div></div></td></tr>";
        
};
// Clear form values
$("#reset").click(function (e) {

    e.preventDefault();
    reset();
});

// Send form
$("form").submit(function (e) {
    e.preventDefault();
    let id = this.elements["id"].value;
    let name = this.elements["name"].value;
    let cost = this.elements["cost"].value;
    if (id == 0)
        Createhotdog(name, cost);
    else
        Edithotdog(id, name, cost);
});

// Change link click.
$("body").on("click", ".editLink", function () {
    let id = $(this).data("id");
    Gethotdog(id);
});

// Delete link click
$("body").on("click", ".removeLink", function () {
    let id = $(this).data("id");
    Deletehotdog(id);
});


// Load all hotdogs.
Gethotdogs();
